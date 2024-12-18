import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:5000", // Proxy API requests to Flask backend
    },
  },
  test: {
    ...configDefaults,
    include: [
      "src/modules/__tests__/VisualizationServiceTest.ts",
      "src/modules/__tests__/VisualizationPageTest.tsx",
      "src/modules/__tests__/CmsPageTest.tsx",
      "src/modules/__tests__/CmsServiceTest.ts",
    ],
  },
});
