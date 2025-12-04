import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ProductCardProps {
    product: any;
    onPress?: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Text key={i} style={styles.star}>⭐</Text>);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<Text key={i} style={styles.star}>⭐</Text>);
            } else {
                stars.push(<Text key={i} style={styles.starEmpty}>☆</Text>);
            }
        }
        return stars;
    };

    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    {product.image ? (
                        <Image
                            source={{ uri: product.image }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.placeholderText}>📦</Text>
                        </View>
                    )}
                    {hasDiscount && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>-{discountPercent}%</Text>
                        </View>
                    )}
                    {product.isFeatured && (
                        <View style={styles.featuredBadge}>
                            <Text style={styles.featuredText}>⭐ Featured</Text>
                        </View>
                    )}
                </View>

                <View style={styles.details}>
                    <Text style={styles.category}>{product.category || 'General'}</Text>
                    <Text style={styles.title} numberOfLines={2}>
                        {product.title || product.name || 'Untitled Product'}
                    </Text>

                    {product.rating && (
                        <View style={styles.ratingContainer}>
                            <View style={styles.stars}>
                                {renderStars(product.rating.rate || product.rating)}
                            </View>
                            <Text style={styles.ratingText}>
                                {typeof product.rating === 'object'
                                    ? `${product.rating.rate} (${product.rating.count})`
                                    : `${product.rating}`
                                }
                            </Text>
                        </View>
                    )}

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${product.price?.toFixed(2)}</Text>
                        {hasDiscount && (
                            <Text style={styles.originalPrice}>
                                ${product.originalPrice.toFixed(2)}
                            </Text>
                        )}
                    </View>

                    {product.stock !== undefined && product.stock < 10 && (
                        <Text style={styles.lowStock}>
                            {product.stock === 0 ? '🔴 Out of Stock' : `⚠️ Only ${product.stock} left!`}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginHorizontal: 12,
        marginVertical: 8,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#f9f9f9',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
    },
    placeholderText: {
        fontSize: 48,
        opacity: 0.3,
    },
    discountBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ff3b30',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    discountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    featuredBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#007AFF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    featuredText: {
        color: 'white',
        fontSize: 11,
        fontWeight: '600',
    },
    details: {
        padding: 12,
    },
    category: {
        fontSize: 12,
        color: '#007AFF',
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        lineHeight: 22,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    stars: {
        flexDirection: 'row',
        marginRight: 6,
    },
    star: {
        fontSize: 12,
        color: '#FFD700',
    },
    starEmpty: {
        fontSize: 12,
        color: '#ddd',
    },
    ratingText: {
        fontSize: 12,
        color: '#666',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    originalPrice: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    lowStock: {
        fontSize: 12,
        color: '#ff3b30',
        marginTop: 6,
        fontWeight: '600',
    },
});
