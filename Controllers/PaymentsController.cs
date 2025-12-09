using LawyerConnect.DTOs;
using LawyerConnect.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LawyerConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("create-session")]
        [Authorize]
        public async Task<ActionResult<PaymentSessionResponseDto>> CreateSession([FromBody] PaymentDto dto)
        {
            var session = await _paymentService.CreateSessionAsync(dto);
            return Ok(session);
        }

        [HttpPost("confirm")]
        [Authorize]
        public async Task<IActionResult> Confirm([FromBody] ConfirmPaymentDto dto)
        {
            await _paymentService.ConfirmPaymentAsync(dto.SessionId, dto.ProviderSessionId);
            return NoContent();
        }
    }

    public class ConfirmPaymentDto
    {
        public int SessionId { get; set; }
        public string ProviderSessionId { get; set; } = string.Empty;
    }
}

