// Admin script to manage products in Firestore
// Usage:
//   node scripts/manageProducts.js list
//   node scripts/manageProducts.js add "Product Name" 29.99 "Description" "image-url"
//   node scripts/manageProducts.js delete <product-id>

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } = require('firebase/firestore');

// Import Firebase config
let firebaseConfig;
try {
    const localConfig = require('../src/firebase/firebaseConfig.local');
    firebaseConfig = localConfig.firebaseConfig;
} catch (err) {
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

async function listProducts() {
    const snapshot = await getDocs(collection(db, 'products'));
    if (snapshot.empty) {
        console.log('📦 No products found.');
        return;
    }

    console.log(`\n📦 Found ${snapshot.size} products:\n`);
    snapshot.forEach(doc => {
        const data = doc.data();
        console.log(`ID: ${doc.id}`);
        console.log(`Name: ${data.name}`);
        console.log(`Price: $${data.price}`);
        console.log(`Category: ${data.category || 'N/A'}`);
        console.log('---');
    });
}

async function addProduct(name, price, description, image, category = 'general') {
    const productData = {
        name,
        price: parseFloat(price),
        description,
        image,
        category,
        stock: 50,
        createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'products'), productData);
    console.log(`✅ Product added with ID: ${docRef.id}`);
}

async function deleteProduct(productId) {
    await deleteDoc(doc(db, 'products', productId));
    console.log(`✅ Product ${productId} deleted`);
}

// CLI Handler
const command = process.argv[2];

(async () => {
    try {
        switch (command) {
            case 'list':
                await listProducts();
                break;

            case 'add':
                const [, , , name, price, description, image, category] = process.argv;
                if (!name || !price) {
                    console.log('Usage: node manageProducts.js add "Name" 29.99 "Description" "image-url" "category"');
                    process.exit(1);
                }
                await addProduct(name, price, description || '', image || '', category);
                break;

            case 'delete':
                const productId = process.argv[3];
                if (!productId) {
                    console.log('Usage: node manageProducts.js delete <product-id>');
                    process.exit(1);
                }
                await deleteProduct(productId);
                break;

            default:
                console.log('🛠️  Product Management Tool\n');
                console.log('Commands:');
                console.log('  list                           - List all products');
                console.log('  add <name> <price> ...         - Add a new product');
                console.log('  delete <id>                    - Delete a product');
        }
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
})();
