import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Ubah base menjadi root (garis miring saja) karena sudah pakai domain sendiri
  base: '/', 
  
  plugins: [react()],
})