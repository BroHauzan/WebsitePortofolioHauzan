import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: the site is published to https://brohauzan.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
