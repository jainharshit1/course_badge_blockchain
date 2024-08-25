import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
    process: 'window.process',
  },
  resolve: {
    alias: {
      process: resolve(__dirname, 'node_modules/process'),
    }
  }
});
