import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Baris base ini yang penting untuk GitHub Pages
  base: '/ecocraft-app/', 
  
  plugins: [react()],
})