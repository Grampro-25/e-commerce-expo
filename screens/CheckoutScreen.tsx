import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useCart } from '../src/context/CartContext';

export default function CheckoutScreen({ navigation }: any) {
    const { items, total, clearCart } = useCart();

    const handleCheckout = () => {
        // TODO: Integrate with Stripe server endpoint
        Alert.alert(
            'Checkout',
            `Total: $${total.toFixed(2)}\n\nStripe integration coming soon!\n\nFor now, this will clear your cart.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Complete Order',
                    onPress: () => {
                        clearCart();
                        navigation.navigate('Home');
                        Alert.alert('Success', 'Order placed successfully!');
                    }
                }
            ]
        );
    };

    if (items.length === 0) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>No items in cart</Text>
                <Button title="Browse Products" onPress={() => navigation.navigate('Home')} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Order Summary</Text>

                {items.map((item: any) => (
                    <View key={item.id} style={styles.item}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDetails}>
                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Text>
                    </View>
                ))}

                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.infoText}>💳 Stripe payment integration coming soon</Text>
                    <Text style={styles.infoText}>🔐 Secure checkout with SSL encryption</Text>
                </View>

                <Button title="Complete Order" onPress={handleCheckout} />
                <View style={styles.spacing} />
                <Button title="Back to Cart" onPress={() => navigation.goBack()} color="#666" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 16 },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
    item: { paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
    itemName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    itemDetails: { fontSize: 14, color: '#666' },
    totalContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderTopWidth: 2, borderColor: '#333', marginTop: 10 },
    totalLabel: { fontSize: 20, fontWeight: '700' },
    totalAmount: { fontSize: 20, fontWeight: '700', color: '#007AFF' },
    info: { backgroundColor: '#f0f0f0', padding: 16, borderRadius: 8, marginVertical: 20 },
    infoText: { fontSize: 14, marginBottom: 8 },
    spacing: { height: 12 },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { fontSize: 16, color: '#666', marginBottom: 20 }
});
