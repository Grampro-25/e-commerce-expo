import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation';
import { CartProvider } from './src/context/CartContext';
import './src/firebase/firebaseConfig';

export default function App() {
    return (
        <CartProvider>
            <NavigationContainer>
                <StatusBar barStyle="dark-content" />
                <AppNavigator />
            </NavigationContainer>
        </CartProvider>
    );
}
