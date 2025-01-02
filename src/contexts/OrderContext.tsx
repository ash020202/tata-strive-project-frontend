import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import type { Order } from '../types';

interface OrderContextType {
  createOrder: (address: string, notes: string) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const { userData, isAuthenticated, login } = useAuth();
  const { items, total, clearCart } = useCart();

  const createOrder = (address: string, notes: string) => {
    if (!isAuthenticated) {
      throw new Error('User must be logged in to create an order');
    }

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      address,
      notes,
    };

    // In a real app, this would make an API call
    // login(userData?.username, ''); // Refresh userData data with new order
    clearCart();
  };

  return (
    <OrderContext.Provider value={{ createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
