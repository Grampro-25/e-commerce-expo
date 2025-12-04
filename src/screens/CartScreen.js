import React from 'react';
import { SafeAreaView, FlatList, View, Text, Button } from 'react-native';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function CartScreen({ navigation }) {
    const { items, removeFromCart, updateQty, total } = useCart();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={items}
                keyExtractor={i => i.id}
                renderItem={({ item }) => (
                    <CartItem item={item} onRemove={removeFromCart} onChangeQty={updateQty} />
                )}
                ListEmptyComponent={<View style={{ padding: 20 }}><Text>Your cart is empty.</Text></View>}
            />
            <View style={{ padding: 16, borderTopWidth: 1, borderColor: '#eee' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>Total: ${total.toFixed(2)}</Text>
                <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} disabled={items.length === 0} />
            </View>
        </SafeAreaView>
    );
}
