import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useCart } from '../src/context/CartContext';

export default function CartScreen({ navigation }: any) {
    const { items, removeFromCart, updateQty, total } = useCart();

    const renderItem = ({ item }: any) => (
        <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price} x {item.qty}</Text>
                <Text style={styles.itemTotal}>${(item.price * item.qty).toFixed(2)}</Text>
            </View>
            <View style={styles.controls}>
                <View style={styles.qtyControls}>
                    <Button title="-" onPress={() => updateQty(item.id, Math.max(1, item.qty - 1))} />
                    <Text style={styles.qty}>{item.qty}</Text>
                    <Button title="+" onPress={() => updateQty(item.id, item.qty + 1)} />
                </View>
                <Button title="Remove" onPress={() => removeFromCart(item.id)} color="#ff3b30" />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(i: any) => i.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>Your cart is empty</Text>
                        <Button title="Browse Products" onPress={() => navigation.navigate('Home')} />
                    </View>
                }
            />
            {items.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                    <Button
                        title="Proceed to Checkout"
                        onPress={() => navigation.navigate('Checkout')}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    cartItem: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
    itemInfo: { marginBottom: 12 },
    itemName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    itemPrice: { fontSize: 14, color: '#666' },
    itemTotal: { fontSize: 16, fontWeight: '600', marginTop: 4 },
    controls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    qty: { fontSize: 16, minWidth: 30, textAlign: 'center' },
    footer: { padding: 16, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#f9f9f9' },
    total: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
    empty: { padding: 40, alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#666', marginBottom: 20 }
});
