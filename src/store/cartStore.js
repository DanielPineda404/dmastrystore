import { create } from 'zustand';

const calculateCartTotal = (cart) => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const findCartItem = (cart, productId) => {
  return cart.find(item => item.id === productId);
};

const updateItemQuantity = (cart, productId, quantity) => {
  return cart.map(item =>
    item.id === productId ? { ...item, quantity } : item
  );
};

export const useCartStore = create((set, get) => ({
  cart: [],
  isCartOpen: false,

  addToCart: (product) => {
    const { cart } = get();
    const existingItem = findCartItem(cart, product.id);

    if (existingItem) {
      set({ cart: updateItemQuantity(cart, product.id, existingItem.quantity + 1) });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (productId) => {
    set(state => ({
      cart: state.cart.filter(item => item.id !== productId)
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity < 1) return;
    set({ cart: updateItemQuantity(get().cart, productId, quantity) });
  },

  clearCart: () => set({ cart: [] }),

  toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  getTotal: () => {
    return calculateCartTotal(get().cart);
  },
}));