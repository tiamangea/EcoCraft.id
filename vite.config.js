import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // Pastikan hanya garis miring ini saja
  plugins: [react()],
})