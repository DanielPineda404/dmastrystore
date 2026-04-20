import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const validateCredentials = (email, password) => {
  return email?.trim() && password?.trim();
};

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      registeredUsers: [],

      register: (userData) => {
        if (!userData?.email || !userData?.password || !userData?.name) {
          return { success: false, message: "Missing required fields" };
        }

        const { registeredUsers } = get();
        const emailExists = registeredUsers.some(u => u.email === userData.email);

        if (emailExists) {
          return { success: false, message: "Email already registered" };
        }

        set({ registeredUsers: [...registeredUsers, userData] });
        return { success: true, message: "User registered successfully" };
      },

      login: (email, password) => {
        if (!validateCredentials(email, password)) {
          return { success: false, message: "Invalid email or password" };
        }

        const { registeredUsers } = get();
        const user = registeredUsers.find(u => u.email === email && u.password === password);

        if (user) {
          set({ user, isLoggedIn: true });
          return { success: true };
        }

        return { success: false, message: "Invalid email or password" };
      },

      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    { name: 'user-auth-storage' }
  )
);