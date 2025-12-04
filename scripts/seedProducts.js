// Script to populate Firestore with sample products
// Run: node scripts/seedProducts.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');
const axios = require('axios');

// Import your Firebase config
// Option 1: Use local config if it exists
let firebaseConfig;
try {
    const localConfig = require('../src/firebase/firebaseConfig.local');
    firebaseConfig = localConfig.firebaseConfig;
} catch (err) {
    // Option 2: Add your config directly here
    firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedProducts() {
    try {
        console.log('🔄 Fetching products from Fake Store API...');
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;

        console.log(`📦 Found ${products.length} products. Adding to Firestore...`);

        let count = 0;
        for (const product of products) {
            const productData = {
                name: product.title,
                price: product.price,
                description: product.description,
                image: product.image,
                category: product.category,
                rating: product.rating?.rate || 0,
                stock: Math.floor(Math.random() * 50) + 10, // Random stock 10-60
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, 'products'), productData);
            count++;
            console.log(`✅ Added: ${productData.name}`);
        }

        console.log(`\n🎉 Successfully added ${count} products to Firestore!`);
        console.log('\n📋 Next steps:');
        console.log('1. Visit Firebase Console: https://console.firebase.google.com');
        console.log('2. Go to Firestore Database');
        console.log('3. You should see the "products" collection with your items');
        console.log('\n💡 Tip: You can now manage products directly in Firebase Console');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding products:', error.message);
        console.log('\n⚠️  Make sure:');
        console.log('1. Firebase config is correct in firebaseConfig.local.js');
        console.log('2. Firestore is enabled in your Firebase project');
        console.log('3. Firestore rules allow write access (for development)');
        process.exit(1);
    }
}

// Check if products already exist
async function checkExisting() {
    try {
        const snapshot = await getDocs(collection(db, 'products'));
        if (!snapshot.empty) {
            console.log(`\n⚠️  Warning: ${snapshot.size} products already exist in Firestore.`);
            console.log('This will add MORE products (duplicates).');
            console.log('\nTo proceed anyway, run: node scripts/seedProducts.js --force');

            if (!process.argv.includes('--force')) {
                console.log('\n💡 To clear existing products first:');
                console.log('   - Go to Firebase Console → Firestore');
                console.log('   - Delete the "products" collection');
                console.log('   - Then run this script again');
                process.exit(0);
            }
        }
        seedProducts();
    } catch (error) {
        // Collection doesn't exist yet, proceed with seeding
        seedProducts();
    }
}

console.log('🚀 Firebase Product Seeder\n');
checkExisting();
