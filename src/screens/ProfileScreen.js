import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button } from 'react-native';
import { auth } from '../firebase/firebaseConfig';
import { signInAnonymously, signOut, onAuthStateChanged } from 'firebase/auth';

export default function ProfileScreen() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, u => setUser(u));
        return unsub;
    }, []);

    async function handleSignIn() {
        try {
            await signInAnonymously(auth);
        } catch (err) {
            console.warn('Sign-in failed', err);
        }
    }

    async function handleSignOut() {
        try {
            await signOut(auth);
        } catch (err) {
            console.warn('Sign-out failed', err);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Profile</Text>
            {user ? (
                <View style={{ marginTop: 12 }}>
                    <Text>User ID: {user.uid}</Text>
                    <Button title="Sign out" onPress={handleSignOut} />
                </View>
            ) : (
                <View style={{ marginTop: 12 }}>
                    <Text>You are not signed in.</Text>
                    <Button title="Sign in (anonymous)" onPress={handleSignIn} />
                </View>
            )}
        </SafeAreaView>
    );
}
