import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      "/api": {
        target: "https://phplaravel-1329305-4863390.cloudwaysapps.com/api/", // The API server you want to target
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api from the request URL
        secure: false, // Use `true` if the API is served over HTTPS, and the server has a valid certificate.
      },
    },
  },
  // server: {
  //   proxy: {
  //     "/google": "https://google.com",
  //   },
  // },
  resolve: {
    alias: {
      components: "/src/components",
      src: "/src",
      pages: "/src/pages",
      utils: "/src/utils",
      functions: "/src/functions",
    },
  },
  build: {
    // outDir: "build",
    outDir: "dist",
  },
});
