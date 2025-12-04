import React from 'react';
import { View, Text, Image } from 'react-native';

export default function ProductCard({ product }: any) {
    return (
        <View style={{ flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
            {product.image ? <Image source={{ uri: product.image }} style={{ width: 72, height: 72, marginRight: 12 }} /> : <View style={{ width: 72, height: 72, backgroundColor: '#ddd', marginRight: 12 }} />}
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{product.name}</Text>
                <Text style={{ marginTop: 4 }}>${product.price}</Text>
            </View>
        </View>
    );
}
