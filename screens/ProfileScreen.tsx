import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { getOrderStats } from '../src/services/orderService';

export default function ProfileScreen({ navigation }: any) {
    const { user, signOut } = useAuth();
    const [stats, setStats] = useState({ totalOrders: 0, totalSpent: 0, completedOrders: 0, averageOrderValue: 0 });
    const [loadingStats, setLoadingStats] = useState(false);

    useEffect(() => {
        if (user) {
            loadStats();
        }
    }, [user]);

    const loadStats = async () => {
        if (!user) return;
        setLoadingStats(true);
        try {
            const orderStats = await getOrderStats(user.uid);
            setStats(orderStats);
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoadingStats(false);
        }
    };

    const handleSignOut = async () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await signOut();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to sign out');
                        }
                    }
                }
            ]
        );
    };

    if (!user) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>👤 Profile</Text>
                    <Text style={styles.subtitle}>You are not signed in</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Login" onPress={() => navigation.navigate('Login')} />
                        <View style={styles.spacing} />
                        <Button title="Create Account" onPress={() => navigation.navigate('Register')} color="#34C759" />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>👤 Profile</Text>

                <View style={styles.infoSection}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{user.email}</Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.label}>User ID</Text>
                    <Text style={styles.valueSmall}>{user.uid}</Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.label}>Account Created</Text>
                    <Text style={styles.value}>
                        {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                    </Text>
                </View>

                <View style={styles.statsSection}>
                    <Text style={styles.statsTitle}>Quick Stats</Text>
                    {loadingStats ? (
                        <ActivityIndicator size="small" color="#007AFF" />
                    ) : (
                        <>
                            <Text style={styles.statsText}>🛒 Total Orders: {stats.totalOrders}</Text>
                            <Text style={styles.statsText}>💰 Total Spent: ${stats.totalSpent.toFixed(2)}</Text>
                            <Text style={styles.statsText}>✅ Completed: {stats.completedOrders}</Text>
                            {stats.totalOrders > 0 && (
                                <Text style={styles.statsText}>📊 Avg Order: ${stats.averageOrderValue.toFixed(2)}</Text>
                            )}
                        </>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="Order History" onPress={() => navigation.navigate('OrderHistory')} color="#007AFF" />
                    <View style={styles.spacing} />
                    <Button title="Edit Profile" onPress={() => Alert.alert('Coming Soon', 'Profile editing feature coming soon!')} color="#5856D6" />
                    <View style={styles.spacing} />
                    <Button title="Sign Out" onPress={handleSignOut} color="#FF3B30" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 20 },
    title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
    infoSection: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 8, marginBottom: 12 },
    label: { fontSize: 12, color: '#666', marginBottom: 4, textTransform: 'uppercase' },
    value: { fontSize: 16, fontWeight: '600' },
    valueSmall: { fontSize: 12, color: '#666', fontFamily: 'monospace' },
    statsSection: { backgroundColor: '#E8F5E9', padding: 16, borderRadius: 8, marginVertical: 20 },
    statsTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
    statsText: { fontSize: 14, marginBottom: 8 },
    buttonContainer: { marginTop: 20 },
    spacing: { height: 12 }
});
