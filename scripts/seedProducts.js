// Script to populate Firestore with realistic shopping products
// Run: npm run seed-products

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } = require('firebase/firestore');
const fakeProducts = require('../src/data/fakeProducts').fakeProducts;

// Import your Firebase config
// Option 1: Use local config if it exists
let firebaseConfig;
try {
    const localConfig = require('../src/firebase/firebaseConfig.local');
    firebaseConfig = localConfig.firebaseConfig;
} catch (err) {
    // Option 2: Add your config directly here
    console.error('⚠️  No Firebase config found. Please create src/firebase/firebaseConfig.local.js');
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

async function clearExistingProducts() {
    try {
        console.log('🗑️  Clearing existing products...');
        const snapshot = await getDocs(collection(db, 'products'));
        
        if (snapshot.empty) {
            console.log('✅ No existing products to clear');
            return;
        }

        let deletedCount = 0;
        for (const docSnapshot of snapshot.docs) {
            await deleteDoc(doc(db, 'products', docSnapshot.id));
            deletedCount++;
        }
        
        console.log(`✅ Cleared ${deletedCount} existing products`);
    } catch (error) {
        console.error('❌ Error clearing products:', error);
        throw error;
    }
}

async function seedProducts() {
    try {
        console.log('🛍️  Starting product seeding with realistic shopping data...\n');

        // Clear existing products first
        await clearExistingProducts();

        console.log(`\n📦 Adding ${fakeProducts.length} realistic products to Firestore...`);

        let count = 0;
        const categories = {};

        for (const product of fakeProducts) {
            const productData = {
                ...product,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            await addDoc(collection(db, 'products'), productData);
            count++;
            
            // Track categories
            if (!categories[productData.category]) {
                categories[productData.category] = 0;
            }
            categories[productData.category]++;
            
            // Show progress
            if (count % 5 === 0) {
                console.log(`   ✓ ${count}/${fakeProducts.length} products added...`);
            }
        }

        console.log(`\n🎉 Successfully added ${count} products to Firestore!\n`);
        
        // Show category breakdown
        console.log('📊 Category Breakdown:');
        Object.entries(categories).forEach(([cat, num]) => {
            console.log(`   ${cat}: ${num} products`);
        });

        // Show featured products count
        const featuredCount = fakeProducts.filter(p => p.isFeatured).length;
        const onSaleCount = fakeProducts.filter(p => p.originalPrice).length;
        const lowStockCount = fakeProducts.filter(p => p.stock < 10).length;

        console.log(`\n✨ Special Items:`);
        console.log(`   Featured: ${featuredCount} products`);
        console.log(`   On Sale: ${onSaleCount} products`);
        console.log(`   Low Stock: ${lowStockCount} products`);

        console.log('\n📋 Next steps:');
        console.log('1. Restart your app to see the new products');
        console.log('2. Visit Firebase Console: https://console.firebase.google.com');
        console.log('3. Try searching, filtering, and viewing product details');
        console.log('\n💡 Products include: Electronics, Fashion, Jewelry & more!');

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

// Main execution
async function main() {
    try {
        console.log('╔══════════════════════════════════════════╗');
        console.log('║  E-Commerce Product Seeder 🛍️            ║');
        console.log('╚══════════════════════════════════════════╝\n');

        // Always clear and reseed for clean data
        await seedProducts();
    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
}

// Run the script
main();
