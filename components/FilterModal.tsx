import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: FilterOptions) => void;
    currentFilters: FilterOptions;
    categories: string[];
}

export interface FilterOptions {
    category: string;
    minPrice: number;
    maxPrice: number;
    sortBy: 'name' | 'price-asc' | 'price-desc' | 'rating';
}

export default function FilterModal({ visible, onClose, onApply, currentFilters, categories }: FilterModalProps) {
    const [filters, setFilters] = useState<FilterOptions>(currentFilters);

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    const handleReset = () => {
        const resetFilters: FilterOptions = {
            category: 'all',
            minPrice: 0,
            maxPrice: 1000,
            sortBy: 'name',
        };
        setFilters(resetFilters);
        onApply(resetFilters);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Filters & Sort</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeButton}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollView}>
                        {/* Category Filter */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Category</Text>
                            <View style={styles.chipContainer}>
                                <TouchableOpacity
                                    style={[styles.chip, filters.category === 'all' && styles.chipActive]}
                                    onPress={() => setFilters({ ...filters, category: 'all' })}
                                >
                                    <Text style={[styles.chipText, filters.category === 'all' && styles.chipTextActive]}>
                                        All
                                    </Text>
                                </TouchableOpacity>
                                {categories.map((cat) => (
                                    <TouchableOpacity
                                        key={cat}
                                        style={[styles.chip, filters.category === cat && styles.chipActive]}
                                        onPress={() => setFilters({ ...filters, category: cat })}
                                    >
                                        <Text style={[styles.chipText, filters.category === cat && styles.chipTextActive]}>
                                            {cat}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Price Range */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Price Range</Text>
                            <View style={styles.priceContainer}>
                                <TouchableOpacity
                                    style={[styles.priceButton, filters.maxPrice === 50 && styles.chipActive]}
                                    onPress={() => setFilters({ ...filters, minPrice: 0, maxPrice: 50 })}
                                >
                                    <Text style={[styles.chipText, filters.maxPrice === 50 && styles.chipTextActive]}>
                                        Under $50
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.priceButton, filters.minPrice === 50 && filters.maxPrice === 100 && styles.chipActive]}
                                    onPress={() => setFilters({ ...filters, minPrice: 50, maxPrice: 100 })}
                                >
                                    <Text style={[styles.chipText, filters.minPrice === 50 && filters.maxPrice === 100 && styles.chipTextActive]}>
                                        $50 - $100
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.priceButton, filters.minPrice === 100 && filters.maxPrice === 200 && styles.chipActive]}
                                    onPress={() => setFilters({ ...filters, minPrice: 100, maxPrice: 200 })}
                                >
                                    <Text style={[styles.chipText, filters.minPrice === 100 && filters.maxPrice === 200 && styles.chipTextActive]}>
                                        $100 - $200
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.priceButton, filters.minPrice === 200 && styles.chipActive]}
                                    onPress={() => setFilters({ ...filters, minPrice: 200, maxPrice: 1000 })}
                                >
                                    <Text style={[styles.chipText, filters.minPrice === 200 && styles.chipTextActive]}>
                                        $200+
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Sort By */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Sort By</Text>
                            <TouchableOpacity
                                style={[styles.sortOption, filters.sortBy === 'name' && styles.sortOptionActive]}
                                onPress={() => setFilters({ ...filters, sortBy: 'name' })}
                            >
                                <Text style={[styles.sortText, filters.sortBy === 'name' && styles.sortTextActive]}>
                                    Name (A-Z)
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.sortOption, filters.sortBy === 'price-asc' && styles.sortOptionActive]}
                                onPress={() => setFilters({ ...filters, sortBy: 'price-asc' })}
                            >
                                <Text style={[styles.sortText, filters.sortBy === 'price-asc' && styles.sortTextActive]}>
                                    Price: Low to High
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.sortOption, filters.sortBy === 'price-desc' && styles.sortOptionActive]}
                                onPress={() => setFilters({ ...filters, sortBy: 'price-desc' })}
                            >
                                <Text style={[styles.sortText, filters.sortBy === 'price-desc' && styles.sortTextActive]}>
                                    Price: High to Low
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.sortOption, filters.sortBy === 'rating' && styles.sortOptionActive]}
                                onPress={() => setFilters({ ...filters, sortBy: 'rating' })}
                            >
                                <Text style={[styles.sortText, filters.sortBy === 'rating' && styles.sortTextActive]}>
                                    Rating (High to Low)
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                            <Text style={styles.resetButtonText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                            <Text style={styles.applyButtonText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        fontSize: 24,
        color: '#666',
    },
    scrollView: {
        padding: 20,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    chipActive: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    chipText: {
        fontSize: 14,
        color: '#666',
        textTransform: 'capitalize',
    },
    chipTextActive: {
        color: 'white',
        fontWeight: '600',
    },
    priceContainer: {
        gap: 8,
    },
    priceButton: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    sortOption: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    sortOptionActive: {
        backgroundColor: '#e3f2fd',
        borderColor: '#007AFF',
    },
    sortText: {
        fontSize: 15,
        color: '#333',
    },
    sortTextActive: {
        color: '#007AFF',
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        gap: 12,
    },
    resetButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    resetButtonText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    applyButton: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: '#007AFF',
        alignItems: 'center',
    },
    applyButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
});
