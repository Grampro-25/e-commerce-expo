# Firebase Products Setup

This guide shows how to switch from Fake Store API to your own Firebase Firestore products.

## Step 1: Configure Firebase

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Add your config to `src/firebase/firebaseConfig.local.js`:

```javascript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 2: Set Firestore Rules (Development)

In Firebase Console → Firestore → Rules, use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if true; // Change to restrict in production
    }
  }
}
```

## Step 3: Seed Products

Run the seeding script to populate Firestore with sample products:

```powershell
node scripts/seedProducts.js
```

This fetches 20 products from Fake Store API and adds them to your Firestore `products` collection.

## Step 4: Test

Restart your app. It will now fetch products from Firestore!

```powershell
npm start
```

## Managing Products

### List all products
```powershell
node scripts/manageProducts.js list
```

### Add a product
```powershell
node scripts/manageProducts.js add "New Product" 49.99 "Description" "https://image-url.com" "category"
```

### Delete a product
```powershell
node scripts/manageProducts.js delete <product-id>
```

## Firebase Console

You can also manage products directly in the Firebase Console:
- Go to Firestore Database
- Select the `products` collection
- Add, edit, or delete documents

## Production Notes

- Update Firestore security rules before going live
- Consider adding pagination for large catalogs
- Add product search and filtering
- Implement admin dashboard for easier management
