import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import ProductCard from '../components/ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function HomeScreen({ navigation }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const col = collection(db, 'products');
                const snap = await getDocs(col);
                const prods = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                if (mounted) setProducts(prods);
            } catch (err) {
                console.warn('Firestore read failed, using sample products', err);
                if (mounted) setProducts(sampleProducts);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => mounted = false;
    }, []);

    if (loading) return <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></SafeAreaView>;

    if (products.length === 0) return <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No products found.</Text></SafeAreaView>;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ProductCard product={item} onPress={() => navigation.navigate('ProductDetails', { product: item })} />
                )}
            />
        </SafeAreaView>
    );
}

const sampleProducts = [
    { id: 'p1', name: 'Sample Sneakers', price: 79.99, image: 'https://picsum.photos/200' },
    { id: 'p2', name: 'Blue T-Shirt', price: 24.5, image: 'https://picsum.photos/201' }
];
