using LawyerConnect.DTOs;
using LawyerConnect.Mappers;
using LawyerConnect.Models;
using LawyerConnect.Repositories;
using System.Threading.Tasks;

namespace LawyerConnect.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentSessionRepository _paymentSessionRepository;
        private readonly IBookingRepository _bookingRepository;

        public PaymentService(IPaymentSessionRepository paymentSessionRepository, IBookingRepository bookingRepository)
        {
            _paymentSessionRepository = paymentSessionRepository;
            _bookingRepository = bookingRepository;
        }

        public async Task<PaymentSessionResponseDto> CreateSessionAsync(PaymentDto dto)
        {
            var session = dto.ToPaymentSession();
            await _paymentSessionRepository.AddAsync(session);
            return session.ToPaymentSessionResponseDto();
        }

        public async Task<PaymentSessionResponseDto> GetByBookingIdAsync(int bookingId)
        {
            var session = await _paymentSessionRepository.GetByBookingIdAsync(bookingId);
            return session?.ToPaymentSessionResponseDto();
        }

        public async Task ConfirmPaymentAsync(int sessionId, string providerSessionId)
        {
            var session = await _paymentSessionRepository.GetByIdAsync(sessionId);
            if (session != null)
            {
                session.Status = "Paid";
                session.ProviderSessionId = providerSessionId;
                await _paymentSessionRepository.UpdateAsync(session);

                var booking = await _bookingRepository.GetByIdAsync(session.BookingId);
                if (booking != null)
                {
                    booking.PaymentStatus = "Paid";
                    await _bookingRepository.UpdateAsync(booking);
                }
            }
        }
    }
}

