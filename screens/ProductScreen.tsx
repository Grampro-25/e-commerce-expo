import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import ProductCard from '../components/ProductCard';

export default function ProductScreen({ route, navigation }: any) {
    const product = route?.params?.product;
    if (!product) return <View><Text>Product not found</Text></View>;

    return (
        <View style={{ flex: 1, padding: 16 }}>
            {product.image ? <Image source={{ uri: product.image }} style={{ width: 200, height: 200 }} /> : null}
            <Text style={{ fontSize: 20, fontWeight: '700' }}>{product.name}</Text>
            <Text style={{ marginVertical: 8 }}>${product.price}</Text>
            <Button title="Add to Cart" onPress={() => { /* TODO: add to cart */ }} />
        </View>
    );
}
