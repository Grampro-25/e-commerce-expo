import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { getOrderStats } from '../src/services/orderService';
import { ProfileStatsSkeleton } from '../components/Skeleton';

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
                <ScrollView contentContainerStyle={styles.centerContent}>
                    <Text style={styles.notSignedInIcon}>👤</Text>
                    <Text style={styles.notSignedInTitle}>Welcome!</Text>
                    <Text style={styles.notSignedInSubtitle}>Sign in to view your profile and orders</Text>

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.primaryButtonText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.secondaryButtonText}>Create Account</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header Card */}
                <View style={styles.headerCard}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarText}>
                            {user.email?.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.userName}>{user.email}</Text>
                    <Text style={styles.memberSince}>
                        Member since {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                    </Text>
                </View>

                {/* Stats Cards */}
                <Text style={styles.sectionTitle}>Overview</Text>
                {loadingStats ? (
                    <ProfileStatsSkeleton />
                ) : (
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{stats.totalOrders}</Text>
                            <Text style={styles.statLabel}>Orders</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>${stats.totalSpent.toFixed(0)}</Text>
                            <Text style={styles.statLabel}>Total Spent</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{stats.completedOrders}</Text>
                            <Text style={styles.statLabel}>Completed</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>${stats.averageOrderValue.toFixed(0)}</Text>
                            <Text style={styles.statLabel}>Avg Order</Text>
                        </View>
                    </View>
                )}

                {/* Action Buttons */}
                <Text style={styles.sectionTitle}>Actions</Text>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('OrderHistory')}
                >
                    <Text style={styles.actionIcon}>📦</Text>
                    <Text style={styles.actionText}>Order History</Text>
                    <Text style={styles.actionChevron}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert('Coming Soon', 'Profile editing feature coming soon!')}
                >
                    <Text style={styles.actionIcon}>✏️</Text>
                    <Text style={styles.actionText}>Edit Profile</Text>
                    <Text style={styles.actionChevron}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert('Coming Soon', 'Settings feature coming soon!')}
                >
                    <Text style={styles.actionIcon}>⚙️</Text>
                    <Text style={styles.actionText}>Settings</Text>
                    <Text style={styles.actionChevron}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.signOutButton]}
                    onPress={handleSignOut}
                >
                    <Text style={styles.actionIcon}>🚪</Text>
                    <Text style={[styles.actionText, styles.signOutText]}>Sign Out</Text>
                    <Text style={styles.actionChevron}>›</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
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
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    notSignedInIcon: {
        fontSize: 80,
        marginBottom: 20,
    },
    notSignedInTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    notSignedInSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
    },
    primaryButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        paddingHorizontal: 48,
        borderRadius: 12,
        marginBottom: 12,
        width: '100%',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: 'white',
        paddingVertical: 14,
        paddingHorizontal: 48,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007AFF',
        width: '100%',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#007AFF',
        fontSize: 17,
        fontWeight: '600',
    },
    headerCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: '700',
        color: 'white',
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    memberSince: {
        fontSize: 14,
        color: '#999',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
        marginTop: 8,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        width: '47%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    statValue: {
        fontSize: 28,
        fontWeight: '700',
        color: '#007AFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
    },
    actionButton: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    actionIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    actionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    actionChevron: {
        fontSize: 24,
        color: '#ccc',
    },
    signOutButton: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    signOutText: {
        color: '#FF3B30',
    },
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
