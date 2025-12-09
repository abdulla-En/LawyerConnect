namespace LawyerConnect.Models
{
    public class Booking // informative junction table between user and lawyer
    {
        public int Id { get; set; }
        public int UserId { get; set; } // foriegn key 
        public int LawyerId { get; set; } // foriegn key 
        public DateTime Date { get; set; }
        public string Status { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = string.Empty;
        public string TransactionId { get; set; }= string.Empty;
        public DateTime CreatedAt { get; set; }

        public User User {get; set;} = null!; // navigation property 
         public Lawyer Lawyer { get; set; } = null!;  // navigation property 
        public PaymentSession? PaymentSession { get; set; } 
    }
}