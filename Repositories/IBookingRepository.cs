using LawyerConnect.Models;


namespace LawyerConnect.Repositories
{
    public interface IBookingRepository
    {
        Task<Booking?> GetByIdAsync(int id);
        Task<IEnumerable<Booking>> GetUserBookingsAsync(int userId);
        Task<IEnumerable<Booking>> GetLawyerBookingsAsync(int lawyerId);
        Task AddAsync(Booking booking);
        Task UpdateAsync(Booking booking);
    }
}

