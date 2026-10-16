import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' || process.env.NODE_ENV === 'production' ? '/RoastHub/' : '/',
  server: {
    port: 5174,
    open: false,
  },
  test: {
    globals: true,
    environment: 'node',
  },
});
