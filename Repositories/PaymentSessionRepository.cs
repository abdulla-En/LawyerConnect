using LawyerConnect.Data;
using LawyerConnect.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace LawyerConnect.Repositories
{
    public class PaymentSessionRepository : IPaymentSessionRepository
    {
        private readonly LawyerConnectDbContext _context;
        public PaymentSessionRepository(LawyerConnectDbContext context) => _context = context;

        public async Task<PaymentSession?> GetByIdAsync(int id) =>
            await _context.PaymentSessions.Include(p => p.Booking).FirstOrDefaultAsync(p => p.Id == id);

        public async Task<PaymentSession?> GetByBookingIdAsync(int bookingId) =>
            await _context.PaymentSessions.Include(p => p.Booking).FirstOrDefaultAsync(p => p.BookingId == bookingId);

        public async Task AddAsync(PaymentSession paymentSession)
        {
            await _context.PaymentSessions.AddAsync(paymentSession);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(PaymentSession paymentSession)
        {
            _context.PaymentSessions.Update(paymentSession);
            await _context.SaveChangesAsync();
        }
    }
}

