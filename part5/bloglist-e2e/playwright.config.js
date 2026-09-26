const {
  defineConfig,
  devices,
} = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  timeout: 30000,

  fullyParallel: false,

  reporter: "html",

  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});