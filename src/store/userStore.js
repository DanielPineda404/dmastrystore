import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null, // Usuario con sesión activa
      isLoggedIn: false,
      registeredUsers: [], // "Base de datos" local

      // Acción para registrar un nuevo usuario
      register: (userData) => {
        const { registeredUsers } = get();
        const userExists = registeredUsers.some(u => u.email === userData.email);

        if (userExists) return { success: false, message: "Email already registered" };

        set({ registeredUsers: [...registeredUsers, userData] });
        return { success: true, message: "User registered successfully" };
      },

      // Acción para hacer login verificando existencia
      login: (email, password) => {
        const { registeredUsers } = get();
        const foundUser = registeredUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          set({ user: foundUser, isLoggedIn: true });
          return { success: true };
        }
        return { success: false, message: "Invalid email or password" };
      },

      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    { name: 'user-auth-storage' }
  )
);