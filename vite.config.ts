import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


console.log(process.env.VITE_REACT_APP_API_URL)

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_REACT_APP_API_URL || 'http://localhost:8081/api/v1/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});