using System.Security.Claims;
using LawyerConnect.DTOs;
using LawyerConnect.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LawyerConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LawyersController : ControllerBase
    {
        private readonly ILawyerService _lawyerService;

        public LawyersController(ILawyerService lawyerService)
        {
            _lawyerService = lawyerService;
        }

        [HttpPost("register")]
        [Authorize] // user must be authenticated, userId extracted from token
        public async Task<ActionResult<LawyerResponseDto>> Register([FromBody] LawyerRegisterDto dto)
        {
            // Extract userId from token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            // Check if user already has a lawyer profile
            var existingLawyer = await _lawyerService.GetByUserIdAsync(userId);
            if (existingLawyer != null)
            {
                return Conflict("Lawyer profile already exists for this user.");
            }

            var lawyer = await _lawyerService.RegisterLawyerAsync(dto, userId);
            return CreatedAtAction(nameof(GetById), new { id = lawyer.Id }, lawyer);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<LawyerResponseDto>>> GetPaged([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            var result = await _lawyerService.GetPagedAsync(page, limit);
            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<LawyerResponseDto>> GetById(int id)
        {
            var lawyer = await _lawyerService.GetByIdAsync(id);
            if (lawyer == null) return NotFound();
            return Ok(lawyer);
        }

        [HttpGet("me")]
        [Authorize(Roles = "Lawyer,Admin")]
        public async Task<ActionResult<LawyerResponseDto>> GetMyProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var lawyer = await _lawyerService.GetByUserIdAsync(userId);
            if (lawyer == null) return NotFound("Lawyer profile not found for this user.");
            return Ok(lawyer);
        }

        [HttpPut("{id}/verify")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Verify(int id)
        {
            await _lawyerService.VerifyLawyerAsync(id);
            return NoContent();
        }
    }
}

