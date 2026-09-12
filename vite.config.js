import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: the site is published to https://brohauzan.github.io/WebsitePortofolioHauzan/
export default defineConfig({
  base: '/WebsitePortofolioHauzan/',
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Eksplisit: target browser modern yang mendukung ES2020 (optional chaining, nullish
    // coalescing, dynamic import). Aman dipakai bareng React.lazy() di App.jsx.
    target: 'es2020',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // 'react-vendor' dipisah dari kode aplikasi supaya cache vendor stabil antar deploy.
        // Hanya modul react/react-dom yang dipetakan: entry chunk aplikasi + chunk hasil
        // import() dinamis (React.lazy section bawah fold) tetap dibiarkan dikelola Rollup,
        // jadi manualChunks ini tidak mematahkan code-splitting per section.
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          return undefined;
        },
      },
    },
  },
});
