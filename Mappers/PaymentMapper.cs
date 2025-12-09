using LawyerConnect.DTOs;
using LawyerConnect.Models;

namespace LawyerConnect.Mappers
{
    public static class PaymentMapper
    {
        public static PaymentSession ToPaymentSession(this PaymentDto dto)
        {
            return new PaymentSession
            {
                BookingId = dto.BookingId,
                Amount = dto.Amount,
                Provider = dto.Provider,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow
            };
        }
        public static PaymentSessionResponseDto ToPaymentSessionResponseDto(this PaymentSession payment)
        {
            return new PaymentSessionResponseDto
            {
                Id = payment.Id,
                BookingId = payment.BookingId,
                Amount = payment.Amount,
                Status = payment.Status,
                Provider = payment.Provider,
                ProviderSessionId = payment.ProviderSessionId,
                CreatedAt = payment.CreatedAt
            };
        }
    }
}

