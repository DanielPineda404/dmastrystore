import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  isCartOpen: false,

  addToCart: (product) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    set({ cart: cart.filter((item) => item.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    const { cart } = get();
    if (quantity < 1) return;
    set({
      cart: cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    });
  },

  clearCart: () => set({ cart: [] }),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  // Devolvemos el número para que el componente haga el toFixed
  getTotal: () => {
    const { cart } = get();
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
}));