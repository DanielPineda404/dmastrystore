import { create } from 'zustand';

export const useCheckoutStore = create((set) => ({
  isCompletingCheckout: false,
  setIsCompletingCheckout: (value) => set({ isCompletingCheckout: value }),
}));
