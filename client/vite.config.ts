import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This allows the app to be accessed from outside when running in a container
    host: '0.0.0.0',
    // Use port 5173 by default
    port: 5173,
    // Add proxy for API calls to avoid CORS issues during development
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
