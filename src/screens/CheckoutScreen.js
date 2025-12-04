import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import * as WebBrowser from 'expo-web-browser';

// Replace with your real server endpoint that creates a Stripe Checkout Session
const CHECKOUT_ENDPOINT = 'https://your-server.example/create-checkout-session';

export default function CheckoutScreen() {
    const { items, total, clearCart } = useCart();
    const [loading, setLoading] = useState(false);

    async function handleCheckout() {
        setLoading(true);
        try {
            const resp = await fetch(CHECKOUT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items })
            });
            const json = await resp.json();
            if (json.url) {
                await WebBrowser.openBrowserAsync(json.url);
                clearCart();
            } else {
                Alert.alert('Checkout failed', 'Server did not return a checkout URL');
            }
        } catch (err) {
            console.warn(err);
            Alert.alert('Error', 'Failed to contact checkout server');
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></SafeAreaView>;

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Order Summary</Text>
            {items.map(it => (
                <View key={it.id} style={{ marginTop: 8 }}>
                    <Text>{it.name} x {it.qty} — ${(it.price * it.qty).toFixed(2)}</Text>
                </View>
            ))}
            <View style={{ marginTop: 16 }}>
                <Text style={{ fontSize: 16 }}>Total: ${total.toFixed(2)}</Text>
            </View>
            <View style={{ marginTop: 24 }}>
                <Button title="Checkout with Stripe" onPress={handleCheckout} disabled={items.length === 0} />
            </View>
        </SafeAreaView>
    );
}
