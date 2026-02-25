import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, CartState } from '../types';
import { config } from '../constants/config';

interface CartContextValue extends CartState {
  itemCount: number;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateTip: (tip: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_KEY = '@darzi_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    saveCart();
  }, [items, tip]);

  const loadCart = async () => {
    try {
      const cartJson = await AsyncStorage.getItem(CART_KEY);
      if (cartJson) {
        const savedCart = JSON.parse(cartJson);
        setItems(savedCart.items || []);
        setTip(savedCart.tip || 0);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify({ items, tip }));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  };

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    const existingItem = items.find(item => item.serviceId === newItem.serviceId);
    
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + newItem.quantity);
    } else {
      const item: CartItem = {
        ...newItem,
        id: Date.now().toString(),
      };
      setItems(prev => [...prev, item]);
    }
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: Math.min(quantity, config.cart.maxQuantity) } : item
      )
    );
  };

  const updateTip = (newTip: number) => {
    setTip(Math.max(0, newTip));
  };

  const clearCart = () => {
    setItems([]);
    setTip(0);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? config.cart.deliveryFee : 0;
  const tax = subtotal * config.cart.taxRate;
  const total = subtotal + tip + deliveryFee + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextValue = {
    items,
    subtotal,
    tip,
    deliveryFee,
    tax,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    updateTip,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
