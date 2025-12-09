using LawyerConnect.DTOs;
using LawyerConnect.Mappers;
using LawyerConnect.Models;
using LawyerConnect.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LawyerConnect.Services
{
    public class LawyerService : ILawyerService
    {
        private readonly ILawyerRepository _lawyerRepository;
        private readonly IUserRepository _userRepository;

        public LawyerService(ILawyerRepository lawyerRepository, IUserRepository userRepository)
        {
            _lawyerRepository = lawyerRepository;
            _userRepository = userRepository;
        }

        public async Task<LawyerResponseDto> RegisterLawyerAsync(LawyerRegisterDto dto, int userId)
        {
            // Update user role to "Lawyer" if not already
            var user = await _userRepository.GetByIdAsync(userId);
            if (user != null && user.Role != "Lawyer" && user.Role != "Admin")
            {
                user.Role = "Lawyer";
                await _userRepository.UpdateAsync(user);
            }

            var lawyer = dto.ToLawyer(userId);
            await _lawyerRepository.AddAsync(lawyer);
            return lawyer.ToLawyerResponseDto();
        }

        public async Task<LawyerResponseDto?> GetByIdAsync(int id)
        {
            var lawyer = await _lawyerRepository.GetByIdAsync(id);
            return lawyer?.ToLawyerResponseDto();
        }

        public async Task<LawyerResponseDto?> GetByUserIdAsync(int userId)
        {
            var lawyer = await _lawyerRepository.GetByUserIdAsync(userId);
            return lawyer?.ToLawyerResponseDto();
        }

        public async Task<IEnumerable<LawyerResponseDto>> GetPagedAsync(int page, int limit)
        {
            var lawyers = await _lawyerRepository.GetPagedAsync(page, limit);
            return lawyers.Select(l => l.ToLawyerResponseDto());
        }

        public async Task VerifyLawyerAsync(int id)
        {
            var lawyer = await _lawyerRepository.GetByIdAsync(id);
            if (lawyer != null)
            {
                lawyer.Verified = true;
                await _lawyerRepository.UpdateAsync(lawyer);
            }
        }
    }
}

