# Deployment Guide

## 🎯 Purpose
This guide provides step-by-step instructions for deploying the LawyerConnect backend to production.

---

## 📋 Pre-Deployment Checklist

### ✅ Required
- [ ] SQL Server database (Azure SQL, AWS RDS, or self-hosted)
- [ ] Stripe account with API keys
- [ ] SSL certificate for HTTPS
- [ ] Domain name (optional but recommended)
- [ ] Hosting environment (Azure, AWS, or IIS)

### ✅ Recommended
- [ ] Application Insights or logging service
- [ ] CDN for static assets
- [ ] Backup strategy
- [ ] Monitoring and alerting

---

## 🔧 Environment Configuration

### 1. Production appsettings.json

Create `appsettings.Production.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=LawyerConnect;User Id=YOUR_USER;Password=YOUR_PASSWORD;TrustServerCertificate=True;MultipleActiveResultSets=true"
  },
  "Jwt": {
    "Key": "YOUR_PRODUCTION_SECRET_KEY_MINIMUM_32_CHARACTERS",
    "Issuer": "LawyerConnect",
    "Audience": "LawyerConnectUsers",
    "ExpiryMinutes": 60
  },
  "Stripe": {
    "SecretKey": "sk_live_YOUR_LIVE_SECRET_KEY",
    "PublicKey": "pk_live_YOUR_LIVE_PUBLIC_KEY",
    "WebhookSecret": "whsec_YOUR_WEBHOOK_SECRET",
    "Currency": "usd"
  },
  "App": {
    "BaseUrl": "https://yourdomain.com"
  },
  "Cors": {
    "AllowedOrigins": [
      "https://yourdomain.com",
      "https://www.yourdomain.com"
    ]
  }
}
```

### 2. Environment Variables (Alternative)

Instead of storing secrets in appsettings.json, use environment variables:

```bash
# Database
ConnectionStrings__DefaultConnection="Server=...;Database=LawyerConnect;..."

# JWT
Jwt__Key="YOUR_PRODUCTION_SECRET_KEY"
Jwt__Issuer="LawyerConnect"
Jwt__Audience="LawyerConnectUsers"
Jwt__ExpiryMinutes="60"

# Stripe
Stripe__SecretKey="sk_live_..."
Stripe__PublicKey="pk_live_..."
Stripe__WebhookSecret="whsec_..."
Stripe__Currency="usd"

# App
App__BaseUrl="https://yourdomain.com"
```

---

## 🗄️ Database Setup

### 1. Create Production Database

#### Azure SQL Database
```bash
# Using Azure CLI
az sql server create --name lawyerconnect-server --resource-group LawyerConnect --location eastus --admin-user sqladmin --admin-password YourPassword123!

az sql db create --resource-group LawyerConnect --server lawyerconnect-server --name LawyerConnect --service-objective S0
```

#### AWS RDS
```bash
# Using AWS CLI
aws rds create-db-instance \
    --db-instance-identifier lawyerconnect-db \
    --db-instance-class db.t3.micro \
    --engine sqlserver-ex \
    --master-username admin \
    --master-user-password YourPassword123! \
    --allocated-storage 20
```

### 2. Run Migrations

```bash
# Update connection string in appsettings.Production.json
# Then run migrations
dotnet ef database update --environment Production
```

### 3. Seed Initial Data (Optional)

```bash
# Run the application once to seed data
dotnet run --environment Production
```

---

## 🚀 Deployment Options

### Option 1: Azure App Service (Recommended)

#### Step 1: Create App Service
```bash
# Create resource group
az group create --name LawyerConnect --location eastus

# Create App Service plan
az appservice plan create --name LawyerConnectPlan --resource-group LawyerConnect --sku B1 --is-linux

# Create web app
az webapp create --resource-group LawyerConnect --plan LawyerConnectPlan --name lawyerconnect-api --runtime "DOTNETCORE:8.0"
```

#### Step 2: Configure App Settings
```bash
# Set connection string
az webapp config connection-string set --resource-group LawyerConnect --name lawyerconnect-api --settings DefaultConnection="Server=...;Database=LawyerConnect;..." --connection-string-type SQLAzure

# Set app settings
az webapp config appsettings set --resource-group LawyerConnect --name lawyerconnect-api --settings \
    Jwt__Key="YOUR_SECRET_KEY" \
    Stripe__SecretKey="sk_live_..." \
    Stripe__PublicKey="pk_live_..." \
    Stripe__WebhookSecret="whsec_..."
```

#### Step 3: Deploy
```bash
# Publish the application
dotnet publish -c Release -o ./publish

# Deploy to Azure
az webapp deployment source config-zip --resource-group LawyerConnect --name lawyerconnect-api --src ./publish.zip
```

### Option 2: AWS Elastic Beanstalk

#### Step 1: Install EB CLI
```bash
pip install awsebcli
```

#### Step 2: Initialize EB
```bash
eb init -p "64bit Amazon Linux 2 v2.5.0 running .NET Core" lawyerconnect-api --region us-east-1
```

#### Step 3: Create Environment
```bash
eb create lawyerconnect-prod --database.engine sqlserver-ex
```

#### Step 4: Deploy
```bash
dotnet publish -c Release
eb deploy
```

### Option 3: Docker Container

#### Step 1: Create Dockerfile
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["LawyerConnect.csproj", "./"]
RUN dotnet restore "LawyerConnect.csproj"
COPY . .
RUN dotnet build "LawyerConnect.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LawyerConnect.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LawyerConnect.dll"]
```

#### Step 2: Build and Run
```bash
# Build image
docker build -t lawyerconnect-api .

# Run container
docker run -d -p 80:80 -p 443:443 \
    -e ConnectionStrings__DefaultConnection="Server=...;Database=LawyerConnect;..." \
    -e Jwt__Key="YOUR_SECRET_KEY" \
    -e Stripe__SecretKey="sk_live_..." \
    lawyerconnect-api
```

### Option 4: IIS (Windows Server)

#### Step 1: Install Prerequisites
- IIS with ASP.NET Core Module
- .NET 8.0 Runtime
- SQL Server

#### Step 2: Publish Application
```bash
dotnet publish -c Release -o C:\inetpub\wwwroot\LawyerConnect
```

#### Step 3: Configure IIS
1. Open IIS Manager
2. Create new Application Pool (.NET CLR Version: No Managed Code)
3. Create new Website pointing to publish folder
4. Configure bindings (HTTP/HTTPS)
5. Set application pool identity

#### Step 4: Configure web.config
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet" 
                  arguments=".\LawyerConnect.dll" 
                  stdoutLogEnabled="false" 
                  stdoutLogFile=".\logs\stdout" 
                  hostingModel="inprocess" />
    </system.webServer>
  </location>
</configuration>
```

---

## 🔒 Security Configuration

### 1. HTTPS Configuration

#### Azure App Service
```bash
# Enable HTTPS only
az webapp update --resource-group LawyerConnect --name lawyerconnect-api --https-only true

# Add custom domain and SSL
az webapp config hostname add --webapp-name lawyerconnect-api --resource-group LawyerConnect --hostname yourdomain.com
az webapp config ssl bind --certificate-thumbprint THUMBPRINT --ssl-type SNI --name lawyerconnect-api --resource-group LawyerConnect
```

#### Let's Encrypt (Self-Hosted)
```bash
# Install certbot
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Configure in appsettings.json
{
  "Kestrel": {
    "Endpoints": {
      "Https": {
        "Url": "https://*:443",
        "Certificate": {
          "Path": "/etc/letsencrypt/live/yourdomain.com/fullchain.pem",
          "KeyPath": "/etc/letsencrypt/live/yourdomain.com/privkey.pem"
        }
      }
    }
  }
}
```

### 2. CORS Configuration

Update `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("Production", policy =>
    {
        policy.WithOrigins(
            "https://yourdomain.com",
            "https://www.yourdomain.com"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

app.UseCors("Production");
```

### 3. API Rate Limiting

Install package:
```bash
dotnet add package AspNetCoreRateLimit
```

Configure in `Program.cs`:
```csharp
builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(options =>
{
    options.GeneralRules = new List<RateLimitRule>
    {
        new RateLimitRule
        {
            Endpoint = "*",
            Limit = 100,
            Period = "1m"
        }
    };
});
builder.Services.AddInMemoryRateLimiting();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

app.UseIpRateLimiting();
```

---

## 🔔 Stripe Webhook Configuration

### 1. Register Webhook Endpoint

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/payments/webhook`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy webhook signing secret

### 2. Update Configuration
```json
{
  "Stripe": {
    "WebhookSecret": "whsec_YOUR_WEBHOOK_SECRET"
  }
}
```

---

## 📊 Monitoring and Logging

### Option 1: Application Insights (Azure)

#### Install Package
```bash
dotnet add package Microsoft.ApplicationInsights.AspNetCore
```

#### Configure
```csharp
builder.Services.AddApplicationInsightsTelemetry(options =>
{
    options.ConnectionString = "YOUR_CONNECTION_STRING";
});
```

### Option 2: Serilog

#### Install Packages
```bash
dotnet add package Serilog.AspNetCore
dotnet add package Serilog.Sinks.File
dotnet add package Serilog.Sinks.Console
```

#### Configure
```csharp
builder.Host.UseSerilog((context, configuration) =>
{
    configuration
        .ReadFrom.Configuration(context.Configuration)
        .WriteTo.Console()
        .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day);
});
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 8.0.x
    
    - name: Restore dependencies
      run: dotnet restore
    
    - name: Build
      run: dotnet build --configuration Release --no-restore
    
    - name: Test
      run: dotnet test --no-restore --verbosity normal
    
    - name: Publish
      run: dotnet publish -c Release -o ./publish
    
    - name: Deploy to Azure
      uses: azure/webapps-deploy@v2
      with:
        app-name: lawyerconnect-api
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: ./publish
```

---

## ✅ Post-Deployment Checklist

### Verify Deployment
- [ ] API is accessible at production URL
- [ ] Health check endpoint responds: `GET /health`
- [ ] Database connection works
- [ ] Authentication works (login/register)
- [ ] Stripe payments work
- [ ] Webhooks are receiving events
- [ ] CORS is configured correctly
- [ ] HTTPS is enforced
- [ ] Logs are being generated

### Performance Testing
- [ ] Load test with expected traffic
- [ ] Monitor response times
- [ ] Check database query performance
- [ ] Verify caching is working

### Security Testing
- [ ] SSL certificate is valid
- [ ] API keys are not exposed
- [ ] Rate limiting is active
- [ ] CORS is restrictive
- [ ] SQL injection protection
- [ ] XSS protection

---

## 🆘 Troubleshooting

### Common Issues

#### 1. Database Connection Fails
```bash
# Test connection string
dotnet ef database update --connection "YOUR_CONNECTION_STRING"

# Check firewall rules (Azure)
az sql server firewall-rule create --resource-group LawyerConnect --server lawyerconnect-server --name AllowAll --start-ip-address 0.0.0.0 --end-ip-address 255.255.255.255
```

#### 2. Stripe Webhooks Not Working
- Verify webhook URL is publicly accessible
- Check webhook signing secret
- Review Stripe dashboard for failed deliveries
- Check application logs for errors

#### 3. CORS Errors
- Verify allowed origins in `Program.cs`
- Check browser console for specific error
- Ensure `UseCors()` is called before `UseAuthorization()`

#### 4. 500 Internal Server Error
- Check application logs
- Verify all environment variables are set
- Check database migrations are applied
- Review exception details in logs

---

## 📞 Support

For deployment issues:
- Check application logs first
- Review this guide
- Consult cloud provider documentation
- Contact DevOps team

---

**Ready to deploy!** 🚀
