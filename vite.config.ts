import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      "@": "/src", // set the path to your source directory
    },
  },
});
