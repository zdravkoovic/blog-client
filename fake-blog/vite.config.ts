import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    origin: 'http://127.0.0.1:8000',
    cors: {
      origin: 'http://localhost:8000',
    },
  },
  build: {
    manifest: true,
  }
})
