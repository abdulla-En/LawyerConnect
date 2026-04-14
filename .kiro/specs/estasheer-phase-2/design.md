# ESTASHEER Phase 2 - Complete System Design

## Overview

Phase 2 implements the complete ESTASHEER platform with 8 major feature areas:
1. Lawyer Management (profiles, specializations, pricing)
2. Search & Filter (lawyer discovery)
3. Bookings (consultation scheduling)
4. Payments (transaction processing)
5. Reviews & Ratings (feedback system)
6. Notifications (event alerts)
7. Chat System (real-time messaging)
8. Admin Dashboard (platform management)

This design follows the 3-layer architecture: Controller → Service → Repository → Database.

---

## Architecture

### Layered Architecture

```
HTTP Layer (Controllers)
    ↓
Business Logic Layer (Services)
    ↓
Data Access Layer (Repositories)
    ↓
Persistence Layer (Database)
```

### Service Organization

**Existing Services:**
- AuthService - User authentication
- UserService - User profile management
- TokenCleanupService - Background token cleanup

**New Services (Phase 2):**
- LawyerService - Lawyer profile management
- SpecializationService - Specialization management
- PricingService - Lawyer pricing management
- BookingService - Booking management
- PaymentService - Payment processing
- ReviewService - Review and rating management
- NotificationService - Notification system
- ChatService - Chat messaging
- AdminService - Admin operations

---

## Components and Interfaces

### 1. Lawyer Management

#### Models
```csharp
public class Lawyer
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int ExperienceYears { get; set; }
    public bool IsVerified { get; set; }
    public string Address { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Navigation properties
    public ICollection<LawyerSpecialization> Specializations { get; set; }
    public ICollection<LawyerPricing> Pricing { get; set; }
    public ICollection<Booking> Bookings { get; set; }
    public ICollection<Review> Reviews { get; set; }
}

public class Specialization
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    
    public ICollection<LawyerSpecialization> Lawyers { get; set; }
    public ICollection<LawyerPricing> Pricing { get; set; }
}

public class LawyerSpecialization
{
    public int LawyerId { get; set; }
    public int SpecializationId { get; set; }
    
    public Lawyer Lawyer { get; set; }
    public Specialization Specialization { get; set; }
}

public class InteractionType
{
    public int Id { get; set; }
    public string Name { get; set; } // Meeting, Phone, Chat
    
    public ICollection<LawyerPricing> Pricing { get; set; }
    public ICollection<Booking> Bookings { get; set; }
}

public class LawyerPricing
{
    public int LawyerId { get; set; }
    public int SpecializationId { get; set; }
    public int InteractionTypeId { get; set; }
    public decimal Price { get; set; }
    public int DurationMinutes { get; set; }
    
    public Lawyer Lawyer { get; set; }
    public Specialization Specialization { get; set; }
    public InteractionType InteractionType { get; set; }
}
```

#### DTOs
```csharp
public class LawyerRegisterDto
{
    public int ExperienceYears { get; set; }
    public string Address { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public List<int> SpecializationIds { get; set; }
}

public class LawyerResponseDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public int ExperienceYears { get; set; }
    public bool IsVerified { get; set; }
    public string Address { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public List<string> Specializations { get; set; }
    public decimal AverageRating { get; set; }
    public int ReviewCount { get; set; }
}

public class LawyerPricingDto
{
    public int SpecializationId { get; set; }
    public int InteractionTypeId { get; set; }
    public decimal Price { get; set; }
    public int DurationMinutes { get; set; }
}
```

#### Interfaces
```csharp
public interface ILawyerService
{
    Task<LawyerResponseDto> RegisterLawyerAsync(int userId, LawyerRegisterDto dto);
    Task<LawyerResponseDto> GetLawyerByIdAsync(int id);
    Task<LawyerResponseDto> GetCurrentLawyerAsync(int userId);
    Task<List<LawyerResponseDto>> SearchLawyersAsync(LawyerSearchDto filters);
    Task UpdateLawyerAsync(int id, LawyerUpdateDto dto);
    Task DeleteLawyerAsync(int id);
    Task VerifyLawyerAsync(int id);
    Task RejectLawyerAsync(int id, string reason);
}

public interface ISpecializationService
{
    Task<List<SpecializationDto>> GetAllAsync();
    Task<SpecializationDto> GetByIdAsync(int id);
    Task<SpecializationDto> CreateAsync(SpecializationDto dto);
    Task UpdateAsync(int id, SpecializationDto dto);
    Task DeleteAsync(int id);
}

public interface IPricingService
{
    Task<LawyerPricingDto> GetPricingAsync(int lawyerId, int specializationId, int interactionTypeId);
    Task<List<LawyerPricingDto>> GetLawyerPricingAsync(int lawyerId);
    Task SetPricingAsync(int lawyerId, LawyerPricingDto dto);
    Task UpdatePricingAsync(int lawyerId, LawyerPricingDto dto);
    Task DeletePricingAsync(int lawyerId, int specializationId, int interactionTypeId);
}
```

---

### 2. Bookings

#### Models
```csharp
public class Booking
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int LawyerId { get; set; }
    public int SpecializationId { get; set; }
    public int InteractionTypeId { get; set; }
    public decimal PriceSnapshot { get; set; }
    public int DurationSnapshot { get; set; }
    public DateTime Date { get; set; }
    public BookingStatus Status { get; set; }
    public PaymentStatus PaymentStatus { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public User User { get; set; }
    public Lawyer Lawyer { get; set; }
    public Specialization Specialization { get; set; }
    public InteractionType InteractionType { get; set; }
    public PaymentSession PaymentSession { get; set; }
    public Review Review { get; set; }
    public ChatRoom ChatRoom { get; set; }
}

public enum BookingStatus { Pending, Confirmed, Completed, Cancelled }
public enum PaymentStatus { Pending, Paid, Failed }
```

#### Interfaces
```csharp
public interface IBookingService
{
    Task<BookingResponseDto> CreateBookingAsync(int userId, BookingCreateDto dto);
    Task<BookingResponseDto> GetBookingByIdAsync(int id);
    Task<List<BookingResponseDto>> GetUserBookingsAsync(int userId, int page = 1, int limit = 10);
    Task<List<BookingResponseDto>> GetLawyerBookingsAsync(int lawyerId, int page = 1, int limit = 10);
    Task UpdateBookingStatusAsync(int id, BookingStatus status);
    Task CancelBookingAsync(int id);
    Task CompleteBookingAsync(int id);
}
```

---

### 3. Payments

#### Models
```csharp
public class PaymentSession
{
    public int Id { get; set; }
    public int BookingId { get; set; }
    public decimal Amount { get; set; }
    public PaymentSessionStatus Status { get; set; }
    public string Provider { get; set; } // Stripe, PayPal, etc.
    public string ProviderSessionId { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public Booking Booking { get; set; }
}

public enum PaymentSessionStatus { Pending, Success, Failed }
```

#### Interfaces
```csharp
public interface IPaymentService
{
    Task<PaymentSessionResponseDto> CreateSessionAsync(int userId, int bookingId, decimal amount);
    Task<PaymentSessionResponseDto> ConfirmPaymentAsync(int sessionId);
    Task HandleWebhookAsync(string provider, string payload);
    Task RefundPaymentAsync(int sessionId);
}
```

---

### 4. Reviews

#### Models
```csharp
public class Review
{
    public int Id { get; set; }
    public int BookingId { get; set; }
    public int UserId { get; set; }
    public int LawyerId { get; set; }
    public int Rating { get; set; } // 1-5
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public Booking Booking { get; set; }
    public User User { get; set; }
    public Lawyer Lawyer { get; set; }
}
```

#### Interfaces
```csharp
public interface IReviewService
{
    Task<ReviewResponseDto> CreateReviewAsync(int userId, ReviewCreateDto dto);
    Task<List<ReviewResponseDto>> GetLawyerReviewsAsync(int lawyerId, int page = 1, int limit = 10);
    Task<decimal> GetLawyerAverageRatingAsync(int lawyerId);
    Task DeleteReviewAsync(int id);
}
```

---

### 5. Notifications

#### Models
```csharp
public class Notification
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; }
    public string Message { get; set; }
    public NotificationType Type { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public User User { get; set; }
}

public enum NotificationType { Booking, Payment, System, Message }
```

#### Interfaces
```csharp
public interface INotificationService
{
    Task<NotificationResponseDto> CreateNotificationAsync(int userId, NotificationCreateDto dto);
    Task<List<NotificationResponseDto>> GetUserNotificationsAsync(int userId, int page = 1, int limit = 20);
    Task MarkAsReadAsync(int notificationId);
    Task DeleteNotificationAsync(int notificationId);
}
```

---

### 6. Chat System

#### Models
```csharp
public class ChatRoom
{
    public int Id { get; set; }
    public int BookingId { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public Booking Booking { get; set; }
    public ICollection<ChatMessage> Messages { get; set; }
}

public class ChatMessage
{
    public int Id { get; set; }
    public int ChatRoomId { get; set; }
    public int SenderId { get; set; }
    public string Message { get; set; }
    public DateTime SentAt { get; set; }
    
    public ChatRoom ChatRoom { get; set; }
    public User Sender { get; set; }
}
```

#### Interfaces
```csharp
public interface IChatService
{
    Task<ChatRoomResponseDto> GetChatRoomAsync(int bookingId);
    Task<ChatMessageResponseDto> SendMessageAsync(int bookingId, int senderId, string message);
    Task<List<ChatMessageResponseDto>> GetMessagesAsync(int bookingId, int page = 1, int limit = 50);
    Task ArchiveChatRoomAsync(int bookingId);
}
```

---

### 7. Admin Operations

#### Interfaces
```csharp
public interface IAdminService
{
    Task<List<UserResponseDto>> GetAllUsersAsync(int page = 1, int limit = 20);
    Task<List<LawyerResponseDto>> GetPendingLawyersAsync(int page = 1, int limit = 20);
    Task VerifyLawyerAsync(int lawyerId);
    Task RejectLawyerAsync(int lawyerId, string reason);
    Task SuspendUserAsync(int userId);
    Task UnsuspendUserAsync(int userId);
    Task<List<BookingResponseDto>> GetAllBookingsAsync(int page = 1, int limit = 20);
    Task<List<PaymentSessionResponseDto>> GetAllPaymentsAsync(int page = 1, int limit = 20);
}
```

---

## Data Models

### Database Schema

```sql
-- Specializations
CREATE TABLE Specializations (
    Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(500)
);

-- InteractionTypes
CREATE TABLE InteractionTypes (
    Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(50) NOT NULL UNIQUE -- Meeting, Phone, Chat
);

-- Lawyers
CREATE TABLE Lawyers (
    Id INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL UNIQUE,
    ExperienceYears INT NOT NULL,
    IsVerified BIT NOT NULL DEFAULT 0,
    Address NVARCHAR(255),
    Latitude DECIMAL(10,8),
    Longitude DECIMAL(10,8),
    CreatedAt DATETIME2 NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- LawyerSpecializations
CREATE TABLE LawyerSpecializations (
    LawyerId INT NOT NULL,
    SpecializationId INT NOT NULL,
    PRIMARY KEY (LawyerId, SpecializationId),
    FOREIGN KEY (LawyerId) REFERENCES Lawyers(Id),
    FOREIGN KEY (SpecializationId) REFERENCES Specializations(Id)
);

-- LawyerPricing
CREATE TABLE LawyerPricing (
    LawyerId INT NOT NULL,
    SpecializationId INT NOT NULL,
    InteractionTypeId INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    DurationMinutes INT NOT NULL,
    PRIMARY KEY (LawyerId, SpecializationId, InteractionTypeId),
    FOREIGN KEY (LawyerId) REFERENCES Lawyers(Id),
    FOREIGN KEY (SpecializationId) REFERENCES Specializations(Id),
    FOREIGN KEY (InteractionTypeId) REFERENCES InteractionTypes(Id)
);

-- Bookings
CREATE TABLE Bookings (
    Id INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,
    LawyerId INT NOT NULL,
    SpecializationId INT NOT NULL,
    InteractionTypeId INT NOT NULL,
    PriceSnapshot DECIMAL(10,2) NOT NULL,
    DurationSnapshot INT NOT NULL,
    Date DATETIME2 NOT NULL,
    Status NVARCHAR(20) NOT NULL DEFAULT 'Pending',
    PaymentStatus NVARCHAR(20) NOT NULL DEFAULT 'Pending',
    CreatedAt DATETIME2 NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (LawyerId) REFERENCES Lawyers(Id),
    FOREIGN KEY (SpecializationId) REFERENCES Specializations(Id),
    FOREIGN KEY (InteractionTypeId) REFERENCES InteractionTypes(Id)
);

-- PaymentSessions
CREATE TABLE PaymentSessions (
    Id INT PRIMARY KEY IDENTITY,
    BookingId INT NOT NULL UNIQUE,
    Amount DECIMAL(10,2) NOT NULL,
    Status NVARCHAR(20) NOT NULL DEFAULT 'Pending',
    Provider NVARCHAR(50),
    ProviderSessionId NVARCHAR(255),
    CreatedAt DATETIME2 NOT NULL,
    FOREIGN KEY (BookingId) REFERENCES Bookings(Id)
);

-- Reviews
CREATE TABLE Reviews (
    Id INT PRIMARY KEY IDENTITY,
    BookingId INT NOT NULL UNIQUE,
    UserId INT NOT NULL,
    LawyerId INT NOT NULL,
    Rating INT NOT NULL CHECK (Rating >= 1 AND Rating <= 5),
    Comment NVARCHAR(500),
    CreatedAt DATETIME2 NOT NULL,
    FOREIGN KEY (BookingId) REFERENCES Bookings(Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (LawyerId) REFERENCES Lawyers(Id)
);

-- Notifications
CREATE TABLE Notifications (
    Id INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,
    Title NVARCHAR(100) NOT NULL,
    Message NVARCHAR(500) NOT NULL,
    Type NVARCHAR(20) NOT NULL,
    IsRead BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- ChatRooms
CREATE TABLE ChatRooms (
    Id INT PRIMARY KEY IDENTITY,
    BookingId INT NOT NULL UNIQUE,
    CreatedAt DATETIME2 NOT NULL,
    FOREIGN KEY (BookingId) REFERENCES Bookings(Id)
);

-- ChatMessages
CREATE TABLE ChatMessages (
    Id INT PRIMARY KEY IDENTITY,
    ChatRoomId INT NOT NULL,
    SenderId INT NOT NULL,
    Message NVARCHAR(MAX) NOT NULL,
    SentAt DATETIME2 NOT NULL,
    FOREIGN KEY (ChatRoomId) REFERENCES ChatRooms(Id),
    FOREIGN KEY (SenderId) REFERENCES Users(Id)
);

-- Indexes
CREATE INDEX IX_Lawyers_UserId ON Lawyers(UserId);
CREATE INDEX IX_Lawyers_IsVerified ON Lawyers(IsVerified);
CREATE INDEX IX_LawyerSpecializations_SpecializationId ON LawyerSpecializations(SpecializationId);
CREATE INDEX IX_Bookings_UserId ON Bookings(UserId);
CREATE INDEX IX_Bookings_LawyerId ON Bookings(LawyerId);
CREATE INDEX IX_Bookings_Status ON Bookings(Status);
CREATE INDEX IX_Reviews_LawyerId ON Reviews(LawyerId);
CREATE INDEX IX_Notifications_UserId ON Notifications(UserId);
CREATE INDEX IX_Notifications_IsRead ON Notifications(IsRead);
CREATE INDEX IX_ChatMessages_ChatRoomId ON ChatMessages(ChatRoomId);
```

---

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Lawyer Verification Invariant
**For any** lawyer profile, if IsVerified = true, then the lawyer must appear in search results. If IsVerified = false, the lawyer must NOT appear in search results.
**Validates: Requirements 1.5, 1.6, 4.1**

### Property 2: Booking Price Snapshot
**For any** booking, the PriceSnapshot must equal the price from LawyerPricing at the time of booking creation. Future price changes must NOT affect existing bookings.
**Validates: Requirements 3.2, 5.3**

### Property 3: Payment Status Consistency
**For any** booking, if PaymentStatus = "Paid", then Status must be "Confirmed" or "Completed". If PaymentStatus = "Pending", then Status must be "Pending".
**Validates: Requirements 6.4, 6.5**

### Property 4: Review Uniqueness
**For any** booking, there can be at most one review. Creating a second review for the same booking must fail.
**Validates: Requirements 7.4**

### Property 5: Chat Room Linkage
**For any** booking, exactly one ChatRoom must exist. Creating a booking must create a linked ChatRoom.
**Validates: Requirements 5.5, 9.1**

### Property 6: Notification Creation
**For any** booking creation, notifications must be created for both client and lawyer. Both notifications must have the same booking ID reference.
**Validates: Requirements 8.1**

### Property 7: Lawyer Average Rating
**For any** lawyer, the average rating must equal the mean of all review ratings for that lawyer. Adding a new review must update the average.
**Validates: Requirements 7.5, 7.6**

### Property 8: Specialization Cascade Delete
**For any** specialization deletion, all LawyerSpecializations and LawyerPricing records referencing that specialization must be deleted.
**Validates: Requirements 2.5**

---

## Error Handling

### Validation Errors
- Invalid email format → 400 Bad Request
- Missing required fields → 400 Bad Request
- Invalid role → 400 Bad Request
- Invalid rating (not 1-5) → 400 Bad Request

### Authorization Errors
- User not authenticated → 401 Unauthorized
- User lacks required role → 403 Forbidden
- User trying to access other user's data → 403 Forbidden

### Resource Errors
- Lawyer not found → 404 Not Found
- Booking not found → 404 Not Found
- Specialization not found → 404 Not Found

### Business Logic Errors
- Lawyer already verified → 409 Conflict
- Booking date in past → 400 Bad Request
- No pricing for specialization → 400 Bad Request
- Duplicate review for booking → 409 Conflict
- Payment already processed → 409 Conflict

### Server Errors
- Database error → 500 Internal Server Error
- Payment provider error → 502 Bad Gateway
- Unexpected error → 500 Internal Server Error

---

## Testing Strategy

### Unit Tests
- Test each service method independently
- Mock repositories and external services
- Test business logic validation
- Test error scenarios
- Test edge cases

### Integration Tests
- Test full workflows (booking → payment → review)
- Test database operations
- Test service interactions
- Test error handling

### Property-Based Tests
- Property 1: Lawyer verification visibility
- Property 2: Booking price snapshot immutability
- Property 3: Payment status consistency
- Property 4: Review uniqueness
- Property 5: Chat room linkage
- Property 6: Notification creation
- Property 7: Lawyer rating calculation
- Property 8: Specialization cascade delete

### Test Configuration
- Minimum 100 iterations per property test
- Tag format: **Feature: estasheer-phase-2, Property {number}: {property_text}**
- Each property test must reference its design document property

---

## Summary

Phase 2 design implements a complete lawyer consultation platform with:
- ✅ Lawyer management and verification
- ✅ Specialization and pricing management
- ✅ Booking and payment processing
- ✅ Review and rating system
- ✅ Notification system
- ✅ Real-time chat
- ✅ Admin dashboard
- ✅ Comprehensive error handling
- ✅ 8 correctness properties for validation
