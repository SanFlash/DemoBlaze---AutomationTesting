// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Standard Playwright configuration.
 *
 * - External application under test: DemoBlaze
 * - POM-based tests
 * - CI retries and single worker for stability
 * - Failure-only screenshots/video + trace
 * - HTML + JUnit reporting in CI
 */
module.exports = defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.js$/,

  timeout: 90_000,
  expect: {
    timeout: 15_000,
  },

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI
    ? [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'test-results/results.xml' }],
        ['allure-playwright', { resultsDir: 'allure-results' }],
      ]
    : [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }], ['allure-playwright', { resultsDir: 'allure-results' }]],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.demoblaze.com/',
    headless: true,
    actionTimeout: 20_000,
    navigationTimeout: 45_000,
    ignoreHTTPSErrors: true,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    viewport: { width: 1440, height: 900 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
