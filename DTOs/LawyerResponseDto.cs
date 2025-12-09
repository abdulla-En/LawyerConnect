namespace LawyerConnect.DTOs
{
    public class LawyerResponseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FullName { get; set; } = "";              
        public string Email { get; set; }   = "";
        public string Specialization { get; set; } = "";
        public int ExperienceYears { get; set; }
        public decimal Price { get; set; }
        public bool Verified { get; set; }
        public string Address { get; set; } = "";
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

