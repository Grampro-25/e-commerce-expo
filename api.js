import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './src/firebase/firebaseConfig';

const API_URL = 'https://fakestoreapi.com/products';

// Fetch products from Firestore (primary source)
export const getProducts = async () => {
    try {
        console.log('📦 Fetching products from Firestore...');
        const productsCol = collection(db, 'products');
        const snapshot = await getDocs(productsCol);

        if (!snapshot.empty) {
            const products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Normalize data for consistency
                title: doc.data().name || doc.data().title,
                name: doc.data().name || doc.data().title,
            }));
            console.log(`✅ Loaded ${products.length} products from Firestore`);
            return products;
        }

        // Fallback to Fake Store API if Firestore is empty
        console.log('⚠️  No products in Firestore, falling back to Fake Store API');
        return await getProductsFromAPI();
    } catch (error) {
        console.error('❌ Firestore error:', error.message);
        console.log('🔄 Falling back to Fake Store API');
        return await getProductsFromAPI();
    }
};

// Fallback: Fetch from Fake Store API
async function getProductsFromAPI() {
    try {
        const response = await axios.get(API_URL);
        console.log(`✅ Loaded ${response.data.length} products from API`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products from API:', error);
        return [];
    }
}

export default { getProducts };
