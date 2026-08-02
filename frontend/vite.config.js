import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config: React plugin + dev server port. The backend URL is read
// from VITE_API_URL / VITE_SOCKET_URL at runtime (see src/services/api.js),
// not from this file, so it works the same in dev and in a production build.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
