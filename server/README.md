# Stripe Payment Server

Express server for handling Stripe payments in the e-commerce app.

## Setup

1. **Install dependencies:**
```powershell
cd server
npm install
```

2. **Get Stripe API Keys:**
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy your "Secret key" (starts with `sk_test_`)

3. **Configure environment:**
```powershell
cp .env.example .env
```
Then edit `.env` and add your Stripe secret key.

4. **Start the server:**
```powershell
npm start
```

Server will run on http://localhost:3000

## Endpoints

- `GET /` - Health check
- `POST /create-checkout-session` - Create Stripe checkout session
- `GET /verify-session/:sessionId` - Verify payment status

## Testing with Stripe

Use these test card numbers:
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002

Any future expiry date and any 3-digit CVC.

## Deploy (Optional)

Deploy to Railway, Render, or Heroku:
```bash
# Railway
railway up

# Render
# Connect your GitHub repo and deploy

# Update CLIENT_URL in .env to your deployed Expo app URL
```
