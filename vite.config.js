import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <--- Asegúrate de que esto esté aquí

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})