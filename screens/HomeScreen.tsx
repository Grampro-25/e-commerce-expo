import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import { getProducts } from '../api';
import { useCart } from '../src/context/CartContext';
import FilterModal, { FilterOptions } from '../components/FilterModal';

export default function HomeScreen({ navigation }: any) {
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>({
        category: 'all',
        minPrice: 0,
        maxPrice: 1000,
        sortBy: 'name',
    });
    const [categories, setCategories] = useState<string[]>([]);
    const { items } = useCart();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.headerButton}>
                        <Text style={styles.headerIcon}>👤</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
                        <Text style={styles.cartIcon}>🛒</Text>
                        {items.length > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{items.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, items]);

    useEffect(() => {
        let mounted = true;
        async function fetchProducts() {
            const data = await getProducts();
            if (mounted) {
                setAllProducts(data || []);
                setFilteredProducts(data || []);

                // Extract unique categories
                const uniqueCategories = [...new Set(data.map((p: any) => p.category).filter(Boolean))];
                setCategories(uniqueCategories as string[]);

                setLoading(false);
            }
        }
        fetchProducts();
        return () => { mounted = false; };
    }, []);

    // Apply search and filters whenever they change
    useEffect(() => {
        applyFilters();
    }, [searchQuery, filters, allProducts]);

    const applyFilters = () => {
        let result = [...allProducts];

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter((product) =>
                product.title?.toLowerCase().includes(query) ||
                product.name?.toLowerCase().includes(query) ||
                product.description?.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (filters.category !== 'all') {
            result = result.filter((product) => product.category === filters.category);
        }

        // Price range filter
        result = result.filter(
            (product) => product.price >= filters.minPrice && product.price <= filters.maxPrice
        );

        // Sort
        switch (filters.sortBy) {
            case 'name':
                result.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''));
                break;
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
                break;
        }

        setFilteredProducts(result);
    };

    const handleApplyFilters = (newFilters: FilterOptions) => {
        setFilters(newFilters);
    };

    const getActiveFilterCount = () => {
        let count = 0;
        if (filters.category !== 'all') count++;
        if (filters.minPrice !== 0 || filters.maxPrice !== 1000) count++;
        if (filters.sortBy !== 'name') count++;
        return count;
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigation?.navigate?.('Product', { product: item })}>
            <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.image }} style={{ width: 80, height: 80, marginRight: 12, resizeMode: 'contain' }} />
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
                    <Text style={{ marginTop: 6 }}>${item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>;

    const activeFilterCount = getActiveFilterCount();

    return (
        <View style={{ flex: 1 }}>
            {/* Search Bar and Filter Button */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search products..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#999"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Text style={styles.clearIcon}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setFilterModalVisible(true)}
                >
                    <Text style={styles.filterIcon}>⚙️</Text>
                    {activeFilterCount > 0 && (
                        <View style={styles.filterBadge}>
                            <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Active Filters Display */}
            {(filters.category !== 'all' || searchQuery) && (
                <View style={styles.activeFiltersContainer}>
                    {searchQuery && (
                        <View style={styles.activeFilterChip}>
                            <Text style={styles.activeFilterText}>"{searchQuery}"</Text>
                        </View>
                    )}
                    {filters.category !== 'all' && (
                        <View style={styles.activeFilterChip}>
                            <Text style={styles.activeFilterText}>{filters.category}</Text>
                        </View>
                    )}
                    <Text style={styles.resultCount}>{filteredProducts.length} results</Text>
                </View>
            )}

            {/* Product List */}
            <FlatList
                data={filteredProducts}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>📦</Text>
                        <Text style={styles.emptyText}>No products found</Text>
                        <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
                    </View>
                }
            />

            {/* Filter Modal */}
            <FilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApply={handleApplyFilters}
                currentFilters={filters}
                categories={categories}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerButton: { marginRight: 15 },
    headerIcon: { fontSize: 24 },
    cartButton: { marginRight: 15, position: 'relative' },
    cartIcon: { fontSize: 24 },
    badge: { position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
    badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
    searchContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        gap: 10,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 12,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 15,
        color: '#333',
    },
    clearIcon: {
        fontSize: 18,
        color: '#999',
        padding: 5,
    },
    filterButton: {
        width: 44,
        height: 44,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    filterIcon: {
        fontSize: 20,
    },
    filterBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterBadgeText: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
    },
    activeFiltersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        gap: 8,
    },
    activeFilterChip: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    activeFilterText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    resultCount: {
        marginLeft: 'auto',
        color: '#666',
        fontSize: 13,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
    },
});
