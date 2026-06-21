import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/EcoCraft.id/', // Sudah disesuaikan dengan nama repositori kamu
  build: {
    outDir: 'docs', // Mengatur agar hasil build langsung masuk ke folder docs
  },
})