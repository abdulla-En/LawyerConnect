using System.ComponentModel.DataAnnotations;

namespace LawyerConnect.DTOs
{
    public class LawyerRegisterDto
    {
        [Required]
        [StringLength(100, ErrorMessage = "Specialization cannot exceed 100 characters.")]
        public string Specialization { get; set; } = string.Empty;

        [Range(0, 100, ErrorMessage = "Experience years must be between 0 and 100.")]
        public int ExperienceYears { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value.")]
        public decimal Price { get; set; }

        [Required]
        [StringLength(200, ErrorMessage = "Address cannot exceed 200 characters.")]
        public string Address { get; set; } = string.Empty;

        [Range(-90, 90, ErrorMessage = "Latitude must be between -90 and 90.")]
        public decimal Latitude { get; set; }

        [Range(-180, 180, ErrorMessage = "Longitude must be between -180 and 180.")]
        public decimal Longitude { get; set; }
    }
}

