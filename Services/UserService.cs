using LawyerConnect.DTOs;
using LawyerConnect.Mappers;
using LawyerConnect.Models;
using LawyerConnect.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LawyerConnect.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserResponseDto> RegisterUserAsync(UserRegisterDto dto, string passwordHash, string role)
        {
            var user = dto.ToUser(passwordHash, role);
            await _userRepository.AddAsync(user);
            return user.ToUserResponseDto();
        }

        public async Task UpdateUserRoleAsync(int userId, string newRole)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user != null)
            {
                user.Role = newRole;
                await _userRepository.UpdateAsync(user);
            }
        }

        public async Task<UserResponseDto?> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return user?.ToUserResponseDto();
        }

        public async Task<IEnumerable<UserResponseDto>> GetPagedAsync(int page, int limit)
        {
            var users = await _userRepository.GetPagedAsync(page, limit);
            return users.Select(u => u.ToUserResponseDto());
        }
    }
}

