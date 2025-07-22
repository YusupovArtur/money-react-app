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
        // api: 'modern',
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // увеличим лимит, чтобы избежать варнингов
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('firebase')) return 'vendor-firebase';
            if (id.includes('date-fns')) return 'vendor-date-fns';
            return 'vendor';
          }
        },
      },
    },
  },
});
