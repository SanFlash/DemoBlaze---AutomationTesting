const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');
const Home = require('../../pages/Home');

test('Home', async ({ page }) => {
  const landing = new LandingPage(page);
  const home = new Home(page);

  await landing.goto();
  await landing.login();

  await test.step('Validate logged-in user', async () => {
    await expect(home.userIndicator).toBeVisible();
  });

  await test.step('Check carousel controls', async () => {
    await home.corsoPre();
    await home.corsoNex();
  });

  await test.step('Check Categories', async () => {
    const categories = await home.cator();
    expect(categories.length).toBeGreaterThan(0);
    console.log('Categories:', categories.join(', '));
  });

  await test.step('Check Product Cards', async () => {
    const products = await home.card();
    expect(products.length).toBeGreaterThan(0);
    expect(products.every(p => p.name && p.price)).toBeTruthy();
  });

  await test.step('Check Footer Controls', async () => {
    await home.buchek();
  });

  await test.step('Check Contact Form', async () => {
    await home.contact();
  });
});
