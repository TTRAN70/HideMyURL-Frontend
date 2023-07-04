import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/make": {
        target: "https://hmu-backend.vercel.app/api/urlshort/makeuser",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/make/, ""),
      },
      "/newURL": {
        target: "https://hmu-backend.vercel.app/api/urlshort",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/newURL/, ""),
      },
      "/redirect": {
        target: "https://hmu-backend.vercel.app/api/urlshort",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/redirect/, ""),
      },
      "/getAllLinks": {
        target: "https://hmu-backend.vercel.app/api/urlshort/geturls",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/getAllLinks/, ""),
      },
      "/deleteURL": {
        target: "https://hmu-backend.vercel.app/api/urlshort",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/deleteURL/, ""),
      },
      "/google": {
        target: "https://hmu-backend.vercel.app/api/urlshort/googleuser",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/google/, ""),
      },
    },
    port: 5173,
  },
});
