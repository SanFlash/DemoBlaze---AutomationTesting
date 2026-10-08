const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');
const Order = require('../../pages/Order');

test('Ordering', async ({ page }) => {
  const landing = new LandingPage(page);
  const order = new Order(page);

  await landing.goto();
  await landing.login();

  await test.step('Add products to cart', async () => {
    await order.booking(2);
  });

  await test.step('Open cart', async () => {
    await order.cartt();
    await expect(order.cartRows.first()).toBeVisible();
  });

  await test.step('Trace cart items', async () => {
    const items = await order.tabb();
    expect(items.length).toBeGreaterThan(0);
  });

  await test.step('Validate total', async () => {
    const totals = await order.checkoutt();
    expect(totals.sum).toBe(totals.total);
  });

  await test.step('Delete one item', async () => {
    const before = await order.cartRows.count();
    await order.deleteLastItem();
    expect(await order.cartRows.count()).toBe(before - 1);
  });

  await test.step('Validate total after delete', async () => {
    const totals = await order.checkoutt();
    expect(totals.sum).toBe(totals.total);
  });

  await test.step('Place order', async () => {
    await order.placeorder();
    await order.plceOrderFom();
    await order.purchase();
  });

  await test.step('Verify purchase confirmation', async () => {
    const confirmation = await order.confirmationText();
    expect(confirmation).toMatch(/Id:\s*\d+/i);
    expect(confirmation).toMatch(/Amount:\s*\d+/i);
    await order.okkay();
  });
});
