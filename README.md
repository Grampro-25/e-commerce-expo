# Expo E-commerce Starter

This is a starter React Native + Expo e-commerce app scaffold with:

- Firebase backend (Firestore + Auth) for products and user authentication
- Stripe checkout integration pattern (requires a server endpoint)
- Screens: Home, Product Details, Cart, Checkout, Profile
- React Navigation (stack + tabs)
- Components: `ProductCard`, `CartItem`

Quick start

1. Install dependencies

```powershell
cd "c:/Users/user/Documents/github/e commerce/ecommerce-expo"
npm install
```

2. Configure Firebase
- Create a Firebase project and Firestore.
- Recommended: Copy `src/firebase/firebaseConfig.local.example.js` to `src/firebase/firebaseConfig.local.js` and fill in your project's values. The app will automatically load the local file if present.
- Alternative: Add your Firebase config directly to `src/firebase/firebaseConfig.js` by replacing the placeholder values.

3. Run the app

```powershell
npm run start
# then press 'a' to open Android emulator, or 'i' for iOS simulator (macOS)
```

4. Set up Stripe Server (for payments)

```powershell
cd server
npm install
cp .env.example .env
# Edit .env and add your Stripe secret key from https://dashboard.stripe.com/test/apikeys
npm start
```

Server runs on http://localhost:3000

See `server/README.md` for detailed setup instructions.

## Stripe Checkout

The app includes a complete Stripe integration:
- Express server in `/server` folder handles payment processing
- Checkout flow opens Stripe Checkout page in browser
- Test with card: 4242 4242 4242 4242 (any future date, any CVC)

## Notes

- For production: deploy the server to Railway/Render/Heroku and update `STRIPE_SERVER_URL` in `CheckoutScreen.tsx`
- For native in-app payments: use `@stripe/stripe-react-native` with Expo EAS Build
- Current implementation uses web-based Stripe Checkout (works with Expo Go)
