using System.Text;
using LawyerConnect.Data;
using LawyerConnect.Middlewares;
using LawyerConnect.Repositories;
using LawyerConnect.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Add DbContext
builder.Services.AddDbContext<LawyerConnectDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ILawyerRepository, LawyerRepository>();
builder.Services.AddScoped<IBookingRepository, BookingRepository>();
builder.Services.AddScoped<IPaymentSessionRepository, PaymentSessionRepository>();

// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILawyerService, LawyerService>();
builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

// Authentication / JWT
var jwtKey = builder.Configuration["Jwt:Key"] ?? string.Empty;
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];
var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = signingKey
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Ensure database is created and migrations are applied
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<LawyerConnectDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    
    try
    {
        // Extract database name from connection string and create it if it doesn't exist
        var builder2 = new SqlConnectionStringBuilder(connectionString);
        var databaseName = builder2.InitialCatalog;
        builder2.InitialCatalog = "master"; // Connect to master to create database
        
        using (var masterConnection = new SqlConnection(builder2.ConnectionString))
        {
            masterConnection.Open();
            var createDbCommand = new SqlCommand(
                $@"IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '{databaseName}') 
                   CREATE DATABASE [{databaseName}]", masterConnection);
            createDbCommand.ExecuteNonQuery();
            logger.LogInformation($"Database '{databaseName}' ensured to exist.");
        }
        
        // Now migrate the database
        dbContext.Database.Migrate();
        logger.LogInformation("Database migrated successfully.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while creating/migrating the database. Please ensure SQL Server is running and accessible.");
        throw; // Re-throw to prevent app from starting with invalid database state
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseMiddleware<RateLimitingMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
