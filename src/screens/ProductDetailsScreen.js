import React from 'react';
import { View, Text, Image, Button, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';

export default function ProductDetailsScreen({ route }) {
    const { product } = route.params;
    const { addToCart } = useCart();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {product.image && <Image source={{ uri: product.image }} style={styles.image} />}
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <Text style={styles.desc}>{product.description || 'No description available.'}</Text>
                <Button title="Add to Cart" onPress={() => addToCart(product, 1)} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, alignItems: 'center' },
    image: { width: 240, height: 240, borderRadius: 8, marginBottom: 16 },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
    price: { fontSize: 18, marginBottom: 12 },
    desc: { marginBottom: 20, color: '#444' }
});
