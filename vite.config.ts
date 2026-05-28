import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@tokens': path.resolve(__dirname, './src/design-system/tokens'),
      '@primitives': path.resolve(__dirname, './src/design-system/primitives'),
      '@components': path.resolve(__dirname, './src/design-system/components'),
      '@layouts': path.resolve(__dirname, './src/design-system/layouts'),
      '@patterns': path.resolve(__dirname, './src/design-system/patterns'),
      '@icons': path.resolve(__dirname, './src/design-system/icons'),
      '@utils': path.resolve(__dirname, './src/design-system/utils'),
    },
  },
});
