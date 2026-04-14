# ESTASHEER - Core Flows Documentation

## Overview
This document describes the core business flows of ESTASHEER with simplified sequence diagrams and use case tables.

---

## UC-1: User Registration

**Table:** USERS  
**Description:** A new user creates an account in the system.

**Actor(s):**
- Primary: New User
- Secondary: System

**Trigger:**
- User clicks "Sign Up" button

**Pre-condition:**
- User is not already registered
- Email is not in use

**Main Flow:**
1. User navigates to registration page
2. User enters: Full Name, Email, Password, Phone, City
3. Frontend validates input locally
4. Frontend sends POST /api/auth/register
5. Controller validates DTO
6. Service checks if email exists
7. If email exists → Return 409 Conflict
8. If email not exists → Hash password
9. Service creates user record in USERS table
10. Service returns UserResponseDto
11. Frontend displays "Registration successful"
12. Frontend redirects to login page

**Alternative Flows:**

**AF-1: Email Already Exists**
- At step 6, if email found in USERS table
- Service throws ConflictException
- Controller returns 409 Conflict
- Frontend displays "Email already registered"

**AF-2: Invalid Input**
- At step 3, if validation fails
- Frontend displays error message
- User corrects and retries

**AF-3: Server Error**
- At step 9, if database insert fails
- Service throws exception
- Controller returns 500 Internal Server Error
- Frontend displays "Registration failed. Try again."

**Post-Condition:**
- New user record created in USERS table
- User can now login
- User has default role "Client"

**Sequence Diagram:**

```
sequenceDiagram
    participant User
    participant Frontend
    participant Controller
    participant Service
    participant Database

    User->>Frontend: Click Sign Up
    Frontend->>Frontend: Validate input locally
    Frontend->>Controller: POST /api/auth/register
    Controller->>Controller: Validate DTO
    Controller->>Service: RegisterAsync(dto)
    
    Service->>Database: SELECT * FROM USERS WHERE Email = ?
    Database-->>Service: User or null
    
    alt Email exists
        Service-->>Controller: Throw ConflictException
        Controller-->>Frontend: 409 Conflict
        Frontend-->>User: "Email already registered"
    else Email not exists
        Service->>Service: Hash password (bcrypt)
        Service->>Database: INSERT INTO USERS
        Database-->>Service: User created
        Service-->>Controller: UserResponseDto
        Controller-->>Frontend: 201 Created
        Frontend-->>User: "Registration successful"
        Frontend->>Frontend: Redirect to /login
    end
```

---

## UC-2: User Login

**Table:** USERS, REFRESH_TOKENS  
**Description:** An existing user logs into the system.

**Actor(s):**
- Primary: Registered User
- Secondary: System

**Trigger:**
- User clicks "Login" button

**Pre-condition:**
- User account exists in USERS table
- User is not already logged in
- Account is not suspended

**Main Flow:**
1. User navigates to login page
2. User enters: Email, Password
3. Frontend validates input locally
4. Frontend sends POST /api/auth/login
5. Controller validates DTO
6. Service queries USERS table by email
7. If email not found → Return 401 Unauthorized
8. If email found → Compare hashed password
9. If password mismatch → Return 401 Unauthorized
10. If password match:
    - Service generates JWT access token (30 min expiry)
    - Service generates refresh token (7 days expiry)
    - Service stores refresh token in REFRESH_TOKENS table
    - Service returns AuthResponseDto with tokens
11. Frontend stores access token in memory/localStorage
12. Frontend stores refresh token in httpOnly cookie
13. Frontend redirects to dashboard
14. User is now authenticated

**Alternative Flows:**

**AF-1: User Not Found**
- At step 6, if email doesn't exist
- Service returns 401 Unauthorized
- Frontend displays "Invalid email or password"

**AF-2: Password Incorrect**
- At step 8, if password hash doesn't match
- Service returns 401 Unauthorized
- Frontend displays "Invalid email or password"

**AF-3: Account Suspended**
- At step 6, if user.IsSuspended = true
- Service returns 403 Forbidden
- Frontend displays "Account suspended. Contact support."

**Post-Condition:**
- User authenticated with valid access token
- Refresh token stored in REFRESH_TOKENS table
- User can access protected resources
- User redirected to dashboard

**Sequence Diagram:**

```
sequenceDiagram
    participant User
    participant Frontend
    participant Controller
    participant Service
    participant Database

    User->>Frontend: Click Login
    Frontend->>Frontend: Validate input locally
    Frontend->>Controller: POST /api/auth/login
    Controller->>Controller: Validate DTO
    Controller->>Service: LoginAsync(email, password)
    
    Service->>Database: SELECT * FROM USERS WHERE Email = ?
    Database-->>Service: User or null
    
    alt User not found
        Service-->>Controller: Throw UnauthorizedException
        Controller-->>Frontend: 401 Unauthorized
        Frontend-->>User: "Invalid email or password"
    else User found
        Service->>Service: Compare password hash
        alt Password mismatch
            Service-->>Controller: Throw UnauthorizedException
            Controller-->>Frontend: 401 Unauthorized
            Frontend-->>User: "Invalid email or password"
        else Password match
            Service->>Service: Generate JWT token (30 min)
            Service->>Service: Generate refresh token (7 days)
            Service->>Database: INSERT INTO REFRESH_TOKENS
            Database-->>Service: Token stored
            Service-->>Controller: AuthResponseDto
            Controller-->>Frontend: 200 OK + tokens
            Frontend->>Frontend: Store access token
            Frontend->>Frontend: Store refresh token in httpOnly cookie
            Frontend->>Frontend: Redirect to /dashboard
            Frontend-->>User: Logged in successfully
        end
    end
```

---

## UC-3: Lawyer Registration

**Table:** USERS, LAWYERS, LAWYER_SPECIALIZATIONS  
**Description:** A lawyer creates their professional profile.

**Actor(s):**
- Primary: Lawyer User
- Secondary: System

**Trigger:**
- Lawyer clicks "Create Lawyer Profile" button

**Pre-condition:**
- User is authenticated
- User role is "Lawyer"
- User doesn't already have a lawyer profile

**Main Flow:**
1. Lawyer navigates to lawyer registration page
2. Lawyer enters: Experience Years, Address, Latitude, Longitude, Specialization IDs
3. Frontend validates input locally
4. Frontend sends POST /api/lawyers/register with JWT token
5. Controller extracts userId from JWT token
6. Controller validates DTO
7. Service checks if lawyer profile already exists for this user
8. If exists → Return 409 Conflict
9. If not exists:
    - Service creates lawyer record in LAWYERS table
    - Service links specializations in LAWYER_SPECIALIZATIONS table
    - Service sets IsVerified = false (pending admin approval)
    - Service returns LawyerResponseDto
10. Frontend displays "Profile created successfully"
11. Frontend displays "Awaiting admin verification"
12. Lawyer can now set pricing

**Alternative Flows:**

**AF-1: Lawyer Profile Already Exists**
- At step 7, if lawyer profile found
- Service returns 409 Conflict
- Frontend displays "Lawyer profile already exists"

**AF-2: Invalid Specialization ID**
- At step 9, if specialization doesn't exist
- Service throws NotFoundException
- Controller returns 404 Not Found
- Frontend displays "Invalid specialization"

**AF-3: Unauthorized (Not Lawyer)**
- At step 5, if user role is not "Lawyer"
- Controller returns 403 Forbidden
- Frontend displays "Only lawyers can create profiles"

**Post-Condition:**
- Lawyer record created in LAWYERS table
- Specializations linked in LAWYER_SPECIALIZATIONS table
- IsVerified = false (pending admin approval)
- Lawyer can set pricing
- Lawyer appears in admin pending list

**Sequence Diagram:**

```
sequenceDiagram
    participant Lawyer
    participant Frontend
    participant Controller
    participant Service
    participant Database

    Lawyer->>Frontend: Click Create Lawyer Profile
    Frontend->>Frontend: Validate input locally
    Frontend->>Controller: POST /api/lawyers/register + JWT
    Controller->>Controller: Extract userId from JWT
    Controller->>Controller: Validate DTO
    Controller->>Service: RegisterLawyerAsync(dto, userId)
    
    Service->>Database: SELECT * FROM LAWYERS WHERE UserId = ?
    Database-->>Service: Lawyer or null
    
    alt Lawyer profile exists
        Service-->>Controller: Throw ConflictException
        Controller-->>Frontend: 409 Conflict
        Frontend-->>Lawyer: "Profile already exists"
    else Lawyer profile not exists
        Service->>Database: INSERT INTO LAWYERS
        Database-->>Service: Lawyer created
        Service->>Database: INSERT INTO LAWYER_SPECIALIZATIONS
        Database-->>Service: Specializations linked
        Service-->>Controller: LawyerResponseDto
        Controller-->>Frontend: 201 Created
        Frontend-->>Lawyer: "Profile created successfully"
        Frontend->>Frontend: Redirect to /lawyer/pricing
    end
```

---

## UC-4: Search Lawyers

**Table:** LAWYERS, LAWYER_SPECIALIZATIONS, REVIEWS  
**Description:** A client searches for lawyers by various filters.

**Actor(s):**
- Primary: Client (or any user)
- Secondary: System

**Trigger:**
- Client clicks "Search Lawyers" or applies filters

**Pre-condition:**
- At least one verified lawyer exists
- Specializations exist in system

**Main Flow:**
1. Client navigates to search page
2. Client enters filters: Specialization, Location (Lat/Long), Experience, Rating
3. Frontend sends GET /api/lawyers/search?filters
4. Controller validates query parameters
5. Service queries LAWYERS table with filters:
   - IsVerified = true (only verified lawyers)
   - Specialization matches (if provided)
   - Location within radius (if provided)
   - ExperienceYears >= minExperience (if provided)
   - AverageRating >= minRating (if provided)
6. Service calculates average rating for each lawyer from REVIEWS table
7. Service returns paginated list of LawyerResponseDto
8. Frontend displays search results with:
   - Lawyer name, photo, specializations
   - Experience, location, average rating
   - Price for selected specialization
9. Client can click on lawyer to view details

**Alternative Flows:**

**AF-1: No Results Found**
- At step 5, if no lawyers match filters
- Service returns empty list
- Frontend displays "No lawyers found. Try different filters."

**AF-2: Invalid Filters**
- At step 4, if query parameters invalid
- Controller returns 400 Bad Request
- Frontend displays "Invalid search parameters"

**AF-3: Invalid Location Radius**
- At step 5, if radius calculation fails
- Service uses default radius or skips location filter
- Results still returned with other filters applied

**Post-Condition:**
- Client sees list of verified lawyers matching filters
- Client can view lawyer details
- Client can proceed to booking

**Sequence Diagram:**

```
sequenceDiagram
    participant Client
    participant Frontend
    participant Controller
    participant Service
    participant Database

    Client->>Frontend: Enter search filters
    Frontend->>Frontend: Validate input locally
    Frontend->>Controller: GET /api/lawyers/search?filters
    Controller->>Controller: Validate query parameters
    Controller->>Service: SearchLawyersAsync(filters)
    
    Service->>Database: SELECT * FROM LAWYERS WHERE IsVerified = true
    Database-->>Service: Lawyers list
    
    Service->>Service: Filter by specialization
    Service->>Service: Filter by location (Haversine formula)
    Service->>Service: Filter by experience
    
    Service->>Database: SELECT AVG(Rating) FROM REVIEWS GROUP BY LawyerId
    Database-->>Service: Average ratings
    
    Service->>Service: Filter by rating
    Service->>Service: Sort results
    Service-->>Controller: List<LawyerResponseDto>
    Controller-->>Frontend: 200 OK + results
    Frontend->>Frontend: Display search results
    Frontend-->>Client: Show lawyers with details
```

---

## UC-5: Create Booking

**Table:** BOOKINGS, CHAT_ROOMS, NOTIFICATIONS, LAWYER_PRICING  
**Description:** A client creates a booking with a lawyer.

**Actor(s):**
- Primary: Client
- Secondary: System, Lawyer

**Trigger:**
- Client clicks "Book Now" button on lawyer profile

**Pre-condition:**
- Client is authenticated
- Lawyer is verified
- Pricing exists for selected specialization + interaction type
- Booking date is in the future

**Main Flow:**
1. Client navigates to booking page
2. Client selects: Lawyer, Specialization, Interaction Type, Date/Time
3. Frontend validates input locally
4. Frontend sends POST /api/bookings with JWT token
5. Controller extracts userId from JWT token
6. Controller validates DTO
7. Service validates:
   - Lawyer exists and IsVerified = true
   - Pricing exists for specialization + interaction type
   - Booking date is in future
8. Service captures price snapshot from LAWYER_PRICING table
9. Service creates booking record in BOOKINGS table:
   - Status = "Pending"
   - PaymentStatus = "Pending"
   - PriceSnapshot = current price
10. Service creates chat room in CHAT_ROOMS table linked to booking
11. Service creates notifications:
    - For client: "Booking created. Awaiting payment."
    - For lawyer: "New booking from {clientName}"
12. Service returns BookingResponseDto
13. Frontend displays "Booking created successfully"
14. Frontend redirects to payment page

**Alternative Flows:**

**AF-1: Lawyer Not Verified**
- At step 7, if lawyer.IsVerified = false
- Service returns 400 Bad Request
- Frontend displays "Lawyer not yet verified"

**AF-2: Pricing Not Found**
- At step 7, if pricing doesn't exist
- Service returns 400 Bad Request
- Frontend displays "Pricing not available for this specialization"

**AF-3: Booking Date in Past**
- At step 7, if date < now
- Service returns 400 Bad Request
- Frontend displays "Booking date must be in the future"

**AF-4: Unauthorized (Not Client)**
- At step 5, if user role is not "Client"
- Controller returns 403 Forbidden
- Frontend displays "Only clients can create bookings"

**Post-Condition:**
- Booking record created in BOOKINGS table
- Chat room created in CHAT_ROOMS table
- Notifications created for both parties
- Booking status = "Pending"
- Client can proceed to payment
- Lawyer receives notification

**Sequence Diagram:**

```
sequenceDiagram
    participant Client
    participant Frontend
    participant Controller
    participant Service
    participant Database

    Client->>Frontend: Click Book Now
    Frontend->>Frontend: Validate input locally
    Frontend->>Controller: POST /api/bookings + JWT
    Controller->>Controller: Extract userId from JWT
    Controller->>Controller: Validate DTO
    Controller->>Service: CreateBookingAsync(dto, userId)
    
    Service->>Database: SELECT * FROM LAWYERS WHERE Id = ? AND IsVerified = true
    Database-->>Service: Lawyer or null
    
    alt Lawyer not found or not verified
        Service-->>Controller: Throw BadRequestException
        Controller-->>Frontend: 400 Bad Request
        Frontend-->>Client: "Lawyer not verified"
    else Lawyer verified
        Service->>Database: SELECT * FROM LAWYER_PRICING WHERE LawyerId = ? AND SpecializationId = ? AND InteractionTypeId = ?
        Database-->>Service: Pricing or null
        
        alt Pricing not found
            Service-->>Controller: Throw BadRequestException
            Controller-->>Frontend: 400 Bad Request
            Frontend-->>Client: "Pricing not available"
        else Pricing found
            Service->>Service: Validate booking date in future
            Service->>Database: INSERT INTO BOOKINGS
            Database-->>Service: Booking created
            Service->>Database: INSERT INTO CHAT_ROOMS
            Database-->>Service: Chat room created
            Service->>Database: INSERT INTO NOTIFICATIONS (2 records)
            Database-->>Service: Notifications created
            Service-->>Controller: BookingResponseDto
            Controller-->>Frontend: 201 Created
            Frontend-->>Client: "Booking created successfully"
            Frontend->>Frontend: Redirect to /payments
        end
    end
```

---

## UC-6: Process Payment

**Table:** BOOKINGS, PAYMENT_SESSIONS, NOTIFICATIONS  
**Description:** A client pays for a booking using Stripe/PayPal.

**Actor(s):**
- Primary: Client
- Secondary: System, Payment Provider (Stripe)

**Trigger:**
- Client clicks "Pay Now" button on payment page

**Pre-condition:**
- Booking exists with Status = "Pending"
- PaymentStatus = "Pending"
- Client is authenticated

**Main Flow:**
1. Client navigates to payment page
2. Client reviews booking details and price
3. Client clicks "Pay Now"
4. Frontend sends POST /api/payments/create-session with JWT token
5. Controller extracts userId from JWT token
6. Controller validates DTO
7. Service validates:
   - Booking exists
   - Booking belongs to this user
   - PaymentStatus = "Pending"
8. Service creates payment session in PAYMENT_SESSIONS table:
   - Status = "Pending"
   - Amount = booking.PriceSnapshot
   - Provider = "Stripe"
9. Service returns PaymentSessionResponseDto with Stripe session ID
10. Frontend redirects to Stripe checkout page
11. Client enters payment details on Stripe
12. Stripe processes payment
13. Stripe sends webhook to backend
14. Service receives webhook and updates PAYMENT_SESSIONS:
    - Status = "Success"
15. Service updates BOOKINGS:
    - PaymentStatus = "Paid"
    - Status = "Confirmed"
16. Service creates notification: "Payment successful. Booking confirmed."
17. Frontend displays "Payment successful"
18. Frontend redirects to booking details

**Alternative Flows:**

**AF-1: Booking Not Found**
- At step 7, if booking doesn't exist
- Service returns 404 Not Found
- Frontend displays "Booking not found"

**AF-2: Payment Already Processed**
- At step 7, if PaymentStatus != "Pending"
- Service returns 409 Conflict
- Frontend displays "Payment already processed"

**AF-3: Payment Failed**
- At step 12, if Stripe payment fails
- Stripe returns error
- Service receives webhook with Status = "Failed"
- Service updates PAYMENT_SESSIONS Status = "Failed"
- Service keeps BOOKINGS PaymentStatus = "Pending"
- Frontend displays "Payment failed. Please try again."

**AF-4: Webhook Timeout**
- At step 13, if webhook doesn't arrive
- Client can manually confirm payment
- Service queries Stripe API to check payment status

**Post-Condition:**
- Payment session created in PAYMENT_SESSIONS table
- Booking status updated to "Confirmed"
- Payment status updated to "Paid"
- Notifications created for both parties
- Client can now chat with lawyer
- Lawyer receives notification of confirmed booking

**Sequence Diagram:**

```
sequenceDiagram
    participant Client
    participant Frontend
    participant Controller
    participant Service
    participant Database
    participant Stripe

    Client->>Frontend: Click Pay Now
    Frontend->>Controller: POST /api/payments/create-session + JWT
    Controller->>Controller: Extract userId from JWT
    Controller->>Service: CreateSessionAsync(bookingId, amount)
    
    Service->>Database: SELECT * FROM BOOKINGS WHERE Id = ? AND UserId = ?
    Database-->>Service: Booking or null
    
    alt Booking not found
        Service-->>Controller: Throw NotFoundException
        Controller-->>Frontend: 404 Not Found
        Frontend-->>Client: "Booking not found"
    else Booking found
        Service->>Database: INSERT INTO PAYMENT_SESSIONS
        Database-->>Service: Session created
        Service-->>Controller: PaymentSessionResponseDto
        Controller-->>Frontend: 200 OK + Stripe session ID
        Frontend->>Stripe: Redirect to checkout
        Client->>Stripe: Enter payment details
        Stripe->>Stripe: Process payment
        
        alt Payment successful
            Stripe->>Service: Webhook: payment.success
            Service->>Database: UPDATE PAYMENT_SESSIONS Status = Success
            Service->>Database: UPDATE BOOKINGS Status = Confirmed, PaymentStatus = Paid
            Service->>Database: INSERT INTO NOTIFICATIONS
            Service-->>Stripe: 200 OK
            Stripe-->>Frontend: Redirect to success page
            Frontend-->>Client: "Payment successful"
        else Payment failed
            Stripe->>Service: Webhook: payment.failed
            Service->>Database: UPDATE PAYMENT_SESSIONS Status = Failed
            Service-->>Stripe: 200 OK
            Stripe-->>Frontend: Redirect to failure page
            Frontend-->>Client: "Payment failed. Try again."
        end
    end
```

---

## UC-7: Leave Review

**Table:** REVIEWS, BOOKINGS, NOTIFICATIONS  
**Description:** A client leaves a review and rating for a completed booking.

**Actor(s):**
- Primary: Client
- Secondary: System, Lawyer

**Trigger:**
- Client clicks "Leave Review" button after booking completed

**Pre-condition:**
- Booking exists with Status = "Completed"
- Client is authenticated
- No review already exists for this booking

**Main Flow:**
1. Client navigates to booking details page
2. Client sees "Leave Review" button (only if Status = "Completed")
3. Client clicks "Leave Review"
4. Frontend opens review form
5. Client enters: Rating (1-5), Comment (optional)
6. Frontend validates input locally
7. Frontend sends POST /api/reviews with JWT token
8. Controller extracts userId from JWT token
9. Controller validates DTO
10. Service validates:
    - Booking exists
    - Booking belongs to this user
    - Booking status = "Completed"
    - No review already exists for this booking
11. Service creates review record in REVIEWS table
12. Service calculates new average rating for lawyer
13. Service updates LAWYERS table with new average rating
14. Service creates notification for lawyer: "New review from {clientName}: {rating} stars"
15. Service returns ReviewResponseDto
16. Frontend displays "Review submitted successfully"
17. Frontend displays updated lawyer rating

**Alternative Flows:**

**AF-1: Booking Not Completed**
- At step 10, if booking.Status != "Completed"
- Service returns 400 Bad Request
- Frontend displays "Can only review completed bookings"

**AF-2: Review Already Exists**
- At step 10, if review already exists for this booking
- Service returns 409 Conflict
- Frontend displays "You already reviewed this booking"

**AF-3: Invalid Rating**
- At step 9, if rating < 1 or rating > 5
- Controller returns 400 Bad Request
- Frontend displays "Rating must be between 1 and 5"

**Post-Condition:**
- Review record created in REVIEWS table
- Lawyer's average rating updated
- Notification created for lawyer
- Client can see their review on lawyer profile
- Lawyer can see review on their profile

**Sequence Diagram:**

```
sequenceDiagram
    participant Client
    participant Frontend
    participant Controller
    participant Service
    participant Database

    Client->>Frontend: Click Leave Review
    Frontend->>Frontend: Open review form
    Client->>Frontend: Enter rating and comment
    Frontend->>Frontend: Validate input locally
    Frontend->>Controller: POST /api/reviews + JWT
    Controller->>Controller: Extract userId from JWT
    Controller->>Controller: Validate DTO
    Controller->>Service: CreateReviewAsync(dto, userId)
    
    Service->>Database: SELECT * FROM BOOKINGS WHERE Id = ? AND UserId = ?
    Database-->>Service: Booking or null
    
    alt Booking not found
        Service-->>Controller: Throw NotFoundException
        Controller-->>Frontend: 404 Not Found
        Frontend-->>Client: "Booking not found"
    else Booking found
        Service->>Service: Check if booking.Status = Completed
        alt Booking not completed
            Service-->>Controller: Throw BadRequestException
            Controller-->>Frontend: 400 Bad Request
            Frontend-->>Client: "Can only review completed bookings"
        else Booking completed
            Service->>Database: SELECT * FROM REVIEWS WHERE BookingId = ?
            Database-->>Service: Review or null
            alt Review already exists
                Service-->>Controller: Throw ConflictException
                Controller-->>Frontend: 409 Conflict
                Frontend-->>Client: "Already reviewed this booking"
            else No review exists
                Service->>Database: INSERT INTO REVIEWS
                Database-->>Service: Review created
                Service->>Database: SELECT AVG(Rating) FROM REVIEWS WHERE LawyerId = ?
                Database-->>Service: Average rating
                Service->>Database: UPDATE LAWYERS SET AverageRating = ?
                Service->>Database: INSERT INTO NOTIFICATIONS
                Service-->>Controller: ReviewResponseDto
                Controller-->>Frontend: 201 Created
                Frontend-->>Client: "Review submitted successfully"
            end
        end
    end
```

---

## UC-8: Admin Verify Lawyer

**Table:** LAWYERS, NOTIFICATIONS  
**Description:** An admin verifies a lawyer profile.

**Actor(s):**
- Primary: Admin
- Secondary: System, Lawyer

**Trigger:**
- Admin clicks "Verify" button on pending lawyer profile

**Pre-condition:**
- Admin is authenticated with role = "Admin"
- Lawyer profile exists with IsVerified = false

**Main Flow:**
1. Admin navigates to admin dashboard
2. Admin views "Pending Lawyers" section
3. Admin clicks on lawyer profile to review
4. Admin reviews: Experience, Specializations, Location, etc.
5. Admin clicks "Verify" button
6. Frontend sends PUT /api/admin/lawyers/{id}/verify with JWT token
7. Controller extracts userId from JWT token
8. Controller validates user is Admin
9. Controller validates DTO
10. Service validates:
    - Lawyer exists
    - IsVerified = false
11. Service updates LAWYERS table:
    - IsVerified = true
12. Service creates notification for lawyer: "Your profile has been verified!"
13. Service returns success response
14. Frontend displays "Lawyer verified successfully"
15. Lawyer now appears in search results
16. Lawyer receives notification

**Alternative Flows:**

**AF-1: Lawyer Not Found**
- At step 10, if lawyer doesn't exist
- Service returns 404 Not Found
- Frontend displays "Lawyer not found"

**AF-2: Lawyer Already Verified**
- At step 10, if IsVerified = true
- Service returns 409 Conflict
- Frontend displays "Lawyer already verified"

**AF-3: Unauthorized (Not Admin)**
- At step 8, if user role is not "Admin"
- Controller returns 403 Forbidden
- Frontend displays "Only admins can verify lawyers"

**Post-Condition:**
- Lawyer IsVerified = true
- Lawyer appears in search results
- Lawyer can receive bookings
- Notification sent to lawyer
- Admin can see verified status updated

**Sequence Diagram:**

```
sequenceDiagram
    participant Admin
    participant Frontend
    participant Controller
    participant Service
    participant Database

    Admin->>Frontend: Navigate to pending lawyers
    Frontend->>Controller: GET /api/admin/lawyers/pending
    Controller->>Service: GetPendingLawyersAsync()
    Service->>Database: SELECT * FROM LAWYERS WHERE IsVerified = false
    Database-->>Service: Pending lawyers list
    Service-->>Controller: List<LawyerResponseDto>
    Controller-->>Frontend: 200 OK + list
    Frontend-->>Admin: Display pending lawyers
    
    Admin->>Frontend: Click Verify on lawyer
    Frontend->>Controller: PUT /api/admin/lawyers/{id}/verify + JWT
    Controller->>Controller: Extract userId from JWT
    Controller->>Controller: Validate user is Admin
    Controller->>Service: VerifyLawyerAsync(lawyerId)
    
    Service->>Database: SELECT * FROM LAWYERS WHERE Id = ?
    Database-->>Service: Lawyer or null
    
    alt Lawyer not found
        Service-->>Controller: Throw NotFoundException
        Controller-->>Frontend: 404 Not Found
        Frontend-->>Admin: "Lawyer not found"
    else Lawyer found
        Service->>Service: Check if IsVerified = false
        alt Already verified
            Service-->>Controller: Throw ConflictException
            Controller-->>Frontend: 409 Conflict
            Frontend-->>Admin: "Already verified"
        else Not verified
            Service->>Database: UPDATE LAWYERS SET IsVerified = true
            Service->>Database: INSERT INTO NOTIFICATIONS
            Service-->>Controller: Success response
            Controller-->>Frontend: 200 OK
            Frontend-->>Admin: "Lawyer verified successfully"
        end
    end
```

---

## Summary Table

| Use Case | Tables | Key Actors | Main Action |
|----------|--------|-----------|------------|
| UC-1: User Registration | USERS | New User, System | Create user account |
| UC-2: User Login | USERS, REFRESH_TOKENS | Registered User, System | Authenticate and issue tokens |
| UC-3: Lawyer Registration | USERS, LAWYERS, LAWYER_SPECIALIZATIONS | Lawyer, System | Create lawyer profile |
| UC-4: Search Lawyers | LAWYERS, LAWYER_SPECIALIZATIONS, REVIEWS | Client, System | Find lawyers by filters |
| UC-5: Create Booking | BOOKINGS, CHAT_ROOMS, NOTIFICATIONS, LAWYER_PRICING | Client, System, Lawyer | Schedule consultation |
| UC-6: Process Payment | BOOKINGS, PAYMENT_SESSIONS, NOTIFICATIONS | Client, System, Stripe | Pay for booking |
| UC-7: Leave Review | REVIEWS, BOOKINGS, NOTIFICATIONS | Client, System, Lawyer | Rate and comment on service |
| UC-8: Admin Verify Lawyer | LAWYERS, NOTIFICATIONS | Admin, System, Lawyer | Approve lawyer profile |

---

## Key Points

1. **Simplified Flow** - Only shows User → Frontend → Controller → Service → Database
2. **Based on Actual Code** - Reflects your implementation
3. **Clear Alternatives** - Shows error cases and edge cases
4. **Sequence Diagrams** - Mermaid format for easy visualization
5. **Pre/Post Conditions** - Clear state before and after
6. **No Layer Confusion** - Focuses on business logic, not architecture layers

