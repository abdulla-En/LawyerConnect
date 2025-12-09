using LawyerConnect.Data;
using LawyerConnect.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LawyerConnect.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly LawyerConnectDbContext _context;
        public BookingRepository(LawyerConnectDbContext context) => _context = context;

        public async Task<Booking?> GetByIdAsync(int id) =>
            await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Lawyer) // Retrive all info aboaut the booking 
                .FirstOrDefaultAsync(b => b.Id == id);

        public async Task<IEnumerable<Booking>> GetUserBookingsAsync(int userId) =>
            await _context.Bookings
                .Include(b => b.Lawyer) //Who did the user book with
                .Where(b => b.UserId == userId)
                .ToListAsync();

        public async Task<IEnumerable<Booking>> GetLawyerBookingsAsync(int lawyerId) =>
            await _context.Bookings
                .Include(b => b.User) // Who booked with the lawyer?
                .Where(b => b.LawyerId == lawyerId)
                .ToListAsync();

        public async Task AddAsync(Booking booking)
        {
            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Booking booking)
        {
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
        }
    }
}

