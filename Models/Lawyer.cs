namespace LawyerConnect.Models
{
    public class Lawyer
    {
        public int Id { get; set; }
        public int UserId { get; set; } // foriegn key
        public string Specialization { get; set; }  = string.Empty;
        public int ExperienceYears { get; set; }
        public decimal Price { get; set; }
        public bool Verified { get; set; }
        public string Address { get; set; } = string.Empty;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public DateTime CreatedAt { get; set; }

        public User User { get; set; } = null!; // navigation properity 
        public List<Booking>? Bookings { get; set; }  // navigation properity
    }
}