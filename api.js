import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './src/firebase/firebaseConfig';

const API_URL = 'https://fakestoreapi.com/products';

// Fetch products from Firestore (primary source) with optional category filter
export const getProducts = async (category = null) => {
    try {
        console.log('📦 Fetching products from Firestore...');
        const productsCol = collection(db, 'products');
        const snapshot = await getDocs(productsCol);

        if (!snapshot.empty) {
            let products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Normalize data for consistency
                title: doc.data().name || doc.data().title,
                name: doc.data().name || doc.data().title,
            }));

            // Filter by category if specified
            if (category && category !== 'all') {
                products = products.filter(p => p.category === category);
            }

            console.log(`✅ Loaded ${products.length} products from Firestore${category ? ` (category: ${category})` : ''}`);
            return products;
        }

        // Fallback to Fake Store API if Firestore is empty
        console.log('⚠️  No products in Firestore, falling back to Fake Store API');
        return await getProductsFromAPI(category);
    } catch (error) {
        console.error('❌ Firestore error:', error.message);
        console.log('🔄 Falling back to Fake Store API');
        return await getProductsFromAPI(category);
    }
};

// Get unique categories from products
export const getCategories = async () => {
    try {
        const products = await getProducts();
        const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
        console.log(`✅ Found ${categories.length} categories:`, categories);
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

// Fallback: Fetch from Fake Store API
async function getProductsFromAPI(category = null) {
    try {
        const url = category && category !== 'all'
            ? `${API_URL}/category/${category}`
            : API_URL;
        const response = await axios.get(url);
        console.log(`✅ Loaded ${response.data.length} products from API${category ? ` (category: ${category})` : ''}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products from API:', error);
        return [];
    }
}

export default { getProducts, getCategories };
