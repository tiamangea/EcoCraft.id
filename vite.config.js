import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Baris base ini yang penting untuk GitHub Pages
  // Saya telah mengubahnya menyesuaikan dengan nama asli repositori Anda di GitHub
  base: 'https://github.com/tiamangea/EcoCraft.id', 
  
  plugins: [react()],
})