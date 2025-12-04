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

Stripe Checkout

This starter calls a backend endpoint to create a Stripe Checkout Session:

- Implement an HTTPS endpoint `/create-checkout-session` on your server that creates a Checkout Session with Stripe and returns `{ url: "https://checkout.stripe.com/..." }`.
- In `src/screens/CheckoutScreen.js` replace `CHECKOUT_ENDPOINT` with your endpoint URL.

Notes

- For production and native Stripe integration in React Native, use `@stripe/stripe-react-native` and follow Stripe + Expo EAS Build instructions.
- This scaffold aims to be runnable with Expo without native Stripe modules; the checkout flow opens a web checkout page.
