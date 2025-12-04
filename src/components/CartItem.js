import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CartItem({ item, onRemove, onChangeQty }) {
    return (
        <View style={styles.row}>
            {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : <View style={styles.image} />}
            <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>${(item.price * item.qty).toFixed(2)} ({item.qty} x ${item.price.toFixed(2)})</Text>
                <View style={styles.controls}>
                    <TouchableOpacity onPress={() => onChangeQty(item.id, Math.max(1, item.qty - 1))} style={styles.btn}><Text>-</Text></TouchableOpacity>
                    <Text style={styles.qty}>{item.qty}</Text>
                    <TouchableOpacity onPress={() => onChangeQty(item.id, item.qty + 1)} style={styles.btn}><Text>+</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.remove}><Text>Remove</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
    image: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#ddd', marginRight: 12 },
    info: { flex: 1 },
    title: { fontSize: 16, fontWeight: '600' },
    price: { marginTop: 4 },
    controls: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    btn: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginHorizontal: 8 },
    qty: { minWidth: 20, textAlign: 'center' },
    remove: { marginLeft: 12 }
});