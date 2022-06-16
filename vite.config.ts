import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import inject from '@rollup/plugin-inject';
import * as models from './src/models/v2';

const modelInjects = Object.keys(models).reduce((acc, modelName) => ({
  ...acc,
  [modelName]: resolve(`src/models/${modelName}`),
}), {});

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
  plugins: [
    react(),
    inject({
      ...modelInjects,
    }),
    eslintPlugin({ cache: false }),
  ],
  server: {
    port: 4000
  }
});
