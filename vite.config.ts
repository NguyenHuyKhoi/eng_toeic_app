import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@asset": path.resolve(__dirname, "./src/asset"),
      "@common": path.resolve(__dirname, "./src/common/index.ts"),
      "@component": path.resolve(__dirname, "./src/component"),
      "@model": path.resolve(__dirname, "./src/model"),
      "@page": path.resolve(__dirname, "./src/page"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@service": path.resolve(__dirname, "./src/service"),
      "@theme": path.resolve(__dirname, "./src/theme"),
    },
  },
});
