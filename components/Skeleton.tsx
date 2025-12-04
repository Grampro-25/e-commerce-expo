import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    style?: any;
    borderRadius?: number;
}

export const Skeleton = ({ width = '100%', height = 20, style, borderRadius = 4 }: SkeletonProps) => {
    const opacity = React.useRef(new Animated.Value(0.3)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.skeleton,
                { width, height, borderRadius, opacity },
                style,
            ]}
        />
    );
};

export const ProductCardSkeleton = () => {
    return (
        <View style={styles.card}>
            <Skeleton width="100%" height={200} borderRadius={0} />
            <View style={styles.details}>
                <Skeleton width={80} height={12} style={{ marginBottom: 8 }} />
                <Skeleton width="90%" height={16} style={{ marginBottom: 4 }} />
                <Skeleton width="70%" height={16} style={{ marginBottom: 12 }} />
                <Skeleton width={100} height={14} style={{ marginBottom: 8 }} />
                <Skeleton width={80} height={20} />
            </View>
        </View>
    );
};

export const ProductListSkeleton = ({ count = 3 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </>
    );
};

export const ProfileStatsSkeleton = () => {
    return (
        <View style={styles.statsContainer}>
            {[1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.statCard}>
                    <Skeleton width={60} height={32} style={{ marginBottom: 8 }} />
                    <Skeleton width={80} height={14} />
                </View>
            ))}
        </View>
    );
};

export const OrderCardSkeleton = () => {
    return (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Skeleton width={100} height={14} />
                <Skeleton width={70} height={24} borderRadius={12} />
            </View>
            <Skeleton width="80%" height={14} style={{ marginBottom: 6 }} />
            <Skeleton width="60%" height={14} style={{ marginBottom: 12 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Skeleton width={80} height={20} />
                <Skeleton width={60} height={16} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: '#e0e0e0',
    },
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
    details: {
        padding: 12,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        gap: 12,
    },
    statCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        width: '47%',
        alignItems: 'center',
    },
    orderCard: {
        backgroundColor: 'white',
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#e0e0e0',
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
});
