import React from 'react';
import { View, Text, Image } from 'react-native';

export default function CartItem({ item }: any) {
    return (
        <View style={{ flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
            {item.image ? <Image source={{ uri: item.image }} style={{ width: 64, height: 64, marginRight: 12 }} /> : <View style={{ width: 64, height: 64, backgroundColor: '#ddd', marginRight: 12 }} />}
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ marginTop: 4 }}>${item.price} x {item.qty}</Text>
            </View>
        </View>
    );
}
