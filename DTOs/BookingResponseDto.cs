namespace LawyerConnect.DTOs
{
    public class BookingResponseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int LawyerId { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }= "";
        public string PaymentStatus { get; set; }= "";
        public string TransactionId { get; set; }= "";
        public DateTime CreatedAt { get; set; }
    }
}

