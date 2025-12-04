import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert, ActivityIndicator, Linking } from 'react-native';
import { useCart } from '../src/context/CartContext';
import { useAuth } from '../src/context/AuthContext';
import { createOrder } from '../src/services/orderService';

// Update this to your server URL when running locally or deployed
const STRIPE_SERVER_URL = 'http://localhost:3000';

export default function CheckoutScreen({ navigation }: any) {
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Call Stripe server to create checkout session
            const response = await fetch(`${STRIPE_SERVER_URL}/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            });

            const data = await response.json();

            if (data.url) {
                // Save order to Firestore before opening Stripe checkout
                if (user) {
                    try {
                        await createOrder({
                            userId: user.uid,
                            items: items.map(item => ({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                qty: item.qty,
                                image: item.image
                            })),
                            total,
                            status: 'pending',
                            paymentMethod: 'stripe',
                            stripeSessionId: data.sessionId,
                            createdAt: new Date().toISOString()
                        });
                    } catch (orderError) {
                        console.warn('Failed to save order:', orderError);
                    }
                }

                // Open Stripe Checkout page in browser
                const supported = await Linking.canOpenURL(data.url);
                if (supported) {
                    await Linking.openURL(data.url);
                    clearCart();
                    navigation.navigate('Home');
                    Alert.alert('Success', 'Checkout opened! Complete payment in browser.');
                } else {
                    Alert.alert('Error', 'Cannot open checkout URL');
                }
            } else {
                Alert.alert('Error', data.error || 'Failed to create checkout session');
            }
        } catch (error: any) {
            console.error('Checkout error:', error);
            Alert.alert(
                'Connection Error',
                'Cannot connect to payment server. Make sure the server is running at ' + STRIPE_SERVER_URL,
                [
                    { text: 'OK' },
                    {
                        text: 'Use Mock Checkout',
                        onPress: async () => {
                            // Save order in mock mode
                            if (user) {
                                try {
                                    await createOrder({
                                        userId: user.uid,
                                        items: items.map(item => ({
                                            id: item.id,
                                            name: item.name,
                                            price: item.price,
                                            qty: item.qty,
                                            image: item.image
                                        })),
                                        total,
                                        status: 'completed',
                                        paymentMethod: 'mock',
                                        createdAt: new Date().toISOString()
                                    });
                                } catch (orderError) {
                                    console.warn('Failed to save order:', orderError);
                                }
                            }
                            clearCart();
                            navigation.navigate('Home');
                            Alert.alert('Mock Success', 'Order placed (test mode)');
                        }
                    }
                ]
            );
        } finally {
            setLoading(false);
        }
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
                    <Text style={styles.infoText}>💳 Secure payment with Stripe</Text>
                    <Text style={styles.infoText}>🔐 SSL encrypted checkout</Text>
                    <Text style={styles.infoText}>💡 Test card: 4242 4242 4242 4242</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#007AFF" />
                ) : (
                    <>
                        <Button title="Pay with Stripe" onPress={handleCheckout} disabled={loading} />
                        <View style={styles.spacing} />
                        <Button title="Back to Cart" onPress={() => navigation.goBack()} color="#666" />
                    </>
                )}
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
