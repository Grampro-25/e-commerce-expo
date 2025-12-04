import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ product, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {product.image ? (
                <Image source={{ uri: product.image }} style={styles.image} />
            ) : (
                <View style={styles.imagePlaceholder} />
            )}
            <View style={styles.info}>
                <Text numberOfLines={1} style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
        alignItems: 'center'
    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 8,
        marginRight: 12
    },
    imagePlaceholder: {
        width: 72,
        height: 72,
        backgroundColor: '#ddd',
        borderRadius: 8,
        marginRight: 12
    },
    info: {
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    price: {
        marginTop: 4,
        color: '#333'
    }
});