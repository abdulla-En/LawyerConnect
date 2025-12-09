using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using LawyerConnect.DTOs;
using LawyerConnect.Repositories;
using LawyerConnect.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LawyerConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IUserRepository _userRepository;

        public UsersController(IUserService userService, IUserRepository userRepository)
        {
            _userService = userService;
            _userRepository = userRepository;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetUsers([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            var users = await _userService.GetPagedAsync(page, limit);
            return Ok(users);
        }

        public class UpdateUserDto
        {
            public string FullName { get; set; } = string.Empty;
            public string Phone { get; set; } = string.Empty;
            public string City { get; set; } = string.Empty;
        }

        [HttpPut("update")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return NotFound();

            user.FullName = string.IsNullOrWhiteSpace(dto.FullName) ? user.FullName : dto.FullName;
            user.Phone = string.IsNullOrWhiteSpace(dto.Phone) ? user.Phone : dto.Phone;
            user.City = string.IsNullOrWhiteSpace(dto.City) ? user.City : dto.City;

            await _userRepository.UpdateAsync(user);
            return NoContent();
        }

        public class ChangePasswordDto
        {
            public string CurrentPassword { get; set; } = string.Empty;
            public string NewPassword { get; set; } = string.Empty;
        }

        [HttpPut("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return NotFound();

            var currentHash = HashPassword(dto.CurrentPassword);
            if (!string.Equals(user.PasswordHash, currentHash, StringComparison.Ordinal))
            {
                return Unauthorized("Current password incorrect.");
            }

            user.PasswordHash = HashPassword(dto.NewPassword);
            await _userRepository.UpdateAsync(user);
            return NoContent();
        }

        public class UpdateRoleDto
        {
            public int UserId { get; set; }
            public string Role { get; set; } = string.Empty;
        }

        [HttpPut("update-role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRole([FromBody] UpdateRoleDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Role))
            {
                return BadRequest("Role is required.");
            }

            // Validate role
            if (dto.Role != "User" && dto.Role != "Lawyer" && dto.Role != "Admin")
            {
                return BadRequest("Invalid role. Allowed roles: User, Lawyer, Admin");
            }

            await _userService.UpdateUserRoleAsync(dto.UserId, dto.Role);
            return NoContent();
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

