import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    watch: {
      usePolling: true, // Nécessaire sous WSL, Linux dans certains VM, ou conteneurs Docker
    }
  }
})
