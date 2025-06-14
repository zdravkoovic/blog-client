import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    origin: 'http://127.0.0.1:8000',
    cors: {
      origin: 'http://localhost:8000',
    },
  },
  build: {
    ssr: true,
    rollupOptions: {
      input: './server.js'
    },
    manifest: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
