import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    function addToCart(product, qty = 1) {
        setItems(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
            }
            return [...prev, { ...product, qty }];
        });
    }

    function removeFromCart(productId) {
        setItems(prev => prev.filter(i => i.id !== productId));
    }

    function updateQty(productId, qty) {
        setItems(prev => prev.map(i => i.id === productId ? { ...i, qty } : i));
    }

    function clearCart() {
        setItems([]);
    }

    const total = items.reduce((s, it) => s + it.price * it.qty, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}
