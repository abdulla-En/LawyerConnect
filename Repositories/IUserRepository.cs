using LawyerConnect.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LawyerConnect.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int id);
        Task<User?> GetByEmailAsync(string email);
        Task<IEnumerable<User>> GetPagedAsync(int page, int limit);
        Task AddAsync(User user);
        Task UpdateAsync(User user);
    }
}

