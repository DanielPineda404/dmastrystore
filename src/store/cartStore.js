import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find(item => item.id === product.id);
        if (existingItem) {
          set({
            cart: currentCart.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({ cart: [...currentCart, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (id) => set({ cart: get().cart.filter(item => item.id !== id) }),
      clearCart: () => set({ cart: [] }),
      getTotal: () => get().cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    }),
    { name: 'shopping-cart' }
  )
);