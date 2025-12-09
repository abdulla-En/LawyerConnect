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

namespace LawyerConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IConfiguration _config;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            IUserRepository userRepository,
            IUserService userService,
            IConfiguration config,
            ILogger<AuthController> logger)
        {
            _userRepository = userRepository;
            _userService = userService;
            _config = config;
            _logger = logger;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<UserResponseDto>> Register(UserRegisterDto dto)
        {
            var existing = await _userRepository.GetByEmailAsync(dto.Email);
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

            var passwordHash = HashPassword(dto.Password);
            var result = await _userService.RegisterUserAsync(dto, passwordHash, role);
            return CreatedAtAction(nameof(Me), new { }, result);
        }

        [HttpPost("login")]
        [AllowAnonymous] // means no need authorization in this route 
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            var hashedInput = HashPassword(dto.Password);
            if (!string.Equals(user.PasswordHash, hashedInput, StringComparison.Ordinal))
            {
                return Unauthorized("Invalid credentials.");
            }

            var token = GenerateJwt(user.Id, user.Email, user.Role, out var expiresAt);
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

        private string GenerateJwt(int userId, string email, string role, out DateTime expiresAt)
        {
            var key = _config["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key missing.");
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];
            var expiresMinutes = int.TryParse(_config["Jwt:ExpiresMinutes"], out var exp) ? exp : 120;

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

        private static string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha.ComputeHash(bytes);
            return Convert.ToHexString(hash);
        }
    }
}

