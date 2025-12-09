namespace LawyerConnect.DTOs
{
    public class UserRegisterDto
    {
        public string FullName { get; set; }  = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string? Role { get; set; } // Optional: "User", "Lawyer", or "Admin" (if admin secret provided)
        public string? AdminSecret { get; set; } // Optional: Secret key to register as Admin
    }
}
