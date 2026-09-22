import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  define: {
    // sockjs-client utilise `global` (variable Node.js) → on le polyfille pour le navigateur
    global: 'globalThis',
  },
  server: {
    watch: {
      usePolling: true, // Nécessaire sous WSL, Linux dans certains VM, ou conteneurs Docker
    }
  }
})
