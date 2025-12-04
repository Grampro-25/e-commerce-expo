import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { getUserOrders, Order } from '../src/services/orderService';

export default function OrderHistoryScreen({ navigation }: any) {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const userOrders = await getUserOrders(user.uid);
            setOrders(userOrders);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return '#34C759';
            case 'pending': return '#FF9500';
            case 'cancelled': return '#FF3B30';
            default: return '#666';
        }
    };

    const getStatusEmoji = (status: string) => {
        switch (status) {
            case 'completed': return '✅';
            case 'pending': return '⏳';
            case 'cancelled': return '❌';
            default: return '📦';
        }
    };

    const renderOrder = ({ item }: { item: Order }) => (
        <TouchableOpacity style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <View>
                    <Text style={styles.orderId}>Order #{item.id?.substring(0, 8).toUpperCase()}</Text>
                    <Text style={styles.orderDate}>
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {getStatusEmoji(item.status)} {item.status.toUpperCase()}
                    </Text>
                </View>
            </View>

            <View style={styles.orderItems}>
                {item.items.map((product, index) => (
                    <Text key={index} style={styles.itemText}>
                        {product.qty}x {product.name} - ${(product.price * product.qty).toFixed(2)}
                    </Text>
                ))}
            </View>

            <View style={styles.orderFooter}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
            </View>

            <Text style={styles.paymentMethod}>
                💳 {item.paymentMethod === 'stripe' ? 'Stripe Payment' : 'Mock Payment'}
            </Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading orders...</Text>
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.centered}>
                <Text style={styles.emptyTitle}>🔒 Not Signed In</Text>
                <Text style={styles.emptyText}>Please sign in to view your orders</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.emptyTitle}>📦 No Orders Yet</Text>
                <Text style={styles.emptyText}>Start shopping to see your orders here</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Browse Products</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id || ''}
                renderItem={renderOrder}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    loadingText: { marginTop: 12, color: '#666' },
    emptyTitle: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
    emptyText: { fontSize: 16, color: '#666', marginBottom: 24, textAlign: 'center' },
    button: { backgroundColor: '#007AFF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
    buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
    listContent: { padding: 16 },
    orderCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
    orderId: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    orderDate: { fontSize: 12, color: '#666' },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
    statusText: { fontSize: 12, fontWeight: '600' },
    orderItems: { marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    itemText: { fontSize: 14, color: '#333', marginBottom: 4 },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    totalLabel: { fontSize: 16, fontWeight: '600' },
    totalAmount: { fontSize: 20, fontWeight: '700', color: '#007AFF' },
    paymentMethod: { fontSize: 12, color: '#666' }
});
