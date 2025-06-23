import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // 👈 IMPORTANT: ensures relative paths for production to prevent white screen
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

