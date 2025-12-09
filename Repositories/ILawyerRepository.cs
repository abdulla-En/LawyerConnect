using LawyerConnect.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LawyerConnect.Repositories
{
    public interface ILawyerRepository
    {
        Task<Lawyer?> GetByIdAsync(int id);
        Task<Lawyer?> GetByUserIdAsync(int userId);
        Task<IEnumerable<Lawyer>> GetPagedAsync(int page, int limit);
        Task AddAsync(Lawyer lawyer);
        Task UpdateAsync(Lawyer lawyer);
    }
}

