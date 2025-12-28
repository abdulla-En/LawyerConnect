using System.ComponentModel.DataAnnotations;

namespace LawyerConnect.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; }  = string.Empty; // "User", "Lawyer", "Admin"
        public string Phone { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string? ProfilePhoto { get; set; } // Base64 encoded image or URL
        public DateTime CreatedAt { get; set; }

        public Lawyer? LawyerProfile { get; set; }   // one to one or zero rls
        public List<Booking>? Bookings { get; set; }  // one to many rls
    }
}