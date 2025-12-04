import React from 'react';
import { View, Text, Button } from 'react-native';

export default function CheckoutScreen() {
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Checkout</Text>
            <Text style={{ marginVertical: 12 }}>This is a placeholder checkout screen. Wire up Stripe server/client here.</Text>
            <Button title="Proceed to Payment" onPress={() => { /* TODO: call checkout */ }} />
        </View>
    );
}
