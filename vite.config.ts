import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
      }
    },
  },
  resolve: {
    alias: {
      '~themes': path.resolve(__dirname, './src/stylesheets/themes'),
      '~variables': path.resolve(__dirname, './src/stylesheets/_variables.scss'),
    },
  },
  plugins: [react()]
})
