/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Enables global `describe`, `it`, `expect` usage
    environment: "jsdom", // Simulates browser-like environment for React testing
    coverage: {
      provider: "istanbul", // Enables test coverage reports
      reporter: ["text", "json", "html"],
    },
  },
});
