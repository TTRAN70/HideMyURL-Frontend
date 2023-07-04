import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/make": {
        target: "http://localhost:3000/api/urlshort/makeuser",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/make/, ""),
      },
      "/newURL": {
        target: "http://localhost:3000/api/urlshort",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/newURL/, ""),
      },
      "/redirect": {
        target: "http://localhost:3000/api/urlshort",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/redirect/, ""),
      },
      "/getAllLinks": {
        target: "http://localhost:3000/api/urlshort/geturls",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/getAllLinks/, ""),
      },
      "/deleteURL": {
        target: "http://localhost:3000/api/urlshort",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/deleteURL/, ""),
      },
      "/google": {
        target: "http://localhost:3000/api/urlshort/googleuser",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/google/, ""),
      },
    },
    port: 5173,
  },
});
