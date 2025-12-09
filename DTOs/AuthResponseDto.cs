namespace LawyerConnect.DTOs
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public UserResponseDto? User { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}

