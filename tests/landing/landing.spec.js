const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');

test('Login', async ({ page }) => {
  const landing = new LandingPage(page);

  await test.step('Open DemoBlaze', async () => {
    await landing.goto();
    await expect(page).toHaveTitle(/STORE/i);
  });

  await test.step('Login User', async () => {
    await landing.login();
    await expect(landing.userIndicator).toBeVisible();
  });
});
