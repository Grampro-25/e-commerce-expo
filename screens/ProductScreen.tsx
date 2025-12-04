import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useCart } from '../src/context/CartContext';

export default function ProductScreen({ route, navigation }: any) {
    const product = route?.params?.product;
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    if (!product) return <View style={styles.container}><Text>Product not found</Text></View>;

    const handleAddToCart = () => {
        // Normalize product data for cart
        const cartProduct = {
            id: product.id?.toString() || Math.random().toString(),
            name: product.title || product.name,
            price: product.price,
            image: product.image
        };
        addToCart(cartProduct, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {product.image ? (
                    <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
                ) : null}
                <Text style={styles.title}>{product.title || product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
                {product.description && (
                    <Text style={styles.description}>{product.description}</Text>
                )}
                <View style={styles.buttonContainer}>
                    <Button
                        title={added ? "Added to Cart! ✓" : "Add to Cart"}
                        onPress={handleAddToCart}
                        disabled={added}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="View Cart"
                        onPress={() => navigation.navigate('Cart')}
                        color="#666"
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 16 },
    image: { width: '100%', height: 300, marginBottom: 16 },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
    price: { fontSize: 24, color: '#007AFF', marginBottom: 16, fontWeight: '600' },
    description: { fontSize: 14, color: '#666', marginBottom: 20, lineHeight: 20 },
    buttonContainer: { marginBottom: 12 }
});
