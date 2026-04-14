# ESTASHEER - Use Cases & Core Flows Documentation

## 📊 Use Case Classification

### 🔴 CRITICAL USE CASES (Must Implement First)
1. UC-1: User Registration
2. UC-2: User Login
3. UC-3: Lawyer Registration & Verification
4. UC-4: Search & Filter Lawyers
5. UC-5: Create Booking
6. UC-6: Process Payment
7. UC-7: Complete Booking & Review
8. UC-8: User Logout

### 🟡 IMPORTANT USE CASES (Phase 2)
9. UC-9: Manage Lawyer Pricing
10. UC-10: View Booking History
11. UC-11: Send Chat Messages
12. UC-12: Receive Notifications
13. UC-13: Cancel Booking

### 🟢 NICE-TO-HAVE USE CASES (Phase 3)
14. UC-14: Update User Profile
15. UC-15: View Analytics (Admin)
16. UC-16: Manage Specializations (Admin)
17. UC-17: Suspend/Ban User (Admin)

---

## 🔴 CRITICAL USE CASES

---

## UC-1: User Registration

**Table:** USERS, REFRESH_TOKENS

**Description:** 
A new user (client or lawyer) creates an account in the system with email, password, and basic information.

**Actor(s):**
- Primary: New User (Client or Lawyer)
- Secondary: System

**Trigger:**
- User clicks "Sign Up" button on registration page

**Pre-condition:**
- User is not already registered
- Email is unique in the system
- Password meets security requirements (min 8 chars, uppercase, lowercase, number)

**Main Flow:**
1. User navigates to registration page
2. User enters: Email, Password, Full Name, Phone, City, Role (Client/Lawyer)
3. System validates input:
   - Email format is valid
   - Email is not already registered
   - Password meets requirements
   - Phone format is valid
4. System hashes password using SHA256 (or bcrypt)
5. System creates new User record with Role = "Client" or "Lawyer"
6. System generates JWT access token (30 min expiry)
7. System generates refresh token (7 days expiry)
8. System stores refresh token in REFRESH_TOKENS table
9. System sets HttpOnly cookie with refresh token
10. System returns access token + user info to frontend
11. User is redirected to dashboard

**Alternative Flows:**

**AF-1: Email Already Exists**
- At step 3, if email is already registered
- System displays error: "Email already registered"
- User can click "Login" or try different email

**AF-2: Password Doesn't Meet Requirements**
- At step 3, if password is weak
- System displays error: "Password must contain uppercase, lowercase, number"
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
- Refresh token stored in REFRESH_TOKENS table
- User logged in with valid access token
- User can access dashboard

**Sequence Diagram:**
```
User                Frontend              Backend              Database
 |                    |                     |                    |
 |--Sign Up---------->|                     |                    |
 |                    |--POST /register---->|                    |
 |                    |                     |--Validate Input----|
 |                    |                     |<---Valid-----------|
 |                    |                     |--Hash Password-----|
 |                    |                     |--Create User-------|
 |                    |                     |<---User Created----|
 |                    |                     |--Generate JWT------|
 |                    |                     |--Generate RefreshToken
 |                    |                     |--Store RefreshToken|
 |                    |                     |<---Stored----------|
 |                    |<--201 Created-------|                    |
 |                    |  (token + user)     |                    |
 |<--Redirect---------|                     |                    |
 |  Dashboard         |                     |                    |
```

---

## UC-2: User Login

**Table:** USERS, REFRESH_TOKENS

**Description:**
An existing user logs into the system using email and password credentials.

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
   - System stores refresh token in REFRESH_TOKENS table
   - System logs login event: "User {userId} logged in from IP {ipAddress}"
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
User                Frontend              Backend              Database
 |                    |                     |                    |
 |--Login---------->|                     |                    |
 |                    |--POST /login------->|                    |
 |                    |                     |--Query User--------|
 |                    |                     |<---User Found------|
 |                    |                     |--Verify Password---|
 |                    |                     |<---Valid-----------|
 |                    |                     |--Generate JWT------|
 |                    |                     |--Generate RefreshToken
 |                    |                     |--Store RefreshToken|
 |                    |                     |<---Stored----------|
 |                    |                     |--Log Event---------|
 |                    |<--200 OK------------|                    |
 |                    |  (token + user)     |                    |
 |<--Redirect---------|                     |                    |
 |  Dashboard         |                     |                    |
```

---

## UC-3: Lawyer Registration & Verification

**Table:** USERS, LAWYERS, LAWYER_SPECIALIZATIONS, SPECIALIZATIONS

**Description:**
A lawyer registers their profile with specializations, experience, and location. Admin verifies the lawyer before they appear in search results.

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
Lawyer              Frontend              Backend              Database
 |                   |                     |                    |
 |--Register-------->|                     |                    |
 |  as Lawyer        |--POST /lawyers/register
 |                   |                     |--Validate Input----|
 |                   |                     |<---Valid-----------|
 |                   |                     |--Create Lawyer-----|
 |                   |                     |<---Created---------|
 |                   |                     |--Create Specializations
 |                   |                     |<---Created---------|
 |                   |                     |--Notify Admin------|
 |                   |<--201 Created-------|                    |
 |<--Awaiting--------|                     |                    |
 |  Verification     |                     |                    |
 |                   |                     |                    |
 |                   |                Admin Reviews             |
 |                   |                     |                    |
 |                   |                     |--PUT /verify-------|
 |                   |                     |--Update Verified---|
 |                   |                     |<---Updated---------|
 |                   |                     |--Notify Lawyer-----|
 |<--Verified--------|                     |                    |
```

---

## UC-4: Search & Filter Lawyers

**Table:** LAWYERS, LAWYER_SPECIALIZATIONS, SPECIALIZATIONS, USERS

**Description:**
A client searches for lawyers by specialization, location, experience, and rating.

**Actor(s):**
- Primary: Client User
- Secondary: System

**Trigger:**
- Client clicks "Find a Lawyer" or uses search bar

**Pre-condition:**
- At least one verified lawyer exists
- Client is logged in (optional - can search without login)

**Main Flow:**
1. Client navigates to lawyer search page
2. Client enters search criteria (optional):
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
6. Client clicks on lawyer to view detailed profile
7. System displays:
   - Full bio, all specializations
   - Pricing for each specialization/interaction type
   - Recent reviews and ratings
   - Availability calendar
8. Client can click "Book Now" or "Message"

**Alternative Flows:**

**AF-1: No Results Found**
- At step 4, if no lawyers match criteria
- System displays: "No lawyers found. Try adjusting filters."
- Suggests popular specializations

**AF-2: Client Not Logged In**
- At step 8, if client clicks "Book Now" without login
- System redirects to login page
- After login, redirects back to booking page

**Extensions:**
- **EX-1: Sort Options:** Sort by rating, price, experience, distance
- **EX-2: Saved Favorites:** Client can save favorite lawyers
- **EX-3: Recommendations:** System recommends lawyers based on history

**Post-Condition:**
- Client views list of verified lawyers matching criteria
- Client can view detailed lawyer profile
- Client can proceed to booking

**Sequence Diagram:**
```
Client              Frontend              Backend              Database
 |                   |                     |                    |
 |--Search---------->|                     |                    |
 |  Lawyers          |--GET /lawyers?filters
 |                   |                     |--Query Lawyers-----|
 |                   |                     |<---Results---------|
 |                   |                     |--Calculate Ratings-|
 |                   |                     |<---Ratings---------|
 |                   |<--200 OK------------|                    |
 |                   |  (lawyer list)      |                    |
 |<--Display---------|                     |                    |
 |  Results          |                     |                    |
 |                   |                     |                    |
 |--View Detail----->|                     |                    |
 |                   |--GET /lawyers/{id}--|                    |
 |                   |                     |--Query Lawyer------|
 |                   |                     |--Query Reviews-----|
 |                   |                     |--Query Pricing-----|
 |                   |                     |<---Data-----------|
 |                   |<--200 OK------------|                    |
 |                   |  (detailed profile) |                    |
 |<--Display---------|                     |                    |
 |  Profile          |                     |                    |
```

---



## UC-5: Create Booking

**Table:** BOOKINGS, LAWYER_PRICING, USERS, LAWYERS, SPECIALIZATIONS, INTERACTION_TYPES

**Description:**
A client creates a booking request with a lawyer for a specific specialization and interaction type. The system captures pricing snapshot.

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
Client              Frontend              Backend              Database
 |                   |                     |                    |
 |--Book Now-------->|                     |                    |
 |                   |--POST /bookings-----|                    |
 |                   |                     |--Query Pricing-----|
 |                   |                     |<---Pricing---------|
 |                   |                     |--Create Booking----|
 |                   |                     |<---Created---------|
 |                   |                     |--Create ChatRoom---|
 |                   |                     |<---Created---------|
 |                   |                     |--Notify Lawyer-----|
 |                   |                     |--Notify Client-----|
 |                   |<--201 Created-------|                    |
 |                   |  (booking details)  |                    |
 |<--Confirmation----|                     |                    |
 |  Page             |                     |                    |
```

---

## UC-6: Process Payment

**Table:** PAYMENT_SESSIONS, BOOKINGS, USERS

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
Client              Frontend              Backend              Payment Provider
 |                   |                     |                    |
 |--Pay Now-------->|                     |                    |
 |                   |--POST /payments/create-session
 |                   |                     |--Create Session----|
 |                   |                     |<---SessionId-------|
 |                   |<--Redirect---------|                    |
 |                   |  to Stripe         |                    |
 |                   |                     |                    |
 |--Enter Card------>|                     |                    |
 |                   |--Process Payment---|--Process---------->|
 |                   |                     |<---Success---------|
 |                   |                     |--Update Booking----|
 |                   |                     |--Notify Users------|
 |                   |<--Success---------|                    |
 |<--Confirmation----|                     |                    |
 |  Page             |                     |                    |
```

---

## UC-7: Complete Booking & Review

**Table:** BOOKINGS, REVIEWS, USERS, LAWYERS

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
8. System updates LAWYERS table:
   - Recalculates average rating from all reviews
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
Client              Frontend              Backend              Database
 |                   |                     |                    |
 |--Consultation-----|                     |                    |
 |  Complete         |                     |--Mark Complete-----|
 |                   |                     |<---Updated---------|
 |                   |                     |--Notify Client-----|
 |<--Notification----|                     |                    |
 |                   |                     |                    |
 |--Leave Review---->|                     |                    |
 |                   |--POST /reviews------|                    |
 |                   |                     |--Create Review-----|
 |                   |                     |<---Created---------|
 |                   |                     |--Update Avg Rating-|
 |                   |                     |<---Updated---------|
 |                   |                     |--Notify Lawyer-----|
 |                   |<--201 Created-------|                    |
 |<--Confirmation----|                     |                    |
```

---

## UC-8: User Logout

**Table:** REFRESH_TOKENS, USERS

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
10. Frontend redirects to login page

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
User                Frontend              Backend              Database
 |                   |                     |                    |
 |--Logout---------->|                     |                    |
 |                   |--POST /logout-------|                    |
 |                   |  (access token)     |--Query Tokens------|
 |                   |                     |<---Tokens---------|
 |                   |                     |--Revoke Token------|
 |                   |                     |<---Revoked---------|
 |                   |                     |--Log Event---------|
 |                   |<--200 OK------------|                    |
 |                   |  (clear cookie)     |                    |
 |<--Redirect--------|                     |                    |
 |  Login Page       |                     |                    |
```

---

## 🟡 IMPORTANT USE CASES (Phase 2)

---

## UC-9: Manage Lawyer Pricing

**Table:** LAWYER_PRICING, SPECIALIZATIONS, INTERACTION_TYPES, LAWYERS

**Description:**
A lawyer sets or updates pricing for different specializations and interaction types.

**Actor(s):**
- Primary: Lawyer User
- Secondary: System

**Trigger:**
- Lawyer clicks "Manage Pricing" in dashboard

**Pre-condition:**
- User is logged in with Role = "Lawyer"
- Lawyer profile exists and is verified
- Specializations exist in system

**Main Flow:**
1. Lawyer navigates to pricing management page
2. System displays table:
   - Specialization | Interaction Type | Price | Duration
3. Lawyer can:
   - Add new pricing: Select specialization + interaction type + price + duration
   - Edit existing: Click row, modify price/duration
   - Delete: Click delete button
4. For each change:
   - System validates: Price > 0, Duration > 0
   - System creates/updates LAWYER_PRICING record
5. System displays confirmation: "Pricing updated"
6. New pricing applies to future bookings only
7. Existing bookings use old pricing snapshot

**Post-Condition:**
- LAWYER_PRICING records updated
- New bookings use updated pricing
- Lawyer can view pricing in profile

---

## UC-10: View Booking History

**Table:** BOOKINGS, REVIEWS, USERS, LAWYERS

**Description:**
User views their past and upcoming bookings with details and reviews.

**Actor(s):**
- Primary: Client or Lawyer User
- Secondary: System

**Trigger:**
- User clicks "My Bookings" in dashboard

**Pre-condition:**
- User is logged in
- User has at least one booking

**Main Flow:**
1. System queries BOOKINGS:
   - For Client: WHERE UserId = {clientId}
   - For Lawyer: WHERE LawyerId = {lawyerId}
2. System displays bookings in two tabs:
   - **Upcoming:** Status = "Confirmed", Date > Today
   - **Past:** Status = "Completed", Date <= Today
3. For each booking, display:
   - Lawyer/Client name
   - Specialization, Interaction Type
   - Date, Time, Duration
   - Price, Payment Status
   - Status
4. User can click booking to view details:
   - Full details
   - Chat history
   - Review (if completed)
5. For past bookings, show review section

**Post-Condition:**
- User views booking history
- Can access chat and reviews

---

## UC-11: Send Chat Messages

**Table:** CHAT_MESSAGES, CHAT_ROOMS, BOOKINGS, USERS

**Description:**
Client and lawyer communicate via chat during/after booking.

**Actor(s):**
- Primary: Client or Lawyer
- Secondary: System

**Trigger:**
- User clicks "Chat" on booking or chat room

**Pre-condition:**
- Booking exists
- CHAT_ROOMS record created for booking
- Both users are part of booking

**Main Flow:**
1. User navigates to chat room
2. System loads chat history from CHAT_MESSAGES
3. User types message and clicks "Send"
4. System creates CHAT_MESSAGES record:
   - ChatRoomId = Room ID
   - SenderId = User ID
   - Message = Text
   - SentAt = Current timestamp
5. System broadcasts message to other user (WebSocket/polling)
6. Other user receives notification: "New message from {senderName}"
7. Chat history updated in real-time

**Post-Condition:**
- Message stored in database
- Both users can view message history

---

## UC-12: Receive Notifications

**Table:** NOTIFICATIONS, USERS

**Description:**
User receives in-app notifications for booking, payment, and system events.

**Actor(s):**
- Primary: User
- Secondary: System

**Trigger:**
- System event occurs (booking created, payment processed, etc.)

**Pre-condition:**
- User is registered
- User has notification preferences enabled

**Main Flow:**
1. System event triggered (e.g., new booking)
2. System creates NOTIFICATIONS record:
   - UserId = Affected user
   - Title = Event title
   - Message = Event details
   - Type = "Booking" / "Payment" / "System"
   - IsRead = false
3. System sends notification to user:
   - In-app notification (if online)
   - Email notification (optional)
   - Push notification (optional)
4. User sees notification badge in UI
5. User clicks notification to view details
6. System marks notification as read: IsRead = true

**Post-Condition:**
- Notification stored and delivered
- User informed of event

---

## UC-13: Cancel Booking

**Table:** BOOKINGS, PAYMENT_SESSIONS, REVIEWS

**Description:**
Client or lawyer cancels a booking before the scheduled date.

**Actor(s):**
- Primary: Client or Lawyer
- Secondary: System

**Trigger:**
- User clicks "Cancel Booking"

**Pre-condition:**
- Booking exists with Status = "Confirmed"
- Booking date is in future
- PaymentStatus = "Paid"

**Main Flow:**
1. User clicks "Cancel Booking"
2. System displays confirmation dialog with cancellation policy
3. User confirms cancellation
4. System updates BOOKINGS:
   - Status = "Cancelled"
5. System processes refund:
   - Refund amount based on cancellation policy
   - If < 24 hours: No refund
   - If 24-48 hours: 50% refund
   - If > 48 hours: 100% refund
6. System creates refund transaction
7. System sends notifications:
   - To client: "Booking cancelled. Refund: ${amount}"
   - To lawyer: "Booking cancelled by {clientName}"
8. System prevents review creation for cancelled booking

**Post-Condition:**
- Booking cancelled
- Refund processed
- Both users notified

---

## 🟢 NICE-TO-HAVE USE CASES (Phase 3)

---

## UC-14: Update User Profile

**Table:** USERS

**Description:**
User updates their profile information (name, phone, city, photo).

**Actor(s):**
- Primary: User
- Secondary: System

**Trigger:**
- User clicks "Edit Profile"

**Pre-condition:**
- User is logged in

**Main Flow:**
1. User navigates to profile settings
2. User can edit:
   - Full Name
   - Phone
   - City
   - Profile Photo
3. System validates input
4. System updates USERS record
5. System displays confirmation: "Profile updated"

**Post-Condition:**
- User profile updated
- Changes reflected in system

---

## UC-15: View Analytics (Admin)

**Table:** BOOKINGS, REVIEWS, PAYMENT_SESSIONS, USERS, LAWYERS

**Description:**
Admin views system analytics and statistics.

**Actor(s):**
- Primary: Admin User
- Secondary: System

**Trigger:**
- Admin clicks "Analytics" in dashboard

**Pre-condition:**
- User is logged in with Role = "Admin"

**Main Flow:**
1. System displays dashboard with:
   - Total users, lawyers, bookings
   - Revenue (total, this month)
   - Average rating
   - Booking trends (chart)
   - Top lawyers by rating
   - Recent transactions
2. Admin can filter by date range
3. Admin can export reports

**Post-Condition:**
- Admin views system statistics

---

## UC-16: Manage Specializations (Admin)

**Table:** SPECIALIZATIONS

**Description:**
Admin creates, edits, or deletes legal specializations.

**Actor(s):**
- Primary: Admin User
- Secondary: System

**Trigger:**
- Admin clicks "Manage Specializations"

**Pre-condition:**
- User is logged in with Role = "Admin"

**Main Flow:**
1. Admin views list of specializations
2. Admin can:
   - Add new: Enter name + description
   - Edit: Modify name/description
   - Delete: Remove specialization
3. System validates input
4. System updates SPECIALIZATIONS table

**Post-Condition:**
- Specializations updated

---

## UC-17: Suspend/Ban User (Admin)

**Table:** USERS

**Description:**
Admin suspends or bans a user for policy violations.

**Actor(s):**
- Primary: Admin User
- Secondary: System

**Trigger:**
- Admin clicks "Suspend" on user profile

**Pre-condition:**
- User is logged in with Role = "Admin"
- Target user exists

**Main Flow:**
1. Admin views user profile
2. Admin clicks "Suspend" or "Ban"
3. Admin enters reason
4. System updates USERS:
   - IsSuspended = true / IsBanned = true
   - SuspensionReason = Reason
5. System revokes all active refresh tokens for user
6. System sends notification to user: "Your account has been suspended"
7. User cannot login

**Post-Condition:**
- User account suspended/banned
- User cannot access system

---

## 📊 Use Case Priority Matrix

| Use Case | Priority | Complexity | Dependencies | Phase |
|----------|----------|-----------|--------------|-------|
| UC-1: Registration | 🔴 Critical | Low | None | 1 |
| UC-2: Login | 🔴 Critical | Low | UC-1 | 1 |
| UC-3: Lawyer Registration | 🔴 Critical | Medium | UC-1, UC-2 | 1 |
| UC-4: Search Lawyers | 🔴 Critical | Medium | UC-3 | 1 |
| UC-5: Create Booking | 🔴 Critical | High | UC-2, UC-4 | 1 |
| UC-6: Process Payment | 🔴 Critical | High | UC-5 | 1 |
| UC-7: Complete & Review | 🔴 Critical | Medium | UC-6 | 1 |
| UC-8: Logout | 🔴 Critical | Low | UC-2 | 1 |
| UC-9: Manage Pricing | 🟡 Important | Medium | UC-3 | 2 |
| UC-10: Booking History | 🟡 Important | Low | UC-5 | 2 |
| UC-11: Chat Messages | 🟡 Important | High | UC-5 | 2 |
| UC-12: Notifications | 🟡 Important | Medium | All | 2 |
| UC-13: Cancel Booking | 🟡 Important | High | UC-5, UC-6 | 2 |
| UC-14: Update Profile | 🟢 Nice-to-have | Low | UC-1 | 3 |
| UC-15: Analytics | 🟢 Nice-to-have | High | All | 3 |
| UC-16: Manage Specializations | 🟢 Nice-to-have | Low | None | 3 |
| UC-17: Suspend User | 🟢 Nice-to-have | Low | UC-1 | 3 |

---

## 🎯 Implementation Roadmap

### Phase 1 (MVP - Weeks 1-4)
- UC-1: User Registration
- UC-2: User Login
- UC-3: Lawyer Registration & Verification
- UC-4: Search & Filter Lawyers
- UC-5: Create Booking
- UC-6: Process Payment
- UC-7: Complete Booking & Review
- UC-8: User Logout

### Phase 2 (Core Features - Weeks 5-8)
- UC-9: Manage Lawyer Pricing
- UC-10: View Booking History
- UC-11: Send Chat Messages
- UC-12: Receive Notifications
- UC-13: Cancel Booking

### Phase 3 (Enhancement - Weeks 9-12)
- UC-14: Update User Profile
- UC-15: View Analytics
- UC-16: Manage Specializations
- UC-17: Suspend/Ban User

---

## 📝 Notes

- All use cases follow the same format for consistency
- Sequence diagrams show main flow only (not all alternatives)
- Each use case is independent but may have dependencies
- Pre-conditions and post-conditions ensure data integrity
- Alternative flows handle edge cases and errors
- Extensions indicate future enhancements

