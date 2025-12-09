using LawyerConnect.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LawyerConnect.Services
{
    public interface IBookingService
    {
        Task<BookingResponseDto> CreateBookingAsync(BookingDto dto);
        Task<BookingResponseDto> GetByIdAsync(int id);
        Task<IEnumerable<BookingResponseDto>> GetUserBookingsAsync(int userId);
        Task<IEnumerable<BookingResponseDto>> GetLawyerBookingsAsync(int lawyerId);
        Task UpdateBookingStatusAsync(int bookingId, string status);
    }
}

