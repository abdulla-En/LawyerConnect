
using LawyerConnect.Models;
using Microsoft.EntityFrameworkCore;

namespace LawyerConnect.Data
{
    public class LawyerConnectDbContext : DbContext
    {
        public LawyerConnectDbContext(DbContextOptions<LawyerConnectDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Lawyer> Lawyers { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<PaymentSession> PaymentSessions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Lawyer>()
                .HasIndex(l => l.UserId)
                .IsUnique();

            modelBuilder.Entity<Lawyer>()
                .HasOne(l => l.User)
                .WithOne(u => u.LawyerProfile)
                .HasForeignKey<Lawyer>(l => l.UserId);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict); // prevent 2 cascade delete path , the logic even user delete keep the booking as a history 

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Lawyer)
                .WithMany(l => l.Bookings)
                .HasForeignKey(b => b.LawyerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PaymentSession>()
                .HasIndex(p => p.BookingId)
                .IsUnique();

            modelBuilder.Entity<PaymentSession>()
                .HasOne(p => p.Booking)
                .WithOne(b => b.PaymentSession)
                .HasForeignKey<PaymentSession>(p => p.BookingId);



                // langitude and latitude should have a 8 numbers after the floating point 
                modelBuilder.Entity<Lawyer>()
                .Property(l => l.Latitude)
                .HasColumnType("decimal(10,8)");

                modelBuilder.Entity<Lawyer>()
                .Property(l => l.Longitude)
                .HasColumnType("decimal(10,8)");

                modelBuilder.Entity<Lawyer>()
                .Property(l => l.Price)
                .HasColumnType("decimal(18,2)");

                modelBuilder.Entity<PaymentSession>()
                .Property(p => p.Amount)
                .HasColumnType("decimal(18,2)");

        }
    }
}