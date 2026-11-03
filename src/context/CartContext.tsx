'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    item: {
      productId: string;
      slug: string;
      name: string;
      price: number;
      image: string;
      selectedColor?: string;
      selectedSize?: string;
      leadTimeDays: number;
    },
    quantity?: number
  ) => void;
  buyNow: (
    item: {
      productId: string;
      slug: string;
      name: string;
      price: number;
      image: string;
      selectedColor?: string;
      selectedSize?: string;
      leadTimeDays: number;
    },
    quantity?: number
  ) => void;
  updateQuantity: (id: string, delta: number) => void;
  setExactQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  toggleCheckout: () => void;
  subtotal: number;
  itemCount: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
}

import { FREE_SHIPPING_THRESHOLD_PAISE } from '@/lib/format';

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = FREE_SHIPPING_THRESHOLD_PAISE;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('crochet_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage on item change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('crochet_cart', JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items, isLoaded]);

  const addToCart = (
    product: {
      productId: string;
      slug: string;
      name: string;
      price: number;
      image: string;
      selectedColor?: string;
      selectedSize?: string;
      leadTimeDays: number;
    },
    quantity: number = 1
  ) => {
    const cartItemId = `${product.productId}-${product.selectedColor || 'default'}-${product.selectedSize || 'default'}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          ...product,
          quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const buyNow = (
    product: {
      productId: string;
      slug: string;
      name: string;
      price: number;
      image: string;
      selectedColor?: string;
      selectedSize?: string;
      leadTimeDays: number;
    },
    quantity: number = 1
  ) => {
    const cartItemId = `${product.productId}-${product.selectedColor || 'default'}-${product.selectedSize || 'default'}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: Math.max(item.quantity, quantity) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          ...product,
          quantity,
        },
      ];
    });

    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const setExactQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);
  const toggleCheckout = () => setIsCheckoutOpen((prev) => !prev);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        buyNow,
        updateQuantity,
        setExactQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        toggleCheckout,
        subtotal,
        itemCount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        remainingForFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
