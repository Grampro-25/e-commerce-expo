import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export interface Order {
    id?: string;
    userId: string;
    items: Array<{
        id: string;
        name: string;
        price: number;
        qty: number;
        image?: string;
    }>;
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    paymentMethod: string;
    createdAt: string;
    stripeSessionId?: string;
}

// Save a new order to Firestore
export async function createOrder(orderData: Omit<Order, 'id'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, 'orders'), {
            ...orderData,
            createdAt: new Date().toISOString(),
        });
        console.log('✅ Order created:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('❌ Error creating order:', error);
        throw error;
    }
}

// Get all orders for a specific user
export async function getUserOrders(userId: string): Promise<Order[]> {
    try {
        const q = query(
            collection(db, 'orders'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const orders: Order[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Order[];

        console.log(`✅ Loaded ${orders.length} orders for user ${userId}`);
        return orders;
    } catch (error) {
        console.error('❌ Error fetching orders:', error);
        return [];
    }
}

// Get order statistics
export async function getOrderStats(userId: string) {
    try {
        const orders = await getUserOrders(userId);
        const totalOrders = orders.length;
        const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
        const completedOrders = orders.filter(o => o.status === 'completed').length;

        return {
            totalOrders,
            totalSpent,
            completedOrders,
            averageOrderValue: totalOrders > 0 ? totalSpent / totalOrders : 0,
        };
    } catch (error) {
        console.error('❌ Error calculating order stats:', error);
        return {
            totalOrders: 0,
            totalSpent: 0,
            completedOrders: 0,
            averageOrderValue: 0,
        };
    }
}
