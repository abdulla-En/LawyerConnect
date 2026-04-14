# ESTASHEER Project - Complete Study Guide & Mind Map

## 🎯 Project Overview

**ESTASHEER** is a legal consultation platform connecting clients with verified lawyers. Think of it like Uber for legal services.

**Core Concept:**
- Clients search for lawyers → Book consultations → Pay → Leave reviews
- Lawyers create profiles → Set pricing → Accept bookings → Earn money
- Admins manage the platform → Verify lawyers → Monitor activity

---

## 📊 Architecture Mind Map

```
ESTASHEER PROJECT
│
├── 🔐 AUTHENTICATION LAYER (Phase 1 - Already Done)
│   ├── User Registration (Email, Password, Role)
│   ├── User Login (JWT Tokens)
│   ├── Token Management (Refresh, Revoke)
│   └── Role-Based Access Control (Client, Lawyer, Admin)
│
├── 👥 USER MANAGEMENT (Phase 1 - Already Done)
│   ├── User Profiles
│   ├── User Roles
│   └── User Suspension
│
├── ⚖️ LAWYER MANAGEMENT (Phase 2A-2B)
│   ├── Lawyer Profiles
│   │   ├── Experience Years
│   │   ├── Verification Status
│   │   └── Location (Latitude/Longitude)
│   │
│   ├── Specializations
│   │   ├── Criminal Law
│   │   ├── Corporate Law
│   │   └── Family Law
│   │
│   ├── Lawyer-Specialization Mapping
│   │   └── Many-to-Many Relationship
│   │
│   └── Pricing Management
│       ├── Price per Specialization
│       ├── Price per Interaction Type
│       └── Duration per Service
│
├── 🔍 SEARCH & DISCOVERY (Phase 2C)
│   ├── Search by Specialization
│   ├── Search by Location (Radius)
│   ├── Search by Experience
│   ├── Search by Rating
│   └── Combined Filters
│
├── 📅 BOOKING SYSTEM (Phase 2D)
│   ├── Create Booking
│   │   ├── Validate Lawyer Exists
│   │   ├── Validate Pricing Exists
│   │   ├── Capture Price Snapshot
│   │   └── Create Chat Room
│   │
│   ├── Booking Status Flow
│   │   ├── Pending → Confirmed → Completed
│   │   └── Any Status → Cancelled
│   │
│   ├── Payment Status
│   │   ├── Pending
│   │   ├── Paid
│   │   └── Failed
│   │
│   └── Notifications on Booking Events
│
├── 💳 PAYMENT PROCESSING (Phase 2E)
│   ├── Create Payment Session
│   ├── Confirm Payment (Stripe/PayPal)
│   ├── Handle Webhooks
│   ├── Refund Logic
│   └── Payment Audit Trail
│
├── ⭐ REVIEWS & RATINGS (Phase 2F)
│   ├── Create Review (After Booking Completed)
│   ├── Rating (1-5 stars)
│   ├── Comment (Text)
│   ├── Prevent Duplicate Reviews
│   ├── Calculate Average Rating
│   └── Notify Lawyer on Review
│
├── 🔔 NOTIFICATIONS (Phase 2G)
│   ├── Booking Events
│   │   ├── Booking Created
│   │   ├── Booking Confirmed
│   │   └── Booking Completed
│   │
│   ├── Payment Events
│   │   ├── Payment Processed
│   │   └── Payment Failed
│   │
│   ├── Message Events
│   │   └── New Message Received
│   │
│   ├── Review Events
│   │   └── New Review Submitted
│   │
│   └── Notification Management
│       ├── Mark as Read
│       └── Delete
│
├── 💬 CHAT SYSTEM (Phase 2H)
│   ├── Chat Room (Linked to Booking)
│   ├── Send Message
│   ├── Retrieve Messages (Paginated)
│   ├── Archive Chat (On Booking Complete)
│   └── Notify on New Message
│
└── 🛡️ ADMIN DASHBOARD (Phase 2I)
    ├── User Management
    │   ├── View All Users
    │   └── Suspend/Unsuspend Users
    │
    ├── Lawyer Management
    │   ├── View Pending Lawyers
    │   ├── Verify Lawyers
    │   └── Reject Lawyers
    │
    ├── Monitoring
    │   ├── View All Bookings
    │   ├── View All Payments
    │   └── View System Logs
    │
    └── Specialization Management
        ├── Create Specialization
        ├── Update Specialization
        └── Delete Specialization
```

---

## 🏗️ Technical Architecture

### 3-Layer Architecture Pattern

```
┌─────────────────────────────────────────┐
│         HTTP LAYER (Controllers)        │
│  - Handle HTTP Requests/Responses       │
│  - Extract User from JWT Token          │
│  - Return JSON Responses                │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│    BUSINESS LOGIC LAYER (Services)      │
│  - Implement Business Rules             │
│  - Validate Data                        │
│  - Orchestrate Operations               │
│  - Handle Errors                        │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│   DATA ACCESS LAYER (Repositories)      │
│  - Query Database                       │
│  - Create/Update/Delete Records         │
│  - Handle Database Transactions         │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      PERSISTENCE LAYER (Database)       │
│  - SQL Server                           │
│  - Entity Framework Core ORM            │
│  - Migrations                           │
└─────────────────────────────────────────┘
```

### Data Flow Example: Create Booking

```
1. CLIENT REQUEST
   POST /api/bookings
   {
     "lawyerId": 1,
     "specializationId": 1,
     "interactionTypeId": 1,
     "date": "2025-03-15T10:00:00Z"
   }
   ↓
2. CONTROLLER (BookingsController)
   - Extract userId from JWT token
   - Validate input
   - Call BookingService.CreateBookingAsync()
   ↓
3. SERVICE (BookingService)
   - Validate lawyer exists and is verified
   - Validate pricing exists
   - Get pricing snapshot
   - Create booking record
   - Create chat room
   - Create notifications
   - Call BookingRepository.AddAsync()
   ↓
4. REPOSITORY (BookingRepository)
   - Add booking to DbContext
   - SaveChangesAsync() to database
   ↓
5. DATABASE
   - Insert into Bookings table
   - Insert into ChatRooms table
   - Insert into Notifications table
   ↓
6. RESPONSE
   {
     "id": 1,
     "userId": 1,
     "lawyerId": 1,
     "status": "Pending",
     "paymentStatus": "Pending",
     "createdAt": "2025-03-15T10:00:00Z"
   }
```

---

## 📁 Project Structure

### Folder Organization

```
LawyerConnect/
│
├── Controllers/              (HTTP Layer)
│   ├── AuthController.cs
│   ├── UsersController.cs
│   ├── LawyersController.cs
│   ├── SpecializationsController.cs
│   ├── BookingsController.cs
│   ├── PaymentsController.cs
│   ├── ReviewsController.cs
│   ├── NotificationsController.cs
│   ├── ChatController.cs
│   └── AdminController.cs
│
├── Services/                 (Business Logic Layer)
│   ├── AuthService.cs
│   ├── UserService.cs
│   ├── LawyerService.cs
│   ├── SpecializationService.cs
│   ├── PricingService.cs
│   ├── BookingService.cs
│   ├── PaymentService.cs
│   ├── ReviewService.cs
│   ├── NotificationService.cs
│   ├── ChatService.cs
│   └── AdminService.cs
│
├── Repositories/             (Data Access Layer)
│   ├── UserRepository.cs
│   ├── LawyerRepository.cs
│   ├── SpecializationRepository.cs
│   ├── BookingRepository.cs
│   ├── PaymentSessionRepository.cs
│   ├── ReviewRepository.cs
│   ├── NotificationRepository.cs
│   ├── ChatRoomRepository.cs
│   └── ChatMessageRepository.cs
│
├── Models/                   (Database Models)
│   ├── User.cs
│   ├── Lawyer.cs
│   ├── Specialization.cs
│   ├── LawyerSpecialization.cs
│   ├── LawyerPricing.cs
│   ├── Booking.cs
│   ├── PaymentSession.cs
│   ├── Review.cs
│   ├── Notification.cs
│   ├── ChatRoom.cs
│   └── ChatMessage.cs
│
├── DTOs/                     (Data Transfer Objects)
│   ├── AuthResponseDto.cs
│   ├── LawyerResponseDto.cs
│   ├── BookingResponseDto.cs
│   ├── PaymentSessionResponseDto.cs
│   ├── ReviewResponseDto.cs
│   ├── NotificationResponseDto.cs
│   ├── ChatRoomResponseDto.cs
│   └── ChatMessageResponseDto.cs
│
├── Mappers/                  (Model to DTO Conversion)
│   ├── LawyerMapper.cs
│   ├── BookingMapper.cs
│   └── ReviewMapper.cs
│
├── Data/
│   └── LawyerConnectDbContext.cs  (EF Core DbContext)
│
├── Migrations/               (Database Migrations)
│   └── Phase2Models.cs
│
├── Program.cs                (Dependency Injection Setup)
└── LawyerConnect.http        (API Testing File)
```

---

## 🔄 Key Workflows

### Workflow 1: Client Booking a Lawyer

```
START
  ↓
1. CLIENT REGISTERS
   - Email, Password, Name, Phone, City
   - Role: "Client"
  ↓
2. CLIENT LOGS IN
   - Get JWT Token
  ↓
3. CLIENT SEARCHES LAWYERS
   - Filter by specialization, location, rating
   - See verified lawyers only
  ↓
4. CLIENT VIEWS LAWYER DETAILS
   - See experience, specializations, pricing, reviews
  ↓
5. CLIENT CREATES BOOKING
   - Select specialization, interaction type, date
   - System captures price snapshot
   - Chat room created automatically
   - Notifications sent to both parties
  ↓
6. CLIENT CREATES PAYMENT
   - Amount = price snapshot
   - Payment provider: Stripe/PayPal
  ↓
7. CLIENT CONFIRMS PAYMENT
   - Payment processed
   - Booking status → "Confirmed"
   - Notifications sent
  ↓
8. CLIENT & LAWYER CHAT
   - Send messages through chat room
   - Notifications on new messages
  ↓
9. BOOKING COMPLETED
   - Lawyer marks booking as "Completed"
   - Chat room archived
  ↓
10. CLIENT LEAVES REVIEW
    - Rating (1-5 stars)
    - Comment
    - Lawyer's average rating updated
    - Lawyer notified
  ↓
END
```

### Workflow 2: Lawyer Setting Up Profile

```
START
  ↓
1. LAWYER REGISTERS
   - Email, Password, Name, Phone, City
   - Role: "Lawyer"
  ↓
2. LAWYER LOGS IN
   - Get JWT Token
  ↓
3. LAWYER CREATES PROFILE
   - Experience years
   - Address, Latitude, Longitude
   - Select specializations
   - Status: "Not Verified" (pending admin approval)
  ↓
4. ADMIN VERIFIES LAWYER
   - Admin reviews profile
   - Admin clicks "Verify"
   - Lawyer status → "Verified"
   - Lawyer notified
  ↓
5. LAWYER SETS PRICING
   - For each specialization + interaction type
   - Set price and duration
  ↓
6. LAWYER APPEARS IN SEARCH
   - Clients can now find and book
  ↓
7. LAWYER RECEIVES BOOKINGS
   - Notifications on new bookings
  ↓
8. LAWYER CONFIRMS BOOKINGS
   - Review booking details
   - Confirm or reject
  ↓
9. LAWYER CHATS WITH CLIENT
   - Send messages
   - Receive notifications
  ↓
10. LAWYER COMPLETES BOOKING
    - Mark as "Completed"
    - Chat archived
  ↓
11. LAWYER RECEIVES REVIEW
    - Client leaves rating + comment
    - Average rating updated
  ↓
END
```

### Workflow 3: Admin Managing Platform

```
START
  ↓
1. ADMIN LOGS IN
   - Email, Password
   - Role: "Admin"
  ↓
2. ADMIN VIEWS PENDING LAWYERS
   - See unverified lawyer profiles
  ↓
3. ADMIN VERIFIES LAWYER
   - Review profile
   - Click "Verify"
   - Lawyer notified
  ↓
4. ADMIN CREATES SPECIALIZATIONS
   - Add new practice areas
   - Update descriptions
  ↓
5. ADMIN MONITORS BOOKINGS
   - View all bookings
   - See status and payment status
  ↓
6. ADMIN MONITORS PAYMENTS
   - View all payment sessions
   - See success/failed payments
  ↓
7. ADMIN MANAGES USERS
   - View all users
   - Suspend/unsuspend accounts
  ↓
8. ADMIN VIEWS SYSTEM LOGS
   - Monitor activity
   - Track transactions
  ↓
END
```

---

## 🗄️ Database Schema (Simplified)

### Core Tables

```
USERS
├── Id (PK)
├── FullName
├── Email (UNIQUE)
├── PasswordHash
├── Role (Client, Lawyer, Admin)
├── Phone
├── City
└── CreatedAt

LAWYERS
├── Id (PK)
├── UserId (FK → Users)
├── ExperienceYears
├── IsVerified
├── Address
├── Latitude
├── Longitude
└── CreatedAt

SPECIALIZATIONS
├── Id (PK)
├── Name
└── Description

LAWYER_SPECIALIZATIONS (Join Table)
├── LawyerId (FK)
├── SpecializationId (FK)
└── PK (LawyerId, SpecializationId)

LAWYER_PRICING
├── LawyerId (FK)
├── SpecializationId (FK)
├── InteractionTypeId (FK)
├── Price
├── DurationMinutes
└── PK (LawyerId, SpecializationId, InteractionTypeId)

BOOKINGS
├── Id (PK)
├── UserId (FK → Users)
├── LawyerId (FK → Lawyers)
├── SpecializationId (FK)
├── InteractionTypeId (FK)
├── PriceSnapshot
├── DurationSnapshot
├── Date
├── Status (Pending, Confirmed, Completed, Cancelled)
├── PaymentStatus (Pending, Paid, Failed)
└── CreatedAt

PAYMENT_SESSIONS
├── Id (PK)
├── BookingId (FK → Bookings)
├── Amount
├── Status (Pending, Success, Failed)
├── Provider (Stripe, PayPal)
├── ProviderSessionId
└── CreatedAt

REVIEWS
├── Id (PK)
├── BookingId (FK → Bookings)
├── UserId (FK → Users)
├── LawyerId (FK → Lawyers)
├── Rating (1-5)
├── Comment
└── CreatedAt

NOTIFICATIONS
├── Id (PK)
├── UserId (FK → Users)
├── Title
├── Message
├── Type (Booking, Payment, System, Message)
├── IsRead
└── CreatedAt

CHAT_ROOMS
├── Id (PK)
├── BookingId (FK → Bookings)
└── CreatedAt

CHAT_MESSAGES
├── Id (PK)
├── ChatRoomId (FK → ChatRooms)
├── SenderId (FK → Users)
├── Message
└── SentAt
```

---

## 📚 How to Study This Project

### Phase 1: Understand the Basics (1-2 hours)

1. **Read this guide** - Understand the overall concept
2. **Read requirements.md** - Understand what the system should do
3. **Read design.md** - Understand how it's built
4. **Look at Program.cs** - See how services are wired up

### Phase 2: Study One Feature at a Time (2-3 hours per feature)

**For each feature, follow this pattern:**

1. **Read the Models**
   - Open `Models/[Feature].cs`
   - Understand the data structure
   - See relationships to other models

2. **Read the DTOs**
   - Open `DTOs/[Feature]Dto.cs`
   - Understand what data is sent/received

3. **Read the Repository**
   - Open `Repositories/I[Feature]Repository.cs` (interface)
   - Open `Repositories/[Feature]Repository.cs` (implementation)
   - Understand database queries

4. **Read the Service**
   - Open `Services/I[Feature]Service.cs` (interface)
   - Open `Services/[Feature]Service.cs` (implementation)
   - Understand business logic

5. **Read the Controller**
   - Open `Controllers/[Feature]Controller.cs`
   - Understand HTTP endpoints
   - See how service is called

6. **Test with LawyerConnect.http**
   - Run the requests for this feature
   - See real responses

### Phase 3: Study Complete Workflows (1-2 hours)

1. **Client Booking Workflow**
   - Follow the flow from search → booking → payment → review
   - See how all features work together

2. **Lawyer Setup Workflow**
   - Follow the flow from registration → verification → pricing → bookings

3. **Admin Management Workflow**
   - Follow the flow of admin operations

### Phase 4: Deep Dive into Complex Features (2-3 hours each)

1. **Booking System**
   - Most complex feature
   - Involves pricing snapshot, chat room creation, notifications
   - Study the BookingService carefully

2. **Payment System**
   - Involves external provider (Stripe)
   - Study payment status transitions
   - Understand webhook handling

3. **Notification System**
   - Event-driven architecture
   - Study when notifications are created
   - See how they're linked to other features

---

## 🎓 Study Order Recommendation

### Week 1: Foundation
- [ ] Day 1: Read this guide + requirements + design
- [ ] Day 2: Study Authentication (Phase 1)
- [ ] Day 3: Study User Management (Phase 1)
- [ ] Day 4: Study Specializations (Phase 2A)
- [ ] Day 5: Study Lawyer Management (Phase 2B)

### Week 2: Core Features
- [ ] Day 1: Study Search & Filter (Phase 2C)
- [ ] Day 2: Study Bookings (Phase 2D) - Most important!
- [ ] Day 3: Study Payments (Phase 2E)
- [ ] Day 4: Study Reviews (Phase 2F)
- [ ] Day 5: Study Notifications (Phase 2G)

### Week 3: Advanced Features
- [ ] Day 1: Study Chat System (Phase 2H)
- [ ] Day 2: Study Admin Dashboard (Phase 2I)
- [ ] Day 3: Study complete workflows
- [ ] Day 4: Test all endpoints with LawyerConnect.http
- [ ] Day 5: Review and consolidate knowledge

---

## 🔑 Key Concepts to Understand

### 1. JWT Authentication
- User logs in → Gets JWT token
- Token contains userId, email, role
- Token sent in Authorization header
- Server validates token on each request

### 2. Role-Based Access Control
- Client: Can create bookings, leave reviews, chat
- Lawyer: Can set pricing, confirm bookings, chat
- Admin: Can verify lawyers, manage users, view logs

### 3. Price Snapshot
- When booking created, capture current price
- Store in booking record
- Future price changes don't affect existing bookings
- Ensures fair pricing

### 4. Chat Room Linkage
- Each booking has exactly one chat room
- Created automatically when booking created
- Archived when booking completed/cancelled
- Ensures 1:1 relationship

### 5. Notification Events
- Booking created → Notify both parties
- Payment processed → Notify client
- Message sent → Notify recipient
- Review submitted → Notify lawyer

### 6. Status Transitions
- Booking: Pending → Confirmed → Completed (or Cancelled)
- Payment: Pending → Success/Failed
- Lawyer: Not Verified → Verified

---

## 💡 Tips for Understanding

1. **Start Small** - Don't try to understand everything at once
2. **Follow the Data** - Trace how data flows through layers
3. **Read Code Comments** - They explain the "why"
4. **Test as You Learn** - Use LawyerConnect.http to see real responses
5. **Draw Diagrams** - Visualize relationships and flows
6. **Ask Questions** - If something doesn't make sense, investigate
7. **Take Notes** - Write down key concepts
8. **Build Incrementally** - Understand one feature before moving to next

---

## 🚀 Next Steps After Understanding

1. **Run the Backend** - `dotnet run`
2. **Test All Endpoints** - Use LawyerConnect.http
3. **Build the Frontend** - React app to consume these APIs
4. **Add Tests** - Unit tests, integration tests, property-based tests
5. **Deploy** - Set up staging and production environments

---

## 📞 Quick Reference

### Total Endpoints: 41

| Feature | Count | Complexity |
|---------|-------|-----------|
| Authentication | 8 | Low |
| Specializations | 5 | Low |
| Lawyers | 12 | Medium |
| Search | 5 | Medium |
| Bookings | 8 | High |
| Payments | 3 | High |
| Reviews | 4 | Low |
| Notifications | 4 | Medium |
| Chat | 5 | Medium |
| Admin | 8 | Medium |

### Key Files to Study First

1. `Program.cs` - Dependency injection setup
2. `Models/Booking.cs` - Most complex model
3. `Services/BookingService.cs` - Most complex service
4. `Controllers/BookingsController.cs` - Most complex controller
5. `LawyerConnect.http` - Test all endpoints

---

## ✅ Checklist for Understanding

- [ ] I understand the overall concept (Uber for lawyers)
- [ ] I understand the 3-layer architecture
- [ ] I understand the database schema
- [ ] I understand the client booking workflow
- [ ] I understand the lawyer setup workflow
- [ ] I understand the admin management workflow
- [ ] I can trace data flow through all layers
- [ ] I understand JWT authentication
- [ ] I understand role-based access control
- [ ] I can explain each of the 41 endpoints
- [ ] I can test all endpoints with LawyerConnect.http
- [ ] I'm ready to build the frontend

---

## 🎯 Remember

**You didn't build this alone - it was built incrementally:**
- Phase 1: Authentication (foundation)
- Phase 2A: Data Models (structure)
- Phase 2B: Lawyer Management (core feature)
- Phase 2C: Search (discovery)
- Phase 2D: Bookings (main workflow)
- Phase 2E: Payments (monetization)
- Phase 2F: Reviews (feedback)
- Phase 2G: Notifications (engagement)
- Phase 2H: Chat (communication)
- Phase 2I: Admin (management)

**Each phase builds on the previous one. You can understand it the same way - one phase at a time.**

The project is big, but it's organized logically. Take it step by step, and you'll master it! 💪

