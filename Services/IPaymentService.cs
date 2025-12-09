using LawyerConnect.DTOs;
using System.Threading.Tasks;

namespace LawyerConnect.Services
{
    public interface IPaymentService
    {
        Task<PaymentSessionResponseDto> CreateSessionAsync(PaymentDto dto);
        Task<PaymentSessionResponseDto> GetByBookingIdAsync(int bookingId);
        Task ConfirmPaymentAsync(int sessionId, string providerSessionId);
    }
}

