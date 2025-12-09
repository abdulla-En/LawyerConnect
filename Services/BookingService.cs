using LawyerConnect.DTOs;
using LawyerConnect.Mappers;
using LawyerConnect.Models;
using LawyerConnect.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LawyerConnect.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IUserRepository _userRepository;
        private readonly ILawyerRepository _lawyerRepository;

        public BookingService(IBookingRepository bookingRepository, IUserRepository userRepository, ILawyerRepository lawyerRepository)
        {
            _bookingRepository = bookingRepository;
            _userRepository = userRepository;
            _lawyerRepository = lawyerRepository;
        }

        public async Task<BookingResponseDto> CreateBookingAsync(BookingDto dto)
        {
            var booking = dto.ToBooking();
            await _bookingRepository.AddAsync(booking);
            return booking.ToBookingResponseDto();
        }

        public async Task<BookingResponseDto> GetByIdAsync(int id)
        {
            var booking = await _bookingRepository.GetByIdAsync(id);
            return booking?.ToBookingResponseDto();
        }

        public async Task<IEnumerable<BookingResponseDto>> GetUserBookingsAsync(int userId)
        {
            var bookings = await _bookingRepository.GetUserBookingsAsync(userId);
            return bookings.Select(b => b.ToBookingResponseDto());
        }

        public async Task<IEnumerable<BookingResponseDto>> GetLawyerBookingsAsync(int lawyerId)
        {
            var bookings = await _bookingRepository.GetLawyerBookingsAsync(lawyerId);
            return bookings.Select(b => b.ToBookingResponseDto());
        }

        public async Task UpdateBookingStatusAsync(int bookingId, string status)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if(booking != null)
            {
                booking.Status = status;
                await _bookingRepository.UpdateAsync(booking);
            }
        }
    }
}

