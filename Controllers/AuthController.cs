using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using LawyerConnect.DTOs;
using LawyerConnect.Mappers;
using LawyerConnect.Repositories;
using LawyerConnect.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using LawyerConnect.Models;
using System.Net.Http.Headers;

namespace LawyerConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IUserService _userService;
        private readonly IConfiguration _config;
        private readonly ILogger<AuthController> _logger;


        public AuthController(
            IUserRepository userRepository,
            IRefreshTokenRepository refreshTokenRepository,
            IUserService userService,
            IConfiguration config,
            ILogger<AuthController> logger)
            
        {
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
            _userService = userService;
            _config = config;
            _logger = logger;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<UserResponseDto>> Register(UserRegisterDto dto)
        {
            var existing = await _userRepository.GetByEmailAsync(dto.Email); // not any service layer needed
            if (existing != null)
            {
                return Conflict("Email already registered.");
            }

            // Determine role
            string role = "User"; // Default role
            
            if (!string.IsNullOrWhiteSpace(dto.Role))
            {
                var requestedRole = dto.Role.Trim();
                
                // Validate role
                if (requestedRole != "User" && requestedRole != "Lawyer" && requestedRole != "Admin")
                {
                    return BadRequest("Invalid role. Allowed roles: User, Lawyer, Admin");
                }

                // Check if trying to register as Admin
                if (requestedRole == "Admin")
                {
                    var adminSecret = _config["AdminSecret"];
                    if (string.IsNullOrWhiteSpace(adminSecret) || dto.AdminSecret != adminSecret)
                    {
                        return Unauthorized("Admin registration requires a valid admin secret key.");
                    }
                    role = "Admin";
                }
                else
                {
                    role = requestedRole;
                }
            }

            var passwordHash = HashObject(dto.Password);
            var result = await _userService.RegisterUserAsync(dto, passwordHash, role); // dto -> entity (service layer needed)
            return CreatedAtAction(nameof(Me), new { }, result);
        }


[HttpPost("login")]
[AllowAnonymous] // means no need authorization in this route 
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null)
            {
                _logger.LogWarning($"Login attempt failed: User not found for email {dto.Email}");
                return Unauthorized("Invalid credentials.");
            }

            var hashedInput = HashObject(dto.Password);
            if (!string.Equals(user.PasswordHash, hashedInput, StringComparison.Ordinal))
            {
                _logger.LogWarning($"Login attempt failed: Invalid password for user {user.Id} ({user.Email})");
                return Unauthorized("Invalid credentials.");
            }
            
            // Generating Token
            var token = GenerateJwt(user.Id, user.Email, user.Role, out var expiresAt);
            var refreshToken = GenerateRefreshToken();
            var HashRefreshToken = HashObject(refreshToken);
            
            // Get refresh token expiration from config
            var refreshTokenExpirationDays = int.TryParse(_config["Jwt:RefreshTokenExpirationDays"], out var days) ? days : 7;
            var refreshExpires = DateTime.UtcNow.AddDays(refreshTokenExpirationDays);       

            // add refreshToken on DB
            await _refreshTokenRepository.AddAsync(new RefreshToken
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                TokenHash = HashRefreshToken,
                ExpiresAt = refreshExpires,
                CreatedAt = DateTime.UtcNow,
                IpAddress = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
                UserAgent = Request.Headers.UserAgent.ToString()
            });

            // responses 

            // refresh
            Response.Cookies.Append("refreshToken" , refreshToken , new CookieOptions
            {
                HttpOnly = true ,
                Secure = true , 
                SameSite = SameSiteMode.Lax , 
                Expires = refreshExpires
            });

            _logger.LogInformation($"User {user.Id} ({user.Email}) logged in successfully from IP {Request.HttpContext.Connection.RemoteIpAddress}");

            // Access
            var response = new AuthResponseDto
            {
                Token = token,
                ExpiresAt = expiresAt,
                User = user.ToUserResponseDto()
            };
            return Ok(response);
        }

        [HttpGet("me")]
        [Authorize] // need authorization in this route 
        public async Task<ActionResult<UserResponseDto>> Me()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var user = await _userService.GetByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

[HttpPost("refresh")]
[AllowAnonymous]
public async Task<ActionResult<AuthResponseDto>> Refresh()
{
    // Get refresh token from cookie
    if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
    {
        _logger.LogWarning("Refresh attempt failed: No refresh token in cookie");
        return Unauthorized("Refresh token not found.");
    }

    var hashedToken = HashObject(refreshToken);
    var storedToken = await _refreshTokenRepository.GetByTokenHashAsync(hashedToken);

    if (storedToken == null)  
    {
        _logger.LogWarning("Refresh attempt failed: Invalid refresh token hash");
        Response.Cookies.Delete("refreshToken");
        return Unauthorized("Invalid refresh token.");
    }

    if (storedToken.Revoked)  // revoke attack wshhh
    {
        _logger.LogError($"SECURITY ALERT: Replay attack detected for user {storedToken.UserId}. Revoked token used. All sessions revoked.");
        await _refreshTokenRepository.RevokeAllAsync(storedToken.UserId, RefreshTokenRevokeReason.ReplayDetected);
        Response.Cookies.Delete("refreshToken");
        return Unauthorized("Refresh token has been revoked. All sessions logged out for security.");
    }

    if (storedToken.ExpiresAt < DateTime.UtcNow)
    {
        _logger.LogWarning($"Refresh attempt failed: Token expired for user {storedToken.UserId}");
        Response.Cookies.Delete("refreshToken");
        return Unauthorized("Refresh token expired.");
    }

    // Check if token is close to expiration
    var timeUntilExpiry = storedToken.ExpiresAt - DateTime.UtcNow;
    var shouldRotate = timeUntilExpiry.TotalDays < 3; // Rotate if less than 3 days left

    // Generate new access token
    var newAccessToken = GenerateJwt(storedToken.UserId, storedToken.User.Email, storedToken.User.Role, out var expiresAt);

    // rotation
    var newRefreshToken = GenerateRefreshToken();
    var newHashedRefreshToken = HashObject(newRefreshToken);
    DateTime newRefreshExpires;

        if(shouldRotate)
        {
            var refreshTokenExpirationDays = int.TryParse(_config["Jwt:RefreshTokenExpirationDays"], out var days) ? days : 7;
            newRefreshExpires = DateTime.UtcNow.AddDays(refreshTokenExpirationDays);
            _logger.LogInformation($"Token rotation triggered for user {storedToken.UserId}: Token expiring soon (< 3 days)");
        }
        else 
            newRefreshExpires = storedToken.ExpiresAt;

    // Create new refresh token record
    var newTokenRecord = new RefreshToken
    {
        Id = Guid.NewGuid(),
        UserId = storedToken.UserId,
        TokenHash = newHashedRefreshToken,
        ExpiresAt = newRefreshExpires,
        CreatedAt = DateTime.UtcNow,
        IpAddress = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
        UserAgent = Request.Headers.UserAgent.ToString()
    };

    await _refreshTokenRepository.AddAsync(newTokenRecord);
    storedToken.ReplacedByTokenId = newTokenRecord.Id; // for chain revoked
    await _refreshTokenRepository.RevokeAsync(storedToken, RefreshTokenRevokeReason.Rotation);

    // Update refresh token cookie
    Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.Lax,
        Expires = newRefreshExpires
    });

    _logger.LogInformation($"User {storedToken.UserId} token refreshed successfully");

    var response = new AuthResponseDto
    {
        Token = newAccessToken,
        ExpiresAt = expiresAt,
        User = storedToken.User.ToUserResponseDto()
    };
    return Ok(response);
}

[HttpPost("logout")]
[Authorize]
public async Task<IActionResult> Logout([FromQuery] bool logoutAllDevices = false)
{
    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (string.IsNullOrWhiteSpace(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
    {
        _logger.LogWarning("Logout attempt failed: Invalid user ID claim");
        return Unauthorized();
    }

    // Get current refresh token from cookie
    if (Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
    {
        var hashedToken = HashObject(refreshToken);
        var storedToken = await _refreshTokenRepository.GetByTokenHashAsync(hashedToken);
        
        if (storedToken != null)
        {
            await _refreshTokenRepository.RevokeAsync(storedToken, RefreshTokenRevokeReason.Logout);
        }
    }

    // MULTI-DEVICE LOGOUT: Revoke all tokens if requested
    if (logoutAllDevices)
    {
        _logger.LogInformation($"User {userId} logged out from all devices");
        await _refreshTokenRepository.RevokeAllAsync(userId, RefreshTokenRevokeReason.LogoutAll);
    }
    else
    {
        _logger.LogInformation($"User {userId} logged out from current device");
    }

    // Clear the refresh token cookie
    Response.Cookies.Delete("refreshToken");

    return Ok(new { message = logoutAllDevices ? "Logged out from all devices." : "Logged out successfully." });
}



        #region --- Utilities ---
                
            
        // Generate Refresh Token 
        private string GenerateRefreshToken()
            {
                var bytes = new byte[32];
                using var rng = RandomNumberGenerator.Create();
                rng.GetBytes(bytes);
                return Convert.ToBase64String(bytes);
            }
        //Generate JWT Access Token Function MiddleWare Check Later 
        private string GenerateJwt(int userId, string email, string role, out DateTime expiresAt)
        {
            var key = _config["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key missing.");
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];
            var expiresMinutes = int.TryParse(_config["Jwt:ExpiresMinutes"], out var exp) ? exp : 30;

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, role)
            };

            expiresAt = DateTime.UtcNow.AddMinutes(expiresMinutes);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: expiresAt,
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        // hashing function 
        private static string HashObject(string Object)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(Object);
            var hash = sha.ComputeHash(bytes);
            return Convert.ToHexString(hash);
        }
    }
        
            
        #endregion -----------------------------------------------------------------------------------------------------------------------------------------------------------------
}

