# ESTASHEER - Use Cases Core Flows with Architecture Layers

## Backend Architecture Layers

Every table has 3 layers:

```
Frontend (React)
    ↓
Controller (HTTP Endpoint)
    ↓
Service (Business Logic)
    ↓
Repository (Data Access)
    ↓
Database (SQL Server)
```

---

## 🔴 CRITICAL USE CASES - PHASE 1

---

## UC-1: User Registration

**Tables:** USERS

**Description:** 
New user creates account with email and password. NO tokens issued at registration.

**Actor(s):**
- Primary: New User
- Secondary: System

**Trigger:**
- User clicks "Sign Up"

**Pre-condition:**
- Email not already registered
- Password meets requirements

**Main Flow:**
1. User enters: Email, Password, Full Name, Phone, City, Role
2. Frontend validates input locally
3. Frontend sends POST /api/auth/register
4. AuthController receives request
5. AuthController calls UserService.RegisterUserAsync()
6. UserService calls UserRepository.GetByEmailAsync() to check if exists
7. UserRepository queries DB: SELECT * FROM USERS WHERE Email = {email}
8. If exists: Return error "Email already registered"
9. If not exists:
   - UserService hashes password with SHA256
   - UserService creates User object
   - UserService calls UserRepository.CreateAsync()
   - UserRepository inserts into USERS table
   - UserRepository returns created User
10. UserService returns UserResponseDto (NO TOKEN)
11. AuthController returns 201 Created with user info
12. Frontend displays: "Registration successful. Please login."
13. Frontend redirects to login page

**Alternative Flows:**
- AF-1: Email exists → Error message
- AF-2: Weak password → Error message
- AF-3: Invalid phone → Error message

**Post-Condition:**
- User created in database
- User redirected to login page
- NO tokens issued

**Sequence Diagram:**
```
sequenceDiagram
    participant User
    participant Frontend
    participant AuthController
    participant UserService
    participant UserRepository
    participant Database

    User->>Frontend: Click Sign Up
    Frontend->>Frontend: Validate input locally
    Frontend->>AuthController: POST /api/auth/register
    AuthController->>AuthController: Validate DTO
    AuthController->>UserService: RegisterUserAsync(dto, role)
    
    UserService->>UserRepository: GetByEmailAsync(email)
    UserRepository->>Database: SELECT * FROM USERS WHERE Email = ?
    Database-->>UserRepository: User or null
    UserRepository-->>UserService: User or null
    
    alt Email exists
        UserService-->>AuthController: Throw ConflictException
        AuthController-->>Frontend: 409 Conflict
        Frontend-->>User: "Email already registered"
    else Email not exists
        UserService->>UserService: Hash password (SHA256)
        UserService->>UserRepository: CreateAsync(user)
        UserRepository->>Database: INSERT INTO USERS (Email, PasswordHash, FullName, Phone, City, Role, CreatedAt)
        Database-->>UserRepository: User created
        UserRepository-->>UserService: UserResponseDto
        UserService-->>AuthController: UserResponseDto
        AuthController-->>Frontend: 201 Created
        Frontend-->>User: "Registration successful. Please login."
        Frontend->>Frontend: Redirect to /login
    end
```

---

## UC-2: User Login

**Tables:** USERS, REFRESH_TOKENS

**Description:**
User logs in with email/password. System issues JWT access token + refresh token.

**Actor(s):**
- Primary: Registered User
- Secondary: System

**Trigger:**
- User clicks "Login"

**Pre-condition:**
- User account exists
- Password is correct
- Account not suspended

**Main Flow:**
1. User enters: Email, Password
2. Frontend validates input
3. Frontend sends POST /api/auth/login
4. AuthController receives request
5. AuthController calls UserService.LoginAsync()
6. UserService calls UserRepository.GetByEmailAsync(email)
7. UserRepository queries DB: SELECT * FROM USERS WHERE Email = {email}
8. If not found: Return error "Invalid credentials"
9. If found:
   - UserService hashes input password
   - UserService compares with stored hash
   - If no match: Return error "Invalid credentials"
   - If match:
     - AuthController generates JWT token (30 min expiry)
     - AuthController generates refresh token (7 days)
     - AuthController calls RefreshTokenService.CreateAsync()
     - RefreshTokenService calls RefreshTokenRepository.AddAsync()
     - RefreshTokenRepository inserts into REFRESH_TOKENS table
     - AuthController sets HttpOnly cookie with refresh token
     - AuthController returns 200 OK with access token + user info
10. Frontend stores access token in memory
11. Frontend stores user info in localStorage
12. Frontend redirects to dashboard

**Alternative Flows:**
- AF-1: User not found → "Invalid credentials"
- AF-2: Password wrong → "Invalid credentials"
- AF-3: Account suspended → "Account suspended"

**Post-Condition:**
- User authenticated
- Access token in memory
- Refresh token in HttpOnly cookie
- User can access protected routes

**Sequence Diagram:**
```
sequenceDiagram
    participant User
    participant Frontend
    participant AuthController
    participant UserService
    participant UserRepository
    participant RefreshTokenService
    participant RefreshTokenRepository
    participant Database

    User->>Frontend: Click Login
    Frontend->>AuthController: POST /api/auth/login
    AuthController->>UserService: LoginAsync(email, password)
    
    UserService->>UserRepository: GetByEmailAsync(email)
    UserRepository->>Database: SELECT * FROM USERS WHERE Email = ?
    Database-->>UserRepository: User or null
    UserRepository-->>UserService: User or null
    
    alt User not found
        UserService-->>AuthController: Throw UnauthorizedException
        AuthController-->>Frontend: 401 Unauthorized
        Frontend-->>User: "Invalid credentials"
    else User found
        UserService->>UserService: Hash input password
        UserService->>UserService: Compare hashes
        
        alt Password mismatch
            UserService-->>AuthController: Throw UnauthorizedException
            AuthController-->>Frontend: 401 Unauthorized
            Frontend-->>User: "Invalid credentials"
        else Password match
            AuthController->>AuthController: Generate JWT (30 min)
            AuthController->>AuthController: Generate RefreshToken
            AuthController->>RefreshTokenService: CreateAsync(userId, token, ipAddress, userAgent)
            RefreshTokenService->>RefreshTokenRepository: AddAsync(refreshToken)
            RefreshTokenRepository->>Database: INSERT INTO REFRESH_TOKENS (UserId, TokenHash, ExpiresAt, CreatedAt, IpAddress, UserAgent)
            Database-->>RefreshTokenRepository: RefreshToken created
            RefreshTokenRepository-->>RefreshTokenService: RefreshToken
            RefreshTokenService-->>AuthController: RefreshToken
            AuthController->>AuthController: Set HttpOnly Cookie (refreshToken)
            AuthController-->>Frontend: 200 OK (accessToken, user)
            Frontend->>Frontend: Store accessToken in memory
            Frontend->>Frontend: Store user in localStorage
            Frontend->>Frontend: Redirect to /dashboard
            Frontend-->>User: Dashboard loaded
        end
    end
```

---

## UC-3: Lawyer Registration & Verification

**Tables:** LAWYERS, LAWYER_SPECIALIZATIONS, SPECIALIZATIONS, USERS

**Description:**
Lawyer creates profile with specializations. Admin verifies before appearing in search.

**Actor(s):**
- Primary: Lawyer User
- Secondary: Admin, System

**Trigger:**
- Lawyer clicks "Register as Lawyer"

**Pre-condition:**
- User logged in with Role = "Lawyer"
- No existing lawyer profile
- Specializations exist in DB

**Main Flow:**

**Part A: Lawyer Profile Creation**
1. Lawyer navigates to lawyer registration
2. Lawyer enters: Experience, Address, Lat/Long, Bio, Select Specializations
3. Frontend validates input
4. Frontend sends POST /api/lawyers/register
5. LawyersController receives request
6. LawyersController calls LawyerService.RegisterAsync()
7. LawyerService calls LawyerRepository.GetByUserIdAsync(userId)
8. LawyerRepository queries: SELECT * FROM LAWYERS WHERE UserId = ?
9. If exists: Return error "Already have lawyer profile"
10. If not exists:
    - LawyerService creates Lawyer object
    - LawyerService calls LawyerRepository.CreateAsync()
    - LawyerRepository inserts into LAWYERS table (Verified = false)
    - LawyerRepository returns created Lawyer
    - LawyerService calls LawyerSpecializationService.AddSpecializationsAsync()
    - LawyerSpecializationService calls LawyerSpecializationRepository.AddAsync() for each specialization
    - LawyerSpecializationRepository inserts into LAWYER_SPECIALIZATIONS table
    - LawyerService calls NotificationService.SendAsync() to notify Admin
    - LawyerService returns LawyerResponseDto
11. LawyersController returns 201 Created
12. Frontend displays: "Profile created. Awaiting admin verification."

**Part B: Admin Verification**
1. Admin navigates to pending lawyers
2. Admin views lawyer profile
3. Admin clicks "Verify" or "Reject"
4. Admin sends PUT /api/lawyers/{id}/verify
5. LawyersController receives request
6. LawyersController calls LawyerService.VerifyAsync(lawyerId)
7. LawyerService calls LawyerRepository.GetByIdAsync(lawyerId)
8. LawyerRepository queries: SELECT * FROM LAWYERS WHERE Id = ?
9. LawyerService updates Lawyer.Verified = true
10. LawyerService calls LawyerRepository.UpdateAsync()
11. LawyerRepository updates LAWYERS table
12. LawyerService calls NotificationService.SendAsync() to notify lawyer
13. LawyerService returns success
14. LawyersController returns 200 OK
15. Lawyer now appears in search results

**Post-Condition:**
- LAWYERS record created (Verified = false)
- LAWYER_SPECIALIZATIONS records created
- Admin notified
- After verification: Lawyer visible in search

**Sequence Diagram:**
```
sequenceDiagram
    participant Lawyer
    participant Frontend
    participant LawyersController
    participant LawyerService
    participant LawyerRepository
    participant LawyerSpecializationService
    participant LawyerSpecializationRepository
    participant NotificationService
    participant Database

    Lawyer->>Frontend: Click Register as Lawyer
    Frontend->>LawyersController: POST /api/lawyers/register
    LawyersController->>LawyerService: RegisterAsync(dto, userId)
    
    LawyerService->>LawyerRepository: GetByUserIdAsync(userId)
    LawyerRepository->>Database: SELECT * FROM LAWYERS WHERE UserId = ?
    Database-->>LawyerRepository: Lawyer or null
    LawyerRepository-->>LawyerService: Lawyer or null
    
    alt Lawyer profile exists
        LawyerService-->>LawyersController: Throw ConflictException
        LawyersController-->>Frontend: 409 Conflict
        Frontend-->>Lawyer: "Already have lawyer profile"
    else No profile exists
        LawyerService->>LawyerRepository: CreateAsync(lawyer)
        LawyerRepository->>Database: INSERT INTO LAWYERS (UserId, ExperienceYears, Address, Latitude, Longitude, Verified, CreatedAt)
        Database-->>LawyerRepository: Lawyer created
        LawyerRepository-->>LawyerService: Lawyer
        
        LawyerService->>LawyerSpecializationService: AddSpecializationsAsync(lawyerId, specializations)
        loop For each specialization
            LawyerSpecializationService->>LawyerSpecializationRepository: AddAsync(lawyerId, specializationId)
            LawyerSpecializationRepository->>Database: INSERT INTO LAWYER_SPECIALIZATIONS (LawyerId, SpecializationId)
            Database-->>LawyerSpecializationRepository: Created
        end
        
        LawyerService->>NotificationService: SendAsync(adminId, "New lawyer registration")
        LawyerService-->>LawyersController: LawyerResponseDto
        LawyersController-->>Frontend: 201 Created
        Frontend-->>Lawyer: "Awaiting admin verification"
    end
```

---

## UC-4: Search & Filter Lawyers

**Tables:** LAWYERS, LAWYER_SPECIALIZATIONS, SPECIALIZATIONS, REVIEWS, USERS

**Description:**
Client searches for verified lawyers by specialization, location, experience, rating.

**Actor(s):**
- Primary: Client (or anonymous user)
- Secondary: System

**Trigger:**
- User clicks "Find a Lawyer"

**Pre-condition:**
- At least one verified lawyer exists
- Specializations exist

**Main Flow:**
1. User navigates to lawyer search page
2. User enters filters: Specialization, Location, Experience, Price, Rating
3. Frontend sends GET /api/lawyers?specialization={id}&location={lat,long}&radius={km}&minExp={years}&maxPrice={price}&minRating={rating}
4. LawyersController receives request
5. LawyersController calls LawyerService.SearchAsync(filters)
6. LawyerService calls LawyerRepository.SearchAsync(filters)
7. LawyerRepository builds SQL query:
   ```sql
   SELECT l.*, u.FullName, u.ProfilePhoto, AVG(r.Rating) as AvgRating
   FROM LAWYERS l
   JOIN USERS u ON l.UserId = u.Id
   LEFT JOIN REVIEWS r ON l.Id = r.LawyerId
   LEFT JOIN LAWYER_SPECIALIZATIONS ls ON l.Id = ls.LawyerId
   WHERE l.Verified = 1
   AND (ls.SpecializationId = ? OR ? IS NULL)
   AND SQRT(POW(l.Latitude - ?, 2) + POW(l.Longitude - ?, 2)) * 111 <= ?
   AND l.ExperienceYears >= ?
   AND AVG(r.Rating) >= ?
   GROUP BY l.Id
   ORDER BY AvgRating DESC
   LIMIT 10 OFFSET ?
   ```
8. LawyerRepository queries database
9. Database returns matching lawyers
10. LawyerRepository returns list of LawyerResponseDto
11. LawyerService calls LawyerPricingService.GetPricingAsync() for each lawyer
12. LawyerPricingService calls LawyerPricingRepository.GetByLawyerAsync()
13. LawyerPricingRepository queries: SELECT * FROM LAWYER_PRICING WHERE LawyerId = ?
14. Database returns pricing
15. LawyerService enriches response with pricing
16. LawyersController returns 200 OK with lawyer list
17. Frontend displays lawyer cards with: name, photo, specializations, rating, price
18. User clicks lawyer to view details
19. Frontend sends GET /api/lawyers/{id}
20. LawyersController calls LawyerService.GetByIdAsync(id)
21. LawyerService calls LawyerRepository.GetByIdAsync(id)
22. LawyerRepository queries: SELECT * FROM LAWYERS WHERE Id = ? AND Verified = 1
23. Database returns lawyer
24. LawyerService enriches with specializations, pricing, reviews
25. LawyersController returns 200 OK with detailed profile
26. Frontend displays full profile with reviews and pricing

**Post-Condition:**
- User views list of verified lawyers
- User can view detailed profile
- User can proceed to booking

**Sequence Diagram:**
```
sequenceDiagram
    participant User
    participant Frontend
    participant LawyersController
    participant LawyerService
    participant LawyerRepository
    participant LawyerPricingService
    participant LawyerPricingRepository
    participant ReviewRepository
    participant Database

    User->>Frontend: Click Find Lawyer
    Frontend->>LawyersController: GET /api/lawyers?filters
    LawyersController->>LawyerService: SearchAsync(filters)
    
    LawyerService->>LawyerRepository: SearchAsync(filters)
    LawyerRepository->>Database: SELECT * FROM LAWYERS WHERE Verified=1 AND filters
    Database-->>LawyerRepository: Lawyers list
    LawyerRepository-->>LawyerService: List<Lawyer>
    
    loop For each lawyer
        LawyerService->>LawyerPricingService: GetPricingAsync(lawyerId)
        LawyerPricingService->>LawyerPricingRepository: GetByLawyerAsync(lawyerId)
        LawyerPricingRepository->>Database: SELECT * FROM LAWYER_PRICING WHERE LawyerId = ?
        Database-->>LawyerPricingRepository: Pricing list
        LawyerPricingRepository-->>LawyerPricingService: List<LawyerPricing>
        LawyerPricingService-->>LawyerService: Pricing
    end
    
    LawyerService-->>LawyersController: List<LawyerResponseDto>
    LawyersController-->>Frontend: 200 OK
    Frontend-->>User: Display lawyer list
    
    User->>Frontend: Click lawyer detail
    Frontend->>LawyersController: GET /api/lawyers/{id}
    LawyersController->>LawyerService: GetByIdAsync(id)
    LawyerService->>LawyerRepository: GetByIdAsync(id)
    LawyerRepository->>Database: SELECT * FROM LAWYERS WHERE Id = ? AND Verified = 1
    Database-->>LawyerRepository: Lawyer
    LawyerRepository-->>LawyerService: Lawyer
    
    LawyerService->>ReviewRepository: GetByLawyerAsync(lawyerId)
    ReviewRepository->>Database: SELECT * FROM REVIEWS WHERE LawyerId = ?
    Database-->>ReviewRepository: Reviews
    ReviewRepository-->>LawyerService: Reviews
    
    LawyerService-->>LawyersController: LawyerDetailResponseDto
    LawyersController-->>Frontend: 200 OK
    Frontend-->>User: Display detailed profile
```

---



## UC-5: Create Booking

**Tables:** BOOKINGS, LAWYER_PRICING, CHAT_ROOMS, USERS, LAWYERS

**Description:**
Client creates booking with lawyer. System captures pricing snapshot and creates chat room.

**Actor(s):**
- Primary: Client User
- Secondary: Lawyer, System

**Trigger:**
- Client clicks "Book Now" on lawyer profile

**Pre-condition:**
- Client logged in
- Lawyer verified
- Lawyer has pricing for specialization + interaction type
- Booking date in future

**Main Flow:**
1. Client selects: Specialization, Interaction Type, Date, Description
2. Frontend sends POST /api/bookings
3. BookingsController receives request
4. BookingsController calls BookingService.CreateAsync()
5. BookingService calls LawyerPricingRepository.GetPricingAsync(lawyerId, specializationId, interactionTypeId)
6. LawyerPricingRepository queries: SELECT * FROM LAWYER_PRICING WHERE LawyerId = ? AND SpecializationId = ? AND InteractionTypeId = ?
7. Database returns pricing
8. BookingService creates Booking object with PriceSnapshot
9. BookingService calls BookingRepository.CreateAsync()
10. BookingRepository inserts into BOOKINGS table
11. BookingRepository returns created Booking
12. BookingService calls ChatRoomService.CreateAsync()
13. ChatRoomService calls ChatRoomRepository.CreateAsync()
14. ChatRoomRepository inserts into CHAT_ROOMS table
15. ChatRoomRepository returns created ChatRoom
16. BookingService calls NotificationService.SendAsync() to notify lawyer
17. BookingService calls NotificationService.SendAsync() to notify client
18. BookingService returns BookingResponseDto
19. BookingsController returns 201 Created
20. Frontend displays booking confirmation with pricing snapshot

**Post-Condition:**
- BOOKINGS record created (Status = "Pending", PaymentStatus = "Pending")
- CHAT_ROOMS record created
- Lawyer and client notified
- Client can proceed to payment

**Sequence Diagram:**
```
sequenceDiagram
    participant Client
    participant Frontend
    participant BookingsController
    participant BookingService
    participant LawyerPricingRepository
    participant BookingRepository
    participant ChatRoomService
    participant ChatRoomRepository
    participant NotificationService
    participant Database

    Client->>Frontend: Click Book Now
    Frontend->>BookingsController: POST /api/bookings
    BookingsController->>BookingService: CreateAsync(dto, clientId)
    
    BookingService->>LawyerPricingRepository: GetPricingAsync(lawyerId, specId, interactionTypeId)
    LawyerPricingRepository->>Database: SELECT * FROM LAWYER_PRICING WHERE LawyerId=? AND SpecializationId=? AND InteractionTypeId=?
    Database-->>LawyerPricingRepository: LawyerPricing
    LawyerPricingRepository-->>BookingService: LawyerPricing
    
    BookingService->>BookingRepository: CreateAsync(booking)
    BookingRepository->>Database: INSERT INTO BOOKINGS (UserId, LawyerId, SpecializationId, InteractionTypeId, PriceSnapshot, DurationSnapshot, Date, Status, PaymentStatus, CreatedAt)
    Database-->>BookingRepository: Booking created
    BookingRepository-->>BookingService: Booking
    
    BookingService->>ChatRoomService: CreateAsync(bookingId)
    ChatRoomService->>ChatRoomRepository: CreateAsync(chatRoom)
    ChatRoomRepository->>Database: INSERT INTO CHAT_ROOMS (BookingId, CreatedAt)
    Database-->>ChatRoomRepository: ChatRoom created
    ChatRoomRepository-->>ChatRoomService: ChatRoom
    ChatRoomService-->>BookingService: ChatRoom
    
    BookingService->>NotificationService: SendAsync(lawyerId, "New booking request")
    BookingService->>NotificationService: SendAsync(clientId, "Booking created")
    
    BookingService-->>BookingsController: BookingResponseDto
    BookingsController-->>Frontend: 201 Created
    Frontend-->>Client: Display confirmation
```

---

## UC-6: Process Payment

**Tables:** PAYMENT_SESSIONS, BOOKINGS, USERS

**Description:**
Client pays for booking via external payment provider. System updates booking status.

**Actor(s):**
- Primary: Client User
- Secondary: Payment Provider, System

**Trigger:**
- Client clicks "Proceed to Payment"

**Pre-condition:**
- Booking exists (Status = "Pending", PaymentStatus = "Pending")
- Amount > 0

**Main Flow:**
1. Client clicks "Pay Now"
2. Frontend sends POST /api/payments/create-session
3. PaymentsController receives request
4. PaymentsController calls PaymentService.CreateSessionAsync()
5. PaymentService calls BookingRepository.GetByIdAsync(bookingId)
6. BookingRepository queries: SELECT * FROM BOOKINGS WHERE Id = ?
7. Database returns booking
8. PaymentService creates PaymentSession object
9. PaymentService calls PaymentSessionRepository.CreateAsync()
10. PaymentSessionRepository inserts into PAYMENT_SESSIONS table
11. PaymentSessionRepository returns created session
12. PaymentService returns session with Stripe checkout URL
13. PaymentsController returns 201 Created with checkout URL
14. Frontend redirects to Stripe checkout
15. Client enters payment details
16. Stripe processes payment
17. Stripe sends webhook callback to backend: POST /api/payments/webhook
18. PaymentsController receives webhook
19. PaymentsController calls PaymentService.HandleWebhookAsync()
20. PaymentService verifies webhook signature
21. If payment successful:
    - PaymentService calls PaymentSessionRepository.UpdateAsync()
    - PaymentSessionRepository updates PAYMENT_SESSIONS (Status = "Success")
    - PaymentService calls BookingRepository.UpdateAsync()
    - BookingRepository updates BOOKINGS (Status = "Confirmed", PaymentStatus = "Paid")
    - PaymentService calls NotificationService.SendAsync() to notify lawyer and client
22. If payment failed:
    - PaymentService updates PAYMENT_SESSIONS (Status = "Failed")
    - PaymentService calls NotificationService.SendAsync() to notify client
23. PaymentsController returns 200 OK
24. Frontend displays success/failure message

**Post-Condition:**
- PAYMENT_SESSIONS record created
- Payment processed
- BOOKINGS status updated to "Confirmed"
- Lawyer and client notified

**Sequence Diagram:**
```
sequenceDiagram
    participant Client
    participant Frontend
    participant PaymentsController
    participant PaymentService
    participant PaymentSessionRepository
    participant BookingRepository
    participant StripeProvider
    participant NotificationService
    participant Database

    Client->>Frontend: Click Pay Now
    Frontend->>PaymentsController: POST /api/payments/create-session
    PaymentsController->>PaymentService: CreateSessionAsync(bookingId, clientId)
    
    PaymentService->>BookingRepository: GetByIdAsync(bookingId)
    BookingRepository->>Database: SELECT * FROM BOOKINGS WHERE Id = ?
    Database-->>BookingRepository: Booking
    BookingRepository-->>PaymentService: Booking
    
    PaymentService->>PaymentSessionRepository: CreateAsync(paymentSession)
    PaymentSessionRepository->>Database: INSERT INTO PAYMENT_SESSIONS (BookingId, Amount, Status, Provider, CreatedAt)
    Database-->>PaymentSessionRepository: PaymentSession created
    PaymentSessionRepository-->>PaymentService: PaymentSession
    
    PaymentService-->>PaymentsController: PaymentSession with checkoutUrl
    PaymentsController-->>Frontend: 201 Created
    Frontend->>StripeProvider: Redirect to checkout
    
    Client->>StripeProvider: Enter payment details
    StripeProvider->>StripeProvider: Process payment
    
    alt Payment Success
        StripeProvider->>PaymentsController: POST /webhook (success)
        PaymentsController->>PaymentService: HandleWebhookAsync(event)
        PaymentService->>PaymentSessionRepository: UpdateAsync(sessionId, "Success")
        PaymentSessionRepository->>Database: UPDATE PAYMENT_SESSIONS SET Status='Success'
        Database-->>PaymentSessionRepository: Updated
        
        PaymentService->>BookingRepository: UpdateAsync(bookingId, "Confirmed", "Paid")
        BookingRepository->>Database: UPDATE BOOKINGS SET Status='Confirmed', PaymentStatus='Paid'
        Database-->>BookingRepository: Updated
        
        PaymentService->>NotificationService: SendAsync(lawyerId, "Booking confirmed and paid")
        PaymentService->>NotificationService: SendAsync(clientId, "Payment successful")
        
        PaymentService-->>PaymentsController: Success
        PaymentsController-->>Frontend: 200 OK
        Frontend-->>Client: "Payment successful"
    else Payment Failed
        StripeProvider->>PaymentsController: POST /webhook (failed)
        PaymentsController->>PaymentService: HandleWebhookAsync(event)
        PaymentService->>PaymentSessionRepository: UpdateAsync(sessionId, "Failed")
        PaymentSessionRepository->>Database: UPDATE PAYMENT_SESSIONS SET Status='Failed'
        Database-->>PaymentSessionRepository: Updated
        
        PaymentService->>NotificationService: SendAsync(clientId, "Payment failed")
        PaymentService-->>PaymentsController: Failed
        PaymentsController-->>Frontend: 200 OK
        Frontend-->>Client: "Payment failed. Try again."
    end
```

---

## UC-7: Complete Booking & Leave Review

**Tables:** BOOKINGS, REVIEWS, USERS, LAWYERS

**Description:**
After consultation, client leaves review and rating for lawyer.

**Actor(s):**
- Primary: Client User
- Secondary: Lawyer, System

**Trigger:**
- Booking date passed
- Client clicks "Leave Review"

**Pre-condition:**
- Booking exists (Status = "Completed", PaymentStatus = "Paid")
- Booking date in past
- No existing review for this booking

**Main Flow:**
1. System automatically marks booking as "Completed" (after date passes)
2. System sends notification to client: "Leave a review!"
3. Client navigates to booking details
4. Client clicks "Leave Review"
5. Frontend sends POST /api/reviews
6. ReviewsController receives request
7. ReviewsController calls ReviewService.CreateAsync()
8. ReviewService calls ReviewRepository.GetByBookingIdAsync(bookingId)
9. ReviewRepository queries: SELECT * FROM REVIEWS WHERE BookingId = ?
10. If exists: Return error "Already reviewed"
11. If not exists:
    - ReviewService validates: Rating 1-5, Comment <= 500 chars
    - ReviewService creates Review object
    - ReviewService calls ReviewRepository.CreateAsync()
    - ReviewRepository inserts into REVIEWS table
    - ReviewRepository returns created Review
    - ReviewService calls LawyerRepository.GetByIdAsync(lawyerId)
    - LawyerRepository queries: SELECT * FROM LAWYERS WHERE Id = ?
    - ReviewService calculates average rating from all reviews
    - ReviewService calls LawyerRepository.UpdateAsync() to update average rating
    - LawyerRepository updates LAWYERS table
    - ReviewService calls NotificationService.SendAsync() to notify lawyer
12. ReviewsController returns 201 Created
13. Frontend displays confirmation and updated lawyer profile

**Post-Condition:**
- REVIEWS record created
- Lawyer's average rating updated
- Lawyer notified
- Client can view updated profile

**Sequence Diagram:**
```
sequenceDiagram
    participant Client
    participant Frontend
    participant ReviewsController
    participant ReviewService
    participant ReviewRepository
    participant LawyerRepository
    participant NotificationService
    participant Database

    Client->>Frontend: Click Leave Review
    Frontend->>ReviewsController: POST /api/reviews
    ReviewsController->>ReviewService: CreateAsync(dto, clientId)
    
    ReviewService->>ReviewRepository: GetByBookingIdAsync(bookingId)
    ReviewRepository->>Database: SELECT * FROM REVIEWS WHERE BookingId = ?
    Database-->>ReviewRepository: Review or null
    ReviewRepository-->>ReviewService: Review or null
    
    alt Review exists
        ReviewService-->>ReviewsController: Throw ConflictException
        ReviewsController-->>Frontend: 409 Conflict
        Frontend-->>Client: "Already reviewed"
    else No review
        ReviewService->>ReviewService: Validate rating and comment
        ReviewService->>ReviewRepository: CreateAsync(review)
        ReviewRepository->>Database: INSERT INTO REVIEWS (BookingId, UserId, LawyerId, Rating, Comment, CreatedAt)
        Database-->>ReviewRepository: Review created
        ReviewRepository-->>ReviewService: Review
        
        ReviewService->>ReviewRepository: GetAllByLawyerAsync(lawyerId)
        ReviewRepository->>Database: SELECT AVG(Rating) FROM REVIEWS WHERE LawyerId = ?
        Database-->>ReviewRepository: AvgRating
        ReviewRepository-->>ReviewService: AvgRating
        
        ReviewService->>LawyerRepository: UpdateAsync(lawyer)
        LawyerRepository->>Database: UPDATE LAWYERS SET AvgRating = ?
        Database-->>LawyerRepository: Updated
        
        ReviewService->>NotificationService: SendAsync(lawyerId, "New review from {clientName}")
        ReviewService-->>ReviewsController: ReviewResponseDto
        ReviewsController-->>Frontend: 201 Created
        Frontend-->>Client: "Thank you for your review!"
    end
```

---

## UC-8: User Logout

**Tables:** REFRESH_TOKENS, USERS

**Description:**
User logs out. System revokes refresh token and ends session.

**Actor(s):**
- Primary: Logged-in User
- Secondary: System

**Trigger:**
- User clicks "Logout"

**Pre-condition:**
- User logged in with valid access token
- Refresh token exists in database

**Main Flow:**
1. User clicks "Logout"
2. Frontend sends POST /api/auth/logout with access token
3. AuthController receives request
4. AuthController extracts user ID from JWT claims
5. AuthController calls RefreshTokenService.RevokeAsync()
6. RefreshTokenService calls RefreshTokenRepository.RevokeAsync()
7. RefreshTokenRepository queries: SELECT * FROM REFRESH_TOKENS WHERE UserId = ? AND Revoked = 0
8. RefreshTokenRepository updates: SET Revoked = 1, RevokedDate = NOW(), RevokeReason = 'Logout'
9. RefreshTokenRepository updates REFRESH_TOKENS table
10. RefreshTokenService returns success
11. AuthController clears refresh token cookie
12. AuthController logs logout event
13. AuthController returns 200 OK
14. Frontend clears access token from memory
15. Frontend clears user from localStorage
16. Frontend redirects to login page

**Alternative Flows:**
- AF-1: Logout All Devices: Revoke ALL tokens (RevokeReason = 'LogoutAll')

**Post-Condition:**
- Refresh token revoked
- User session ended
- User redirected to login

**Sequence Diagram:**
```
sequenceDiagram
    participant User
    participant Frontend
    participant AuthController
    participant RefreshTokenService
    participant RefreshTokenRepository
    participant Database

    User->>Frontend: Click Logout
    Frontend->>AuthController: POST /api/auth/logout
    AuthController->>AuthController: Extract userId from JWT
    
    AuthController->>RefreshTokenService: RevokeAsync(userId)
    RefreshTokenService->>RefreshTokenRepository: RevokeAsync(userId, "Logout")
    RefreshTokenRepository->>Database: SELECT * FROM REFRESH_TOKENS WHERE UserId = ? AND Revoked = 0
    Database-->>RefreshTokenRepository: RefreshTokens
    RefreshTokenRepository-->>RefreshTokenRepository: Loop: Update each token
    RefreshTokenRepository->>Database: UPDATE REFRESH_TOKENS SET Revoked=1, RevokedDate=NOW(), RevokeReason='Logout'
    Database-->>RefreshTokenRepository: Updated
    RefreshTokenRepository-->>RefreshTokenService: Success
    RefreshTokenService-->>AuthController: Success
    
    AuthController->>AuthController: Clear cookie
    AuthController->>AuthController: Log event
    AuthController-->>Frontend: 200 OK
    
    Frontend->>Frontend: Clear accessToken from memory
    Frontend->>Frontend: Clear user from localStorage
    Frontend->>Frontend: Redirect to /login
    Frontend-->>User: Login page
```

---

## 📊 Backend Architecture Summary

### Controllers (HTTP Layer)
- **AuthController** - Register, Login, Refresh, Logout, Me
- **UsersController** - Update profile, Change password, Delete account, Upload photo
- **LawyersController** - Register, Search, Get details, Verify
- **BookingsController** - Create, Get, List, Update status
- **PaymentsController** - Create session, Confirm, Webhook
- **ReviewsController** - Create, Get, Update
- **ChatRoomsController** - Get, Create
- **ChatMessagesController** - Send, Get history
- **NotificationsController** - Get, Mark as read
- **SpecializationsController** - List, Create (Admin)
- **LawyerPricingController** - Get, Set, Update
- **AdminController** - Manage users, Analytics

### Services (Business Logic Layer)
- **UserService** - Registration, Login validation, Profile management
- **LawyerService** - Lawyer registration, Verification, Search logic
- **BookingService** - Booking creation, Status management
- **PaymentService** - Payment processing, Webhook handling
- **ReviewService** - Review creation, Rating calculation
- **ChatService** - Message handling, Room management
- **NotificationService** - Notification creation and delivery
- **RefreshTokenService** - Token generation, Rotation, Revocation
- **LawyerPricingService** - Pricing retrieval and management
- **SpecializationService** - Specialization management

### Repositories (Data Access Layer)
- **UserRepository** - CRUD for USERS table
- **LawyerRepository** - CRUD for LAWYERS table
- **BookingRepository** - CRUD for BOOKINGS table
- **PaymentSessionRepository** - CRUD for PAYMENT_SESSIONS table
- **ReviewRepository** - CRUD for REVIEWS table
- **ChatRoomRepository** - CRUD for CHAT_ROOMS table
- **ChatMessageRepository** - CRUD for CHAT_MESSAGES table
- **NotificationRepository** - CRUD for NOTIFICATIONS table
- **RefreshTokenRepository** - CRUD for REFRESH_TOKENS table
- **SpecializationRepository** - CRUD for SPECIALIZATIONS table
- **LawyerSpecializationRepository** - CRUD for LAWYER_SPECIALIZATIONS table
- **LawyerPricingRepository** - CRUD for LAWYER_PRICING table
- **InteractionTypeRepository** - CRUD for INTERACTION_TYPES table

---

## 🎯 Key Points

✅ **Registration** - NO tokens issued, user redirected to login
✅ **Login** - Issues JWT access token + refresh token
✅ **3-Layer Architecture** - Controller → Service → Repository → DB
✅ **Sequence Diagrams** - Show all layers and interactions
✅ **All Tables** - Have their own Controller/Service/Repository
✅ **Core Flows** - Focus on main business logic
✅ **Error Handling** - Alternative flows for edge cases

