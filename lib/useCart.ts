'use client';
import { useEffect, useState } from 'react';
import { CartItem } from '@/app/schema/cartItem';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          setCart(JSON.parse(stored));
        } catch (err) {
          console.error('Lỗi khi parse localStorage:', err);
        }
      }
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
  if (loaded) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}, [cart, loaded]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(p => p.productId === item.productId);
      if (existing) {
        return prev.map(p =>
          p.productId === item.productId
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, loaded };
};