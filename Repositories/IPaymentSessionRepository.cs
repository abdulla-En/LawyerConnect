using LawyerConnect.Models;
using System.Threading.Tasks;

namespace LawyerConnect.Repositories
{
    public interface IPaymentSessionRepository
    {
        Task<PaymentSession?> GetByIdAsync(int id);
        Task<PaymentSession?> GetByBookingIdAsync(int bookingId);
        Task AddAsync(PaymentSession paymentSession);
        Task UpdateAsync(PaymentSession paymentSession);
    }
}

