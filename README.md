# LawyerConnect Backend

ASP.NET Core 8 Web API for user registration/login, lawyer onboarding, bookings, and payment sessions. Uses SQL Server with Entity Framework Core, JWT authentication/authorization, and a simple in-memory rate limiter.

## Tech stack
- .NET 8, ASP.NET Core Web API, Swagger
- Entity Framework Core 8 with SQL Server
- JWT bearer auth (HMAC SHA256)
- Role-based access: `User`, `Lawyer`, `Admin`
- Custom middleware: per-route rate limiting

## Project layout
- `Program.cs` – DI setup, EF Core, JWT, Swagger, rate limiting middleware.
- `Data/LawyerConnectDbContext.cs` – DbSets and relationships (unique user email, one-to-one user↔lawyer, bookings with restricted deletes, one-to-one payment session).
- `Models/` – User, Lawyer, Booking, PaymentSession entities.
- `DTOs/` + `Mappers/` – Transport objects and mapping helpers.
- `Repositories/` – Data access abstractions and implementations.
- `Services/` – Business logic for users, lawyers, bookings, payments.
- `Controllers/` – HTTP endpoints: auth, users, lawyers, bookings, payments.
- `Middlewares/RateLimitingMiddleware.cs` – Simple IP+path windowed limiter.
- `Migrations/` – Initial EF Core migration.

## Configuration
Update `appsettings.json` (or environment variables):

- `ConnectionStrings:DefaultConnection` – SQL Server connection string.
- `Jwt:Key` (min 32 chars), `Jwt:Issuer`, `Jwt:Audience`, `Jwt:ExpiresMinutes`.
- `AdminSecret` – required to self-register as `Admin`.
- `RateLimiting:Limit`, `RateLimiting:WindowSeconds` – per-IP+path window.

## Run it locally (step by step)
1) **Install prerequisites**: .NET 8 SDK, SQL Server instance reachable from the app.  
2) **Restore packages**: `dotnet restore`.  
3) **Configure env**: set `ConnectionStrings__DefaultConnection` and JWT/Admin secrets if you don’t want to use the defaults in `appsettings.json`.  
4) **Create database**: `dotnet ef database update` (uses migrations in `Migrations/`).  
5) **Start API**: `dotnet run` (defaults to HTTPS).  
6) **Explore docs**: open Swagger at `/swagger` (enabled in Development).  
7) **Call APIs**: supply `Authorization: Bearer <token>` for protected routes.

## API surface (high level)
- `POST /api/auth/register` – Register user; optional `Role` (`User`/`Lawyer`/`Admin`, admin needs `AdminSecret`).
- `POST /api/auth/login` – Get JWT (returns user info + expiry).
- `GET /api/auth/me` – Current user profile (auth).
- `GET /api/users` – Paged users (admin).  
  `PUT /api/users/update` – Update own profile.  
  `PUT /api/users/change-password` – Change own password.  
  `PUT /api/users/update-role` – Admin role change.
- `POST /api/lawyers/register` – Create lawyer profile for current user.  
  `GET /api/lawyers` – Paged list (public).  
  `GET /api/lawyers/{id}` – Lawyer details (public).  
  `GET /api/lawyers/me` – Current lawyer profile (lawyer/admin).  
  `PUT /api/lawyers/{id}/verify` – Verify lawyer (admin).
- `POST /api/bookings` – Create booking; user inferred from token unless admin overrides.  
  `GET /api/bookings/{id}` – Booking by id (auth).  
  `GET /api/bookings/user` – Current user’s bookings.  
  `GET /api/bookings/lawyer` – Bookings for lawyer (lawyer/admin; admin can specify `lawyerId`).  
  `PUT /api/bookings/{id}/status` – Update status (admin/lawyer).
- `POST /api/payments/create-session` – Start a payment session for a booking (auth).  
  `POST /api/payments/confirm` – Mark session paid (auth).

## Auth & roles (how it works)
- Users register with SHA256-hashed passwords (see `AuthController`).
- JWT includes `sub` (user id), email, and role; validated via `JwtBearer` setup in `Program.cs`.
- `[Authorize]` and `[Authorize(Roles = "...")]` protect routes; controllers derive user id/role from claims.

## Rate limiting
- `RateLimitingMiddleware` tracks requests per IP+path in a sliding window.  
- Returns `429 Too Many Requests` with `X-RateLimit-*` headers when exceeded.

## Database model notes
- Unique email per user; each lawyer links to exactly one user.
- Booking keeps references to both user and lawyer with restricted deletes (history safe).
- PaymentSession is one-to-one with Booking; amounts stored as `decimal(18,2)`. Lawyer lat/long stored as `decimal(10,8)`.

## Useful commands
- `dotnet restore` – Restore dependencies.
- `dotnet ef migrations add <Name>` – Create migration (after models change).
- `dotnet ef database update` – Apply migrations.
- `dotnet run` – Start the API.

## Development tips
- Swagger UI in Development helps inspect payloads.
- Prefer environment variables for secrets in non-dev environments.
- Adjust `RateLimiting` for production traffic patterns.

