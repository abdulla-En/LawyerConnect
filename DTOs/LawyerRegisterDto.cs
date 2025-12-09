namespace LawyerConnect.DTOs
{
    public class LawyerRegisterDto
    {
        // UserId is now extracted from token, not required in request body
        public string Specialization { get; set; } = string.Empty;
        public int ExperienceYears { get; set; }
        public decimal Price { get; set; }
        public string Address { get; set; } = string.Empty;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}

