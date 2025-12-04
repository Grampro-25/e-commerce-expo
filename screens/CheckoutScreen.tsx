import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, Linking, TouchableOpacity, Image } from 'react-native';
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
                <Text style={styles.emptyIcon}>🛒</Text>
                <Text style={styles.emptyText}>Your cart is empty</Text>
                <Text style={styles.emptySubtext}>Add some products to get started</Text>
                <TouchableOpacity
                    style={styles.browseButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.browseButtonText}>Browse Products</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const subtotal = total;
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 100 ? 0 : 9.99;
    const finalTotal = subtotal + tax + shipping;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Order Items */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Items</Text>
                    {items.map((item: any) => (
                        <View key={item.id} style={styles.orderItem}>
                            {item.image && (
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.itemImage}
                                    resizeMode="contain"
                                />
                            )}
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                                <Text style={styles.itemQty}>Qty: {item.qty}</Text>
                            </View>
                            <Text style={styles.itemPrice}>${(item.qty * item.price).toFixed(2)}</Text>
                        </View>
                    ))}
                </View>

                {/* Payment Summary */}
                <View style={styles.summaryCard}>
                    <Text style={styles.sectionTitle}>Payment Summary</Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tax (8%)</Text>
                        <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={[styles.summaryValue, shipping === 0 && styles.freeShipping]}>
                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                        </Text>
                    </View>

                    {subtotal < 100 && (
                        <Text style={styles.freeShippingNote}>
                            💡 Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                        </Text>
                    )}

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalAmount}>${finalTotal.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Payment Info */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>🔒 Secure Checkout</Text>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoBullet}>•</Text>
                        <Text style={styles.infoText}>Powered by Stripe - Industry standard encryption</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoBullet}>•</Text>
                        <Text style={styles.infoText}>Your payment info is never stored on our servers</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoBullet}>•</Text>
                        <Text style={styles.infoText}>Test card: 4242 4242 4242 4242 (any future date & CVC)</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.loadingText}>Processing your order...</Text>
                    </View>
                ) : (
                    <>
                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={handleCheckout}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.checkoutButtonText}>
                                💳 Complete Purchase - ${finalTotal.toFixed(2)}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.backButtonText}>← Back to Cart</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    content: {
        padding: 16,
        paddingBottom: 40
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
        color: '#333'
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    itemImage: {
        width: 60,
        height: 60,
        marginRight: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4
    },
    itemQty: {
        fontSize: 13,
        color: '#666',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#007AFF',
    },
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 15,
        color: '#666',
    },
    summaryValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    freeShipping: {
        color: '#34C759',
        fontWeight: '700',
    },
    freeShippingNote: {
        fontSize: 13,
        color: '#FF9500',
        marginBottom: 12,
        fontStyle: 'italic',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333'
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: '700',
        color: '#007AFF'
    },
    infoCard: {
        backgroundColor: '#E3F2FD',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#007AFF',
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    infoBullet: {
        fontSize: 14,
        color: '#007AFF',
        marginRight: 8,
    },
    infoText: {
        fontSize: 13,
        color: '#555',
        flex: 1,
        lineHeight: 18,
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 15,
        color: '#666',
    },
    checkoutButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '700',
    },
    backButton: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    backButtonText: {
        color: '#666',
        fontSize: 15,
        fontWeight: '600',
    },
    browseButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        marginTop: 20,
    },
    browseButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8
    },
    emptySubtext: {
        fontSize: 15,
        color: '#999',
    },
});
