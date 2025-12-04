import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getProducts } from '../api';

export default function HomeScreen({ navigation }: any) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function fetchProducts() {
            const data = await getProducts();
            if (mounted) {
                setProducts(data || []);
                setLoading(false);
            }
        }
        fetchProducts();
        return () => { mounted = false; };
    }, []);

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigation?.navigate?.('Product', { product: item })}>
            <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.image }} style={{ width: 80, height: 80, marginRight: 12, resizeMode: 'contain' }} />
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
                    <Text style={{ marginTop: 6 }}>${item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>;

    return (
        <FlatList
            data={products}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={<View style={{ padding: 20 }}><Text>No products found.</Text></View>}
        />
    );
}
