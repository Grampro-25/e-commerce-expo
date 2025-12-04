import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Default placeholder config — replace with your project values
let firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Optional: load local config if the developer created `firebaseConfig.local.js`
// Copy `firebaseConfig.local.example.js` to `firebaseConfig.local.js` and fill values.
try {
    // Use require so missing file doesn't break Metro at build-time (caught by try/catch)
    // eslint-disable-next-line global-require
    const local = require('./firebaseConfig.local');
    if (local && local.firebaseConfig) {
        firebaseConfig = { ...firebaseConfig, ...local.firebaseConfig };
    }
} catch (err) {
    // No local config found — continue with placeholders
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
