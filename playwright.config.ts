import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "tests",
  workers: 1,
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "https://ferg.al",
    launchOptions: {
      // headful mode
      headless: false,
    },
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
