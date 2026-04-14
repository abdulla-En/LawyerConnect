# Stripe Setup Guide for LawyerConnect

## 🎯 Quick Setup (5 Minutes)

### Step 1: Get Stripe Account
1. Go to https://dashboard.stripe.com/register
2. Sign up for a free account (no credit card needed)
3. Verify your email

### Step 2: Get Test API Keys
1. Go to https://dashboard.stripe.com/test/apikeys
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`) - Used in frontend
   - **Secret key** (starts with `sk_test_`) - Used in backend
3. Click "Reveal test key" for the Secret key
4. Copy both keys

### Step 3: Update Backend Configuration

Open `appsettings.json` and replace the placeholder values:

```json
"Stripe": {
  "SecretKey": "sk_test_YOUR_ACTUAL_KEY_HERE",
  "PublishableKey": "pk_test_YOUR_ACTUAL_KEY_HERE",
  "WebhookSecret": "whsec_YOUR_WEBHOOK_SECRET_HERE",
  "Currency": "usd"
}
```

**Important**: 
- Keep `SecretKey` private - never commit to git
- `PublishableKey` is safe to use in frontend
- `WebhookSecret` is optional for local testing

### Step 4: Update Frontend Configuration

In your frontend `.env.local` file:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
```

---

## 🔐 Security Best Practices

### For Development
1. Use test mode keys (they start with `sk_test_` and `pk_test_`)
2. Add `appsettings.json` to `.gitignore` if it contains real keys
3. Use environment variables for sensitive data

### For Production
1. **Never** commit real API keys to git
2. Use environment variables:
   ```bash
   Stripe__SecretKey=sk_live_YOUR_PRODUCTION_KEY
   Stripe__PublishableKey=pk_live_YOUR_PRODUCTION_KEY
   Stripe__WebhookSecret=whsec_YOUR_PRODUCTION_WEBHOOK_SECRET
   ```
3. Switch to live mode keys from https://dashboard.stripe.com/apikeys

---

## 🧪 Testing Without Webhook Secret

For local development, you can test payments without webhooks:

1. **Manual Payment Confirmation**: After Stripe checkout, manually call:
   ```
   POST /api/payments/confirm
   {
     "sessionId": 1
   }
   ```

2. **Test Cards**: Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiry date (e.g., 12/34)
   - Any 3-digit CVC

---

## 🌐 Setting Up Webhooks (Optional for Local Testing)

### Option 1: Stripe CLI (Recommended for Local)

1. **Install Stripe CLI**:
   ```bash
   # Windows (using Scoop)
   scoop install stripe
   
   # Or download from: https://github.com/stripe/stripe-cli/releases
   ```

2. **Login to Stripe**:
   ```bash
   stripe login
   ```

3. **Forward webhooks to local server**:
   ```bash
   stripe listen --forward-to https://localhost:5001/api/payments/webhook
   ```

4. **Copy the webhook signing secret** (starts with `whsec_`) and add to `appsettings.json`

### Option 2: ngrok (For Public URL)

1. **Install ngrok**: https://ngrok.com/download

2. **Start your API**:
   ```bash
   dotnet run
   ```

3. **Create tunnel**:
   ```bash
   ngrok http https://localhost:5001
   ```

4. **Add webhook in Stripe Dashboard**:
   - Go to https://dashboard.stripe.com/test/webhooks
   - Click "Add endpoint"
   - URL: `https://YOUR_NGROK_URL.ngrok.io/api/payments/webhook`
   - Events: Select these:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - Copy the signing secret to `appsettings.json`

---

## 🧪 Testing Payment Flow

### 1. Create a Booking
```http
POST https://localhost:5001/api/bookings
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "lawyerId": 1,
  "bookingDate": "2024-03-15T10:00:00Z",
  "description": "Legal consultation"
}
```

### 2. Create Payment Session
```http
POST https://localhost:5001/api/payments/create-session
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "bookingId": 1,
  "amount": 150.00
}
```

Response will include `checkoutUrl` - open this in browser.

### 3. Complete Payment
- Use test card: `4242 4242 4242 4242`
- Any future expiry (e.g., 12/34)
- Any 3-digit CVC
- Any ZIP code

### 4. Verify Payment
```http
GET https://localhost:5001/api/payments/sessions/1
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📊 Stripe Dashboard

Monitor your test payments:
- **Payments**: https://dashboard.stripe.com/test/payments
- **Customers**: https://dashboard.stripe.com/test/customers
- **Logs**: https://dashboard.stripe.com/test/logs

---

## 🐛 Troubleshooting

### Error: "No API key provided"
- Check `appsettings.json` has correct `Stripe:SecretKey`
- Restart your API after updating config

### Error: "Invalid API Key"
- Make sure you're using test keys (start with `sk_test_`)
- Keys are case-sensitive
- No extra spaces in the key

### Webhook Not Working
- For local testing, webhooks are optional
- Use Stripe CLI or ngrok for webhook testing
- Check webhook secret matches in `appsettings.json`

### Payment Not Confirming
- Check Stripe Dashboard logs
- Verify booking exists and is in "Pending" status
- Check API logs for errors

---

## 💰 Pricing

- **Test Mode**: Completely free, unlimited transactions
- **Live Mode**: 
  - 2.9% + $0.30 per successful card charge
  - No monthly fees
  - No setup fees

---

## 📚 Additional Resources

- **Stripe Documentation**: https://stripe.com/docs
- **Test Cards**: https://stripe.com/docs/testing
- **Webhooks Guide**: https://stripe.com/docs/webhooks
- **API Reference**: https://stripe.com/docs/api

---

## ✅ Checklist

- [ ] Created Stripe account
- [ ] Got test API keys
- [ ] Updated `appsettings.json` with Secret Key
- [ ] Updated frontend `.env.local` with Publishable Key
- [ ] Tested payment with test card `4242 4242 4242 4242`
- [ ] Verified payment in Stripe Dashboard
- [ ] (Optional) Set up webhooks with Stripe CLI or ngrok

---

**Status**: Ready to test payments! 🚀
