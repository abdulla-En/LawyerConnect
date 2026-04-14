# ESTASHEER Phase 2 - Complete System Implementation Requirements

## Introduction

ESTASHEER is a comprehensive legal consultation platform connecting clients with verified lawyers. Phase 1 implemented authentication and basic user management. Phase 2 will complete the entire system with lawyer management, specializations, pricing, bookings, payments, reviews, notifications, and chat functionality.

---

## Glossary

- **System**: ESTASHEER Backend API
- **User**: Any registered account holder (Client, Lawyer, or Admin)
- **Client**: User seeking legal consultation
- **Lawyer**: Verified legal professional offering consultations
- **Admin**: System administrator with full access
- **Specialization**: Legal practice area (e.g., Labour Law, Corporate Law)
- **Interaction_Type**: Consultation method (Meeting, Phone, Chat)
- **Booking**: Consultation request from client to lawyer
- **Payment_Session**: Payment transaction for a booking
- **Review**: Client feedback and rating for completed consultation
- **Notification**: System alert for user events
- **Chat_Room**: Communication channel linked to a booking
- **Chat_Message**: Individual message in a chat room

---

## Requirements

### Requirement 1: Lawyer Profile Management

**User Story:** As a lawyer, I want to create and manage my professional profile, so that clients can find and book my services.

#### Acceptance Criteria

1. WHEN a lawyer registers, THE System SHALL allow them to create a lawyer profile with specializations, experience, and location
2. WHEN a lawyer creates a profile, THE System SHALL set IsVerified = false until admin approval
3. WHEN a lawyer updates their profile, THE System SHALL validate all fields and persist changes
4. WHEN an admin verifies a lawyer, THE System SHALL set IsVerified = true and notify the lawyer
5. WHEN a lawyer is verified, THE System SHALL make them visible in search results
6. WHEN a lawyer is not verified, THE System SHALL hide them from client search results
7. WHEN a lawyer deletes their profile, THE System SHALL cascade delete all related data (bookings, reviews, pricing)

---

### Requirement 2: Specializations Management

**User Story:** As an admin, I want to manage legal specializations, so that lawyers can be categorized and clients can filter by practice area.

#### Acceptance Criteria

1. WHEN an admin creates a specialization, THE System SHALL store it with name and description
2. WHEN a lawyer registers, THE System SHALL allow them to select multiple specializations
3. WHEN a lawyer updates specializations, THE System SHALL update the many-to-many relationship
4. WHEN a client searches, THE System SHALL filter lawyers by selected specializations
5. WHEN a specialization is deleted, THE System SHALL remove it from all lawyers and pricing

---

### Requirement 3: Lawyer Pricing Management

**User Story:** As a lawyer, I want to set pricing for different specializations and interaction types, so that clients know the cost before booking.

#### Acceptance Criteria

1. WHEN a lawyer creates pricing, THE System SHALL store price and duration for each specialization + interaction type combination
2. WHEN a lawyer updates pricing, THE System SHALL update the record without affecting existing bookings
3. WHEN a booking is created, THE System SHALL capture a price snapshot to prevent future price changes
4. WHEN a client views a lawyer, THE System SHALL display current pricing for all specializations
5. WHEN a lawyer has no pricing for a specialization, THE System SHALL prevent bookings for that specialization

---

### Requirement 4: Search and Filter Lawyers

**User Story:** As a client, I want to search for lawyers by specialization, location, and rating, so that I can find the right lawyer for my needs.

#### Acceptance Criteria

1. WHEN a client searches, THE System SHALL return verified lawyers matching the criteria
2. WHEN a client filters by specialization, THE System SHALL return only lawyers with that specialization
3. WHEN a client filters by location, THE System SHALL return lawyers within the specified radius
4. WHEN a client filters by experience, THE System SHALL return lawyers with minimum experience years
5. WHEN a client filters by rating, THE System SHALL return lawyers with minimum average rating
6. WHEN search results are returned, THE System SHALL include lawyer name, photo, specializations, experience, location, and average rating
7. WHEN a client views lawyer details, THE System SHALL display full bio, all specializations, pricing, reviews, and availability

---

### Requirement 5: Booking Management

**User Story:** As a client, I want to create bookings with lawyers, so that I can schedule legal consultations.

#### Acceptance Criteria

1. WHEN a client creates a booking, THE System SHALL validate lawyer exists and is verified
2. WHEN a client creates a booking, THE System SHALL validate pricing exists for selected specialization + interaction type
3. WHEN a booking is created, THE System SHALL capture price and duration snapshots
4. WHEN a booking is created, THE System SHALL set Status = "Pending" and PaymentStatus = "Pending"
5. WHEN a booking is created, THE System SHALL create a linked chat room
6. WHEN a booking is created, THE System SHALL notify both client and lawyer
7. WHEN a booking date is in the past, THE System SHALL reject the booking
8. WHEN a booking is confirmed, THE System SHALL set Status = "Confirmed"
9. WHEN a booking is completed, THE System SHALL set Status = "Completed" and allow reviews
10. WHEN a booking is cancelled, THE System SHALL set Status = "Cancelled" and refund payment if applicable

---

### Requirement 6: Payment Processing

**User Story:** As a client, I want to pay for bookings using a payment provider, so that I can complete consultations.

#### Acceptance Criteria

1. WHEN a client initiates payment, THE System SHALL create a payment session with booking amount
2. WHEN a payment session is created, THE System SHALL set Status = "Pending"
3. WHEN payment provider confirms payment, THE System SHALL update PaymentSession Status = "Success"
4. WHEN payment succeeds, THE System SHALL update Booking PaymentStatus = "Paid" and Status = "Confirmed"
5. WHEN payment fails, THE System SHALL update PaymentSession Status = "Failed"
6. WHEN payment fails, THE System SHALL keep Booking PaymentStatus = "Pending" for retry
7. WHEN a payment is processed, THE System SHALL log transaction details for audit trail
8. WHEN a booking is cancelled, THE System SHALL refund the payment if Status = "Success"

---

### Requirement 7: Reviews and Ratings

**User Story:** As a client, I want to leave reviews and ratings for completed consultations, so that other clients can make informed decisions.

#### Acceptance Criteria

1. WHEN a booking is completed, THE System SHALL allow the client to leave a review
2. WHEN a client submits a review, THE System SHALL validate rating is 1-5 and comment length <= 500 chars
3. WHEN a review is created, THE System SHALL store it linked to booking, client, and lawyer
4. WHEN a review is created, THE System SHALL prevent duplicate reviews for same booking
5. WHEN a review is created, THE System SHALL recalculate lawyer's average rating
6. WHEN a lawyer's rating changes, THE System SHALL update the lawyer profile
7. WHEN a client views a lawyer, THE System SHALL display all reviews and average rating
8. WHEN a review is created, THE System SHALL notify the lawyer

---

### Requirement 8: Notifications System

**User Story:** As a user, I want to receive notifications for important events, so that I stay informed about bookings, payments, and messages.

#### Acceptance Criteria

1. WHEN a booking is created, THE System SHALL create notifications for both client and lawyer
2. WHEN a payment is processed, THE System SHALL create notification for client
3. WHEN a booking is confirmed, THE System SHALL create notification for both parties
4. WHEN a booking is completed, THE System SHALL create notification for both parties
5. WHEN a message is sent, THE System SHALL create notification for recipient
6. WHEN a review is submitted, THE System SHALL create notification for lawyer
7. WHEN a user views notifications, THE System SHALL mark them as read
8. WHEN a notification is created, THE System SHALL store title, message, type, and timestamp

---

### Requirement 9: Chat System

**User Story:** As a user, I want to communicate with the other party through chat, so that I can discuss consultation details.

#### Acceptance Criteria

1. WHEN a booking is created, THE System SHALL create a linked chat room
2. WHEN a user sends a message, THE System SHALL store it with sender ID, content, and timestamp
3. WHEN a message is sent, THE System SHALL create notification for recipient
4. WHEN a user retrieves chat history, THE System SHALL return all messages for that chat room
5. WHEN a booking is cancelled, THE System SHALL archive the chat room
6. WHEN a booking is completed, THE System SHALL archive the chat room
7. WHEN a user views chat, THE System SHALL display messages in chronological order

---

### Requirement 10: Admin Management

**User Story:** As an admin, I want to manage users, verify lawyers, and monitor system activity, so that I can maintain platform quality.

#### Acceptance Criteria

1. WHEN an admin views users, THE System SHALL display all users with role, email, and creation date
2. WHEN an admin views pending lawyers, THE System SHALL display unverified lawyer profiles
3. WHEN an admin verifies a lawyer, THE System SHALL set IsVerified = true and notify lawyer
4. WHEN an admin rejects a lawyer, THE System SHALL notify lawyer with reason
5. WHEN an admin suspends a user, THE System SHALL prevent login and revoke all tokens
6. WHEN an admin views bookings, THE System SHALL display all bookings with status and payment status
7. WHEN an admin views payments, THE System SHALL display all payment sessions with status
8. WHEN an admin views system logs, THE System SHALL display all user activities

---

## Data Models

### Users Table
- Id (PK)
- FullName
- Email (UNIQUE)
- PasswordHash
- Role (Client, Lawyer, Admin)
- Phone
- City
- ProfilePhoto
- CreatedAt

### RefreshTokens Table
- Id (PK)
- UserId (FK)
- TokenHash (UNIQUE)
- ExpiresAt
- Revoked
- CreatedAt
- RevokedDate
- RevokeReason
- ReplacedByTokenId (FK)
- IpAddress
- UserAgent

### Lawyers Table
- Id (PK)
- UserId (FK, UNIQUE)
- ExperienceYears
- Verified
- Address
- Latitude
- Longitude
- CreatedAt

### Specializations Table
- Id (PK)
- Name
- Description

### LawyerSpecializations Table
- LawyerId (FK)
- SpecializationId (FK)
- PK (LawyerId, SpecializationId)

### InteractionTypes Table
- Id (PK)
- Name (Meeting, Phone, Chat)

### LawyerPricing Table
- LawyerId (FK)
- SpecializationId (FK)
- InteractionTypeId (FK)
- Price
- DurationMinutes
- PK (LawyerId, SpecializationId, InteractionTypeId)

### Bookings Table
- Id (PK)
- UserId (FK)
- LawyerId (FK)
- SpecializationId (FK)
- InteractionTypeId (FK)
- PriceSnapshot
- DurationSnapshot
- Date
- Status (Pending, Confirmed, Completed, Cancelled)
- PaymentStatus (Pending, Paid, Failed)
- CreatedAt

### PaymentSessions Table
- Id (PK)
- BookingId (FK, UNIQUE)
- Amount
- Status (Pending, Success, Failed)
- Provider
- ProviderSessionId
- CreatedAt

### Reviews Table
- Id (PK)
- BookingId (FK, UNIQUE)
- UserId (FK)
- LawyerId (FK)
- Rating (1-5)
- Comment
- CreatedAt

### Notifications Table
- Id (PK)
- UserId (FK)
- Title
- Message
- Type (Booking, Payment, System)
- IsRead
- CreatedAt

### ChatRooms Table
- Id (PK)
- BookingId (FK, UNIQUE)
- CreatedAt

### ChatMessages Table
- Id (PK)
- ChatRoomId (FK)
- SenderId (FK)
- Message
- SentAt

---

## API Endpoints Summary

### Lawyer Management (13 endpoints)
- POST /api/lawyers/register
- GET /api/lawyers
- GET /api/lawyers/{id}
- GET /api/lawyers/me
- PUT /api/lawyers/{id}
- DELETE /api/lawyers/{id}
- POST /api/lawyers/{id}/specializations
- PUT /api/lawyers/{id}/specializations
- DELETE /api/lawyers/{id}/specializations
- POST /api/lawyers/{id}/pricing
- PUT /api/lawyers/{id}/pricing
- DELETE /api/lawyers/{id}/pricing
- PUT /api/lawyers/{id}/verify (Admin)

### Specializations (4 endpoints)
- GET /api/specializations
- POST /api/specializations (Admin)
- PUT /api/specializations/{id} (Admin)
- DELETE /api/specializations/{id} (Admin)

### Bookings (6 endpoints)
- POST /api/bookings
- GET /api/bookings/{id}
- GET /api/bookings/user
- GET /api/bookings/lawyer
- PUT /api/bookings/{id}/status
- DELETE /api/bookings/{id}

### Payments (3 endpoints)
- POST /api/payments/create-session
- POST /api/payments/confirm
- GET /api/payments/{id}

### Reviews (3 endpoints)
- POST /api/reviews
- GET /api/reviews/lawyer/{id}
- GET /api/reviews/booking/{id}

### Notifications (3 endpoints)
- GET /api/notifications
- PUT /api/notifications/{id}/read
- DELETE /api/notifications/{id}

### Chat (4 endpoints)
- GET /api/chat/{bookingId}
- POST /api/chat/{bookingId}/messages
- GET /api/chat/{bookingId}/messages
- DELETE /api/chat/{bookingId}

### Admin (5 endpoints)
- GET /api/admin/users
- GET /api/admin/lawyers/pending
- PUT /api/admin/lawyers/{id}/verify
- PUT /api/admin/users/{id}/suspend
- GET /api/admin/logs

---

## Summary

Phase 2 will implement 41 API endpoints across 8 feature areas, completing the full ESTASHEER platform with lawyer management, pricing, bookings, payments, reviews, notifications, and chat functionality.
