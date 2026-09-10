import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  use: { baseURL: "http://localhost:5184", channel: "msedge" },
  webServer: {
    command: "npm run dev -- --port 5184",
    url: "http://localhost:5184",
    reuseExistingServer: true,
  },
  reporter: "list",
});
