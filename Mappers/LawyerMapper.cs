using LawyerConnect.DTOs;
using LawyerConnect.Models;

namespace LawyerConnect.Mappers
{
    public static class LawyerMapper
    {
        public static Lawyer ToLawyer(this LawyerRegisterDto dto, int userId) // userId extracted from token
        {
            return new Lawyer
            {
                UserId = userId,
                Specialization = dto.Specialization,
                ExperienceYears = dto.ExperienceYears,
                Price = dto.Price,
                Address = dto.Address,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                Verified = false,
                CreatedAt = DateTime.UtcNow
            };
        }
        // call without (this) , extention method => var lawyer = LawyerMapper.ToLawyer(dto)
        // call with (this) , extention method => dto.ToLawyer
        public static LawyerResponseDto ToLawyerResponseDto(this Lawyer lawyer)
        {
            return new LawyerResponseDto
            {
                Id = lawyer.Id,
                UserId = lawyer.UserId,
                FullName = lawyer.User?.FullName ?? string.Empty,
                Email = lawyer.User?.Email ?? string.Empty,
                Specialization = lawyer.Specialization,
                ExperienceYears = lawyer.ExperienceYears,
                Price = lawyer.Price,
                Verified = lawyer.Verified,
                Address = lawyer.Address,
                Latitude = lawyer.Latitude,
                Longitude = lawyer.Longitude,
                CreatedAt = lawyer.CreatedAt
            };
        }
    }
}

