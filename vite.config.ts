import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components_legacy: '/src/components_legacy',
      store: '/src/store',
      styles: '/src/styles',
      shared: '/src/shared',
      entities: '/src/entities',
      features: '/src/features',
      widgets: '/src/widgets',
      pages: '/src/pages',
      app: '/src/app',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
});
