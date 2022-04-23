import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        admin: resolve(__dirname, 'admin/index.html'),
        main: resolve(__dirname, 'index.html'),
      }
    },
  },
  plugins: [react(), eslintPlugin({ cache: false, throwOnError: true, throwOnWarning: true })],
  resolve: {
    alias: {
      '~themes': path.resolve(__dirname, './src/stylesheets/themes'),
      '~variables': path.resolve(__dirname, './src/stylesheets/_variables.scss'),
    },
  },
});
