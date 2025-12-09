using LawyerConnect.DTOs;
using LawyerConnect.Models;

namespace LawyerConnect.Mappers
{
    public static class BookingMapper
    {
        public static Booking ToBooking(this BookingDto dto)
        {
            return new Booking
            {
                UserId = dto.UserId,
                LawyerId = dto.LawyerId,
                Date = dto.Date,
                Status = "Pending",
                PaymentStatus = "Pending",
                CreatedAt = DateTime.UtcNow
            };
        }
        public static BookingResponseDto ToBookingResponseDto(this Booking booking)
        {
            return new BookingResponseDto
            {
                Id = booking.Id,
                UserId = booking.UserId,
                LawyerId = booking.LawyerId,
                Date = booking.Date,
                Status = booking.Status,
                PaymentStatus = booking.PaymentStatus,
                TransactionId = booking.TransactionId,
                CreatedAt = booking.CreatedAt
            };
        }
    }
}

