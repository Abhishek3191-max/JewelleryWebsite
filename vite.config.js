import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  optimizeDeps: {
    include: ['@tanstack/react-query'], // Only include what you actually use
   
  },
   server:{
    port: 5173, 
    host:'0.0.0.0',
  }
  
})
