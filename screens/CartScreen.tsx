import React from 'react';
import { View, Text, FlatList } from 'react-native';
import CartItem from '../components/CartItem';

const sampleCart = [];

export default function CartScreen() {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={sampleCart}
                keyExtractor={(i: any) => i.id}
                renderItem={({ item }) => <CartItem item={item} />}
                ListEmptyComponent={<View style={{ padding: 20 }}><Text>Your cart is empty.</Text></View>}
            />
        </View>
    );
}
