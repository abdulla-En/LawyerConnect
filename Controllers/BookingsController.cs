using System.Security.Claims;
using LawyerConnect.DTOs;
using LawyerConnect.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace LawyerConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<BookingResponseDto>> Create([FromBody] BookingDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            // If caller is not Admin, always use token userId.
            // If Admin, allow booking on behalf of another user when provided; otherwise fallback to token userId.
            if (!string.Equals(role, "Admin", StringComparison.OrdinalIgnoreCase))
            {
                dto.UserId = userId;
            }
            else
            {
                dto.UserId = dto.UserId > 0 ? dto.UserId : userId;
            }

            var booking = await _bookingService.CreateBookingAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = booking.Id }, booking);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<BookingResponseDto>> GetById(int id)
        {
            var booking = await _bookingService.GetByIdAsync(id);
            if (booking == null) return NotFound();
            return Ok(booking);
        }

        [HttpGet("user")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<BookingResponseDto>>> GetForUser()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }
            var bookings = await _bookingService.GetUserBookingsAsync(userId);
            return Ok(bookings);
        }

        [HttpGet("lawyer")]
        [Authorize(Roles = "Lawyer,Admin")]
        public async Task<ActionResult<IEnumerable<BookingResponseDto>>> GetForLawyer([FromQuery] int? lawyerId = null)
        {
            int targetLawyerId;
            
            // If lawyerId is provided (Admin can query any lawyer), use it
            // Otherwise, get lawyerId from the authenticated user's token
            if (lawyerId.HasValue && lawyerId.Value > 0)
            {
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                if (userRole != "Admin")
                {
                    return Forbid("Only admins can query other lawyers' bookings.");
                }
                targetLawyerId = lawyerId.Value;
            }
            else
            {
                // Get lawyer profile for the authenticated user
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrWhiteSpace(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
                {
                    return Unauthorized();
                }

                // Get lawyer by userId
                var lawyerService = HttpContext.RequestServices.GetRequiredService<ILawyerService>();
                var lawyer = await lawyerService.GetByUserIdAsync(userId);
                if (lawyer == null)
                {
                    return NotFound("Lawyer profile not found for this user.");
                }
                targetLawyerId = lawyer.Id;
            }

            var bookings = await _bookingService.GetLawyerBookingsAsync(targetLawyerId);
            return Ok(bookings);
        }

        public class UpdateStatusDto
        {
            public string Status { get; set; } = string.Empty;
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin,Lawyer")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Status)) return BadRequest("Status required.");
            await _bookingService.UpdateBookingStatusAsync(id, dto.Status);
            return NoContent();
        }
    }
}

