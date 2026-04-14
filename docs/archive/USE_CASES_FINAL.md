# ESTASHEER - Use Cases Documentation (Final)

---

## UC-1: User Registration

**Table:** USERS

**Description:**
A new user creates an account with email, password, and basic information. No tokens are issued at registration.

**Actor(s):**
- Primary: New User
- Secondary: System

**Trigger:**
- User clicks "Sign Up" button

**Pre-condition:**
- Email is not already registered
- Password meets security requirements (min 8 chars, uppercase, lowercase, number)

**Main Flow:**
1. User navigates to registration page
2. User enters: Email, Password, Full Name, Phone, City, Role (Client/Lawyer)
3. System validates input:
   - Email format is valid
   - Email is not already registered
   - Password meets requirements
   - Phone format is valid
4. System hashes password using SHA256
5. System creates new User record with Role = "Client" or "Lawyer"
6. System stores user in USERS table
7. System displays message: "Registration successful. Please login."
8. User is redirected to login page

**Alternative Flows:**

**AF-1: Email Already Exists**
- At step 3, if email is already registered
- System displays error: "Email already registered"
- User can click "Login" or try different email

**AF-2: Password Doesn't Meet Requirements**
- At step 3, if password is weak
- System displays error: "Password must contain uppercase, lowercase, and number"
- User re-enters password

**AF-3: Invalid Phone Format**
- At step 3, if phone format is invalid
- System displays error: "Invalid phone format"
- User corrects phone number

**Extensions:**
- **EX-1: Admin Registration:** If Role = "Admin", system requires AdminSecret key
- **EX-2: Email Verification:** (Future) Send verification email before account activation

**Post-Condition:**
- New user account created in USERS table
- User redirected to login page
- NO tokens issued

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
    
    Controller->>Service: RegisterUserAsync(email, password, fullName, phone, city, role)
    Service->>Database: Check if email exists
    Database-->>Service: Email exists or not
    
    alt Email exists
        Service-->>Controller: Conflict Exception
        Controller-->>Frontend: 409 Conflict
        Frontend-->>User: "Email already registered"
    else Email not exists
        Service->>Service: Hash password (SHA256)
        Service->>Database: INSERT INTO USERS (Email, PasswordHash, FullName, Phone, City, Role, CreatedAt)
        Database-->>Service: User created
        Service-->>Controller: UserResponseDto
        Controller-->>Frontend: 201 Created
        Frontend-->>User: "Registration successful. Please login."
        Frontend->>Frontend: Redirect to /login
    end
```

---

## UC-2: User Login

**Table:** USERS, REFRESH_TOKENS

**Description:**
An existing user logs into the system using email and password credentials. System issues JWT access token and refresh token.

**Actor(s):**
- Primary: Registered User
- Secondary: System

**Trigger:**
- User clicks "Login" button on login page

**Pre-condition:**
- User account exists in USERS table
- User is not already logged in
- Account is not suspended/banned

**Main Flow:**
1. User navigates to login page
2. User enters: Email, Password
3. System validates input format
4. System queries USERS table by email
5. System compares hashed password with stored hash
6. If match:
   - System generates new JWT access token (30 min expiry)
   - System generates new refresh token (7 days expiry)
   - System stores refresh token in REFRESH_TOKENS table with metadata (IP, UserAgent, CreatedAt)
   - System logs login event: "User {userId} logged in from IP {ipAddress}"
   - System sets HttpOnly cookie with refresh token
   - System returns access token + user info
   - User redirected to dashboard
7. If no match:
   - System logs failed attempt: "Login failed for email {email}"
   - System displays error: "Invalid email or password"

**Alternative Flows:**

**AF-1: User Not Found**
- At step 4, if email doesn't exist
- System displays error: "Invalid email or password" (generic for security)
- User can try again or click "Sign Up"

**AF-2: Account Suspended**
- At step 5, if user.IsSuspended = true
- System displays error: "Account suspended. Contact support."
- User cannot proceed

**AF-3: Too Many Failed Attempts**
- If 5+ failed login attempts in 15 minutes
- System temporarily locks account for 15 minutes
- System displays error: "Too many failed attempts. Try again later."

**Extensions:**
- **EX-1: Remember Me:** (Future) Store refresh token longer if "Remember Me" checked
- **EX-2: Two-Factor Auth:** (Future) Send OTP to email/phone

**Post-Condition:**
- User authenticated with valid access token
- Refresh token stored in REFRESH_TOKENS table
- Login event logged
- User can access protected resources

**Sequence Diagram:**
```
sequenceDiagram
    participant User
    participant Frontend
    participant Controller
    participant Service
    participant Database

    User->>Frontend: Click Login
    Frontend->>Controller: POST /api/auth/login
    
    Controller->>Service: LoginAsync(email, password)
    Service->>Database: SELECT * FROM USERS WHERE Email = ?
    Database-->>Service: User or null
    
    alt User not found
        Service-->>Controller: Unauthorized Exception
        Controller-->>Frontend: 401 Unauthorized
        Frontend-->>User: "Invalid email or password"
    else User found
        Service->>Service: Hash input password
        Service->>Service: Compare hashes
        
        alt Password mismatch
            Service-->>Controller: Unauthorized Exception
            Controller-->>Frontend: 401 Unauthorized
            Frontend-->>User: "Invalid email or password"
        else Password match
            Controller->>Controller: Generate JWT (30 min)
            Controller->>Controller: Generate RefreshToken
            Service->>Database: INSERT INTO REFRESH_TOKENS (UserId, TokenHash, ExpiresAt, CreatedAt, IpAddress, UserAgent, Revoked, RevokeReason, RevokedDate)
            Database-->>Service: RefreshToken created
            Controller->>Controller: Set HttpOnly Cookie (refreshToken)
            Controller-->>Frontend: 200 OK (accessToken, user)
            Frontend->>Frontend: Store accessToken in memory
            Frontend->>Frontend: Store user in localStorage
            Frontend->>Frontend: Redirect to /dashboard
            Frontend-->>User: Dashboard loaded
        end
    end
```

---

## UC-3: Lawyer Registration & Verification

**Table:** LAWYERS, LAWYER_SPECIALIZATIONS, SPECIALIZATIONS

**Description:**
A lawyer creates their profile with specializations, experience, and location. Admin verifies the lawyer before they appear in search results.

**Actor(s):**
- Primary: Lawyer User
- Secondary: Admin, System

**Trigger:**
- Lawyer clicks "Register as Lawyer" after user registration

**Pre-condition:**
- User is logged in with Role = "Lawyer"
- No existing lawyer profile for this user
- Specializations exist in SPECIALIZATIONS table

**Main Flow:**

**Part A: Lawyer Profile Creation**
1. Lawyer navigates to "Register as Lawyer" page
2. Lawyer enters:
   - Years of Experience
   - Address
   - Latitude/Longitude (or auto-geocoded)
   - Bio/Description
   - Select Specializations (multi-select)
3. System validates:
   - Years of Experience is positive number
   - Address is not empty
   - At least one specialization selected
   - Lat/Long are valid coordinates
4. System creates LAWYERS record with Verified = false
5. System creates LAWYER_SPECIALIZATIONS records for each selected specialization
6. System sends notification to Admin: "New lawyer registration: {lawyerName}"
7. System displays message: "Profile created. Awaiting admin verification."

**Part B: Admin Verification**
1. Admin views pending lawyer registrations
2. Admin reviews lawyer profile:
   - Qualifications
   - Experience
   - Specializations
   - Location
3. Admin clicks "Verify" or "Reject"
4. If Verify:
   - System sets Lawyers.Verified = true
   - System sends notification to lawyer: "Your profile has been verified!"
   - Lawyer now appears in search results
5. If Reject:
   - System sends notification to lawyer: "Your profile was rejected. Reason: {reason}"
   - Lawyer can edit and resubmit

**Alternative Flows:**

**AF-1: Lawyer Already Has Profile**
- At step 1, if lawyer already has LAWYERS record
- System displays error: "You already have a lawyer profile"
- Lawyer can edit existing profile

**AF-2: Invalid Coordinates**
- At step 3, if lat/long invalid
- System displays error: "Invalid location coordinates"
- Lawyer can re-enter or use map picker

**Extensions:**
- **EX-1: Document Upload:** (Future) Require license/certification upload
- **EX-2: Background Check:** (Future) Integrate with background check service

**Post-Condition:**
- LAWYERS record created with Verified = false
- LAWYER_SPECIALIZATIONS records created
- Admin notified
- Lawyer awaiting verification

**Sequence Diagram:**
```
sequenceDiagram
    participant Lawyer
    participant Frontend
    participant Controller
    participant Service
    participant Database

    Lawyer->>Frontend: Click Register as Lawyer
    Frontend->>Controller: POST /api/lawyers/register
    
    Controller->>Service: RegisterLawyerAsync(dto, userId)
    Service->>Database: SELECT * FROM LAWYERS WHERE UserId = ?
    Database-->>Service: Lawyer or null
    
    alt Lawyer profile exists
        Service-->>Controller: Conflict Exception
        Controller-->>Frontend: 409 Conflict
        Frontend-->>Lawyer: "Already have lawyer profile"
    else No profile exists
        Service->>Database: INSERT INTO LAWYERS (UserId, ExperienceYears, Address, Latitude, Longitude, Verified, CreatedAt)
        Database-->>Service: Lawyer created
        
        loop For each specialization
            Service->>Database: INSERT INTO LAWYER_SPECIALIZATIONS (LawyerId, SpecializationId)
            Database-->>Service: Created
        end
        
        Service->>Service: Send notification to Admin
        Service-->>Controller: LawyerResponseDto
        Controller-->>Frontend: 201 Created
        Frontend-->>Lawyer: "Awaiting admin verification"
    end
```

---

## UC-4: Search & Filter Lawyers

**Table:** LAWYERS, LAWYER_SPECIALIZATIONS, SPECIALIZATIONS, REVIEWS

**Description:**
A client searches for verified lawyers by specialization, location, experience, and rating.

**Actor(s):**
- Primary: Client (or anonymous user)
- Secondary: System

**Trigger:**
- User clicks "Find a Lawyer"

**Pre-condition:**
- At least one verified lawyer exists
- Specializations exist in database

**Main Flow:**
1. User navigates to lawyer search page
2. User enters search criteria (optional):
   - Specialization (dropdown)
   - Location/Radius (map or text)
   - Min Experience Years (slider)
   - Max Price (slider)
   - Rating (1-5 stars)
3. System queries LAWYERS table with filters:
   - WHERE Verified = true
   - AND Specialization IN (selected)
   - AND Distance(Lat, Long) <= Radius
   - AND ExperienceYears >= MinExp
   - AND AvgRating >= MinRating
4. System calculates average rating from REVIEWS table
5. System returns paginated list (10 per page):
   - Lawyer name, photo, specializations
   - Experience, location, rating
   - Hourly rate (from LAWYER_PRICING)
6. User clicks on lawyer to view detailed profile
7. System displays:
   - Full bio, all specializations
   - Pricing for each specialization/interaction type
   - Recent reviews and ratings
   - Availability calendar
8. User can click "Book Now" or "Message"

**Alternative Flows:**

**AF-1: No Results Found**
- At step 4, if no lawyers match criteria
- System displays: "No lawyers found. Try adjusting filters."
- Suggests popular specializations

**AF-2: User Not Logged In**
- At step 8, if user clicks "Book Now" without login
- System redirects to login page
- After login, redirects back to booking page

**Extensions:**
- **EX-1: Sort Options:** Sort by rating, price, experience, distance
- **EX-2: Saved Favorites:** User can save favorite lawyers
- **EX-3: Recommendations:** System recommends lawyers based on history

**Post-Condition:**
- User views list of verified lawyers matching criteria
- User can view detailed lawyer profile
- User can proceed to booking

**Sequence Diagram:**
```
sequenceDiagram
    participant User
    participant Frontend
    participant Controller
    participant Service
    participant Database

    User->>Frontend: Click Find Lawyer
    Frontend->>Controller: GET /api/lawyers?filters
    
    Controller->>Service: SearchLawyersAsync(filters)
    Service->>Database: SELECT * FROM LAWYERS WHERE Verified=1 AND filters
    Database-->>Service: Lawyers list
    
    loop For each lawyer
        Service->>Database: SELECT AVG(Rating) FROM REVIEWS WHERE LawyerId = ?
        Database-->>Service: AvgRating
    end
    
    Service-->>Controller: List<LawyerResponseDto>
    Controller-->>Frontend: 200 OK
    Frontend-->>User: Display lawyer list
    
    User->>Frontend: Click lawyer detail
    Frontend->>Controller: GET /api/lawyers/{id}
    Controller->>Service: GetLawyerDetailAsync(id)
    Service->>Database: SELECT * FROM LAWYERS WHERE Id = ? AND Verified = 1
    Database-->>Service: Lawyer
    Service->>Database: SELECT * FROM REVIEWS WHERE LawyerId = ?
    Database-->>Service: Reviews
    Service->>Database: SELECT * FROM LAWYER_PRICING WHERE LawyerId = ?
    Database-->>Service: Pricing
    Service-->>Controller: LawyerDetailResponseDto
    Controller-->>Frontend: 200 OK
    Frontend-->>User: Display detailed profile
```

---

## UC-5: Create Booking

**Table:** BOOKINGS, LAWYER_PRICING, CHAT_ROOMS

**Description:**
A client creates a booking request with a lawyer for a specific specialization and interaction type. System captures pricing snapshot.

**Actor(s):**
- Primary: Client User
- Secondary: Lawyer, System

**Trigger:**
- Client clicks "Book Now" on lawyer profile

**Pre-condition:**
- Client is logged in
- Lawyer is verified
- Lawyer has pricing for selected specialization + interaction type
- Booking date is in the future

**Main Flow:**
1. Client selects:
   - Specialization (from lawyer's list)
   - Interaction Type (Meeting, Phone, Chat)
   - Preferred Date & Time
   - Description of legal issue
2. System queries LAWYER_PRICING for:
   - LawyerId, SpecializationId, InteractionTypeId
3. System retrieves:
   - Price, DurationMinutes
4. System creates BOOKINGS record:
   - UserId = Client ID
   - LawyerId = Selected Lawyer ID
   - SpecializationId = Selected Specialization
   - InteractionTypeId = Selected Interaction Type
   - PriceSnapshot = Current price from LAWYER_PRICING
   - DurationSnapshot = Current duration
   - Date = Selected date
   - Status = "Pending"
   - PaymentStatus = "Pending"
5. System creates CHAT_ROOMS record linked to booking
6. System sends notification to lawyer:
   - "New booking request from {clientName}"
   - "Specialization: {specialization}"
   - "Date: {date}"
7. System sends notification to client:
   - "Booking created successfully"
   - "Booking ID: {bookingId}"
   - "Awaiting lawyer confirmation"
8. System displays booking confirmation page with:
   - Booking details
   - Price snapshot
   - "Proceed to Payment" button

**Alternative Flows:**

**AF-1: Lawyer Has No Pricing**
- At step 2, if no LAWYER_PRICING record exists
- System displays error: "Lawyer has not set pricing for this service"
- Suggests contacting lawyer directly

**AF-2: Date in Past**
- At step 1, if selected date is before today
- System displays error: "Please select a future date"
- Client selects new date

**AF-3: Lawyer Not Available**
- At step 6, if lawyer has marked unavailable for that date
- System displays warning: "Lawyer may not be available on this date"
- Client can proceed or select different date

**Extensions:**
- **EX-1: Recurring Bookings:** (Future) Allow recurring bookings
- **EX-2: Group Bookings:** (Future) Multiple clients book same lawyer

**Post-Condition:**
- BOOKINGS record created with Status = "Pending"
- CHAT_ROOMS record created
- Lawyer and client notified
- Client can proceed to payment

**Sequence Diagram:**
```
sequenceDiagram
    participant Client
    participant Frontend
    participant Controller
    participant Service
    participant Database

    Client->>Frontend: Click Book Now
    Frontend->>Controller: POST /api/bookings
    
    Controller->>Service: CreateBookingAsync(dto, clientId)
    Service->>Database: SELECT * FROM LAWYER_PRICING WHERE LawyerId=? AND SpecializationId=? AND InteractionTypeId=?
    Database-->>Service: LawyerPricing
    
    Service->>Database: INSERT INTO BOOKINGS (UserId, LawyerId, SpecializationId, InteractionTypeId, PriceSnapshot, DurationSnapshot, Date, Status, PaymentStatus, CreatedAt)
    Database-->>Service: Booking created
    
    Service->>Database: INSERT INTO CHAT_ROOMS (BookingId, CreatedAt)
    Database-->>Service: ChatRoom created
    
    Service->>Service: Send notification to Lawyer
    Service->>Service: Send notification to Client
    
    Service-->>Controller: BookingResponseDto
    Controller-->>Frontend: 201 Created
    Frontend-->>Client: Display confirmation
```

---

## UC-6: Process Payment

**Table:** PAYMENT_SESSIONS, BOOKINGS

**Description:**
Client pays for a booking using an external payment provider (Stripe, PayPal, etc.).

**Actor(s):**
- Primary: Client User
- Secondary: Payment Provider, System

**Trigger:**
- Client clicks "Proceed to Payment" on booking confirmation

**Pre-condition:**
- Booking exists with Status = "Pending"
- PaymentStatus = "Pending"
- Amount > 0

**Main Flow:**
1. Client clicks "Pay Now"
2. System creates PAYMENT_SESSIONS record:
   - BookingId = Booking ID
   - Amount = PriceSnapshot from booking
   - Status = "Pending"
   - Provider = "Stripe" (or other)
3. System redirects to payment provider (Stripe checkout)
4. Client enters payment details:
   - Card number, expiry, CVC
   - Billing address
5. Payment provider processes payment
6. Payment provider returns callback to backend:
   - ProviderSessionId
   - Status (Success/Failed)
7. If Success:
   - System updates PAYMENT_SESSIONS:
     - Status = "Success"
     - ProviderSessionId = {sessionId}
   - System updates BOOKINGS:
     - PaymentStatus = "Paid"
     - Status = "Confirmed"
   - System sends notification to lawyer:
     - "Booking confirmed and paid"
     - "Client: {clientName}"
   - System sends notification to client:
     - "Payment successful"
     - "Booking confirmed"
     - "Chat link: {chatRoomLink}"
8. If Failed:
   - System updates PAYMENT_SESSIONS:
     - Status = "Failed"
   - System sends notification to client:
     - "Payment failed. Please try again."
   - Client can retry payment

**Alternative Flows:**

**AF-1: Payment Declined**
- At step 5, if card is declined
- Payment provider returns error
- System displays: "Payment declined. Please try another card."
- Client can retry

**AF-2: Payment Timeout**
- At step 5, if payment times out
- System displays: "Payment timeout. Please try again."
- PAYMENT_SESSIONS status remains "Pending"

**AF-3: Client Cancels Payment**
- At step 4, if client closes payment window
- Payment provider returns cancellation
- System displays: "Payment cancelled"
- Booking remains in "Pending" status

**Extensions:**
- **EX-1: Multiple Payment Methods:** Support cards, wallets, bank transfer
- **EX-2: Installments:** (Future) Allow payment in installments
- **EX-3: Refunds:** (Future) Handle refunds for cancelled bookings

**Post-Condition:**
- PAYMENT_SESSIONS record created
- Payment processed by provider
- BOOKINGS status updated to "Confirmed"
- Lawyer and client notified
- Chat room accessible

**Sequence Diagram:**
```
sequenceDiagram
    participant Client
    participant Frontend
    participant Controller
    participant Service
    participant StripeProvider
    participant Database

    Client->>Frontend: Click Pay Now
    Frontend->>Controller: POST /api/payments/create-session
    
    Controller->>Service: CreateSessionAsync(bookingId, clientId)
    Service->>Database: SELECT * FROM BOOKINGS WHERE Id = ?
    Database-->>Service: Booking
    
    Service->>Database: INSERT INTO PAYMENT_SESSIONS (BookingId, Amount, Status, Provider, CreatedAt)
    Database-->>Service: PaymentSession created
    
    Service-->>Controller: PaymentSession with checkoutUrl
    Controller-->>Frontend: 201 Created
    Frontend->>StripeProvider: Redirect to checkout
    
    Client->>StripeProvider: Enter payment details
    StripeProvider->>StripeProvider: Process payment
    
    alt Payment Success
        StripeProvider->>Controller: POST /webhook (success)
        Controller->>Service: HandleWebhookAsync(event)
        Service->>Database: UPDATE PAYMENT_SESSIONS SET Status='Success'
        Database-->>Service: Updated
        
        Service->>Database: UPDATE BOOKINGS SET Status='Confirmed', PaymentStatus='Paid'
        Database-->>Service: Updated
        
        Service->>Service: Send notification to Lawyer
        Service->>Service: Send notification to Client
        
        Service-->>Controller: Success
        Controller-->>Frontend: 200 OK
        Frontend-->>Client: "Payment successful"
    else Payment Failed
        StripeProvider->>Controller: POST /webhook (failed)
        Controller->>Service: HandleWebhookAsync(event)
        Service->>Database: UPDATE PAYMENT_SESSIONS SET Status='Failed'
        Database-->>Service: Updated
        
        Service->>Service: Send notification to Client
        Service-->>Controller: Failed
        Controller-->>Frontend: 200 OK
        Frontend-->>Client: "Payment failed. Try again."
    end
```

---

## UC-7: Complete Booking & Leave Review

**Table:** BOOKINGS, REVIEWS

**Description:**
After a consultation is completed, the client can leave a review and rating for the lawyer.

**Actor(s):**
- Primary: Client User
- Secondary: Lawyer, System

**Trigger:**
- Booking date/time has passed
- Client clicks "Leave Review" on completed booking

**Pre-condition:**
- Booking exists with Status = "Completed"
- PaymentStatus = "Paid"
- No existing review for this booking
- Booking date is in the past

**Main Flow:**
1. System marks booking as "Completed" (automatic or manual)
2. System sends notification to client:
   - "Your consultation is complete. Leave a review!"
3. Client navigates to booking details
4. Client clicks "Leave Review"
5. Client enters:
   - Rating (1-5 stars)
   - Comment (optional, max 500 chars)
6. System validates:
   - Rating is 1-5
   - Comment length <= 500
7. System creates REVIEWS record:
   - BookingId = Booking ID
   - UserId = Client ID
   - LawyerId = Lawyer ID
   - Rating = Selected rating
   - Comment = Comment text
   - CreatedAt = Current timestamp
8. System calculates average rating from all reviews for lawyer
9. System sends notification to lawyer:
   - "New review from {clientName}"
   - "Rating: {rating} stars"
   - "Comment: {comment}"
10. System displays confirmation:
    - "Thank you for your review!"
    - Shows updated lawyer profile with new rating

**Alternative Flows:**

**AF-1: Booking Not Yet Completed**
- At step 1, if booking date is in future
- System displays: "You can leave a review after the consultation"
- Review button disabled

**AF-2: Review Already Exists**
- At step 4, if review already created for this booking
- System displays: "You have already reviewed this booking"
- Shows existing review with edit option

**AF-3: Client Doesn't Leave Review**
- Client can skip review
- Booking marked as completed without review

**Extensions:**
- **EX-1: Edit Review:** Client can edit review within 7 days
- **EX-2: Lawyer Response:** Lawyer can respond to review
- **EX-3: Helpful Votes:** Other users can mark review as helpful

**Post-Condition:**
- REVIEWS record created
- Lawyer's average rating updated
- Lawyer notified of review
- Client can view updated lawyer profile

**Sequence Diagram:**
```
sequenceDiagram
    participant Client
    participant Frontend
    participant Controller
    participant Service
    participant Database

    Client->>Frontend: Click Leave Review
    Frontend->>Controller: POST /api/reviews
    
    Controller->>Service: CreateReviewAsync(dto, clientId)
    Service->>Database: SELECT * FROM REVIEWS WHERE BookingId = ?
    Database-->>Service: Review or null
    
    alt Review exists
        Service-->>Controller: Conflict Exception
        Controller-->>Frontend: 409 Conflict
        Frontend-->>Client: "Already reviewed"
    else No review
        Service->>Service: Validate rating and comment
        Service->>Database: INSERT INTO REVIEWS (BookingId, UserId, LawyerId, Rating, Comment, CreatedAt)
        Database-->>Service: Review created
        
        Service->>Database: SELECT AVG(Rating) FROM REVIEWS WHERE LawyerId = ?
        Database-->>Service: AvgRating
        
        Service->>Service: Send notification to Lawyer
        Service-->>Controller: ReviewResponseDto
        Controller-->>Frontend: 201 Created
        Frontend-->>Client: "Thank you for your review!"
    end
```

---

## UC-8: User Logout

**Table:** REFRESH_TOKENS

**Description:**
User logs out from the system, invalidating their refresh token and ending the session.

**Actor(s):**
- Primary: Logged-in User
- Secondary: System

**Trigger:**
- User clicks "Logout" button

**Pre-condition:**
- User is logged in with valid access token
- Refresh token exists in REFRESH_TOKENS table

**Main Flow:**
1. User clicks "Logout"
2. Frontend sends POST /api/auth/logout with access token
3. System extracts user ID from JWT claims
4. System queries REFRESH_TOKENS for current user's active tokens
5. System revokes current refresh token:
   - Sets Revoked = true
   - Sets RevokedDate = Current timestamp
   - Sets RevokeReason = "Logout"
6. System clears refresh token cookie (HttpOnly)
7. System logs logout event: "User {userId} logged out"
8. System returns 200 OK
9. Frontend clears access token from memory
10. Frontend clears user from localStorage
11. Frontend redirects to login page

**Alternative Flows:**

**AF-1: Logout All Devices**
- At step 2, if user clicks "Logout All Devices"
- System revokes ALL refresh tokens for user:
   - WHERE UserId = {userId} AND Revoked = false
   - Sets Revoked = true, RevokeReason = "LogoutAll"
- User logged out from all devices

**AF-2: Token Already Revoked**
- At step 5, if refresh token already revoked
- System displays: "Already logged out"
- Frontend redirects to login

**AF-3: Invalid Token**
- At step 3, if JWT is invalid/expired
- System returns 401 Unauthorized
- Frontend redirects to login

**Extensions:**
- **EX-1: Session Timeout:** Auto-logout after 30 min inactivity
- **EX-2: Device Management:** Show active sessions and logout specific device

**Post-Condition:**
- Refresh token revoked in database
- User session ended
- User redirected to login page
- Logout event logged

**Sequence Diagram:**
```
sequenceDiagram
    participant User
    participant Frontend
    participant Controller
    participant Service
    participant Database

    User->>Frontend: Click Logout
    Frontend->>Controller: POST /api/auth/logout
    
    Controller->>Controller: Extract userId from JWT
    Controller->>Service: RevokeTokenAsync(userId, "Logout")
    
    Service->>Database: SELECT * FROM REFRESH_TOKENS WHERE UserId = ? AND Revoked = 0
    Database-->>Service: RefreshTokens
    
    loop For each token
        Service->>Database: UPDATE REFRESH_TOKENS SET Revoked=1, RevokedDate=NOW(), RevokeReason='Logout'
        Database-->>Service: Updated
    end
    
    Controller->>Controller: Clear cookie
    Controller->>Controller: Log event
    Controller-->>Frontend: 200 OK
    
    Frontend->>Frontend: Clear accessToken from memory
    Frontend->>Frontend: Clear user from localStorage
    Frontend->>Frontend: Redirect to /login
    Frontend-->>User: Login page
```

---

## 📊 Use Case Summary

| UC | Name | Tables | Status |
|---|---|---|---|
| UC-1 | User Registration | USERS | 🔴 Critical |
| UC-2 | User Login | USERS, REFRESH_TOKENS | 🔴 Critical |
| UC-3 | Lawyer Registration & Verification | LAWYERS, LAWYER_SPECIALIZATIONS | 🔴 Critical |
| UC-4 | Search & Filter Lawyers | LAWYERS, SPECIALIZATIONS, REVIEWS | 🔴 Critical |
| UC-5 | Create Booking | BOOKINGS, LAWYER_PRICING, CHAT_ROOMS | 🔴 Critical |
| UC-6 | Process Payment | PAYMENT_SESSIONS, BOOKINGS | 🔴 Critical |
| UC-7 | Complete Booking & Review | BOOKINGS, REVIEWS | 🔴 Critical |
| UC-8 | User Logout | REFRESH_TOKENS | 🔴 Critical |

---

## 🎯 Key Points

✅ **Registration** - NO tokens issued, user redirected to login
✅ **Login** - Issues JWT access token + refresh token
✅ **Simple Sequence Diagrams** - User → Frontend → Controller → Service → Database
✅ **Clean Use Case Tables** - Focus on business logic only
✅ **Based on Your Code** - Reflects actual implementation and enhancements
✅ **All Critical Flows** - Phase 1 MVP features

