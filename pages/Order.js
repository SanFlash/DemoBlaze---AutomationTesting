class Order {
  constructor(page) {
    this.page = page;
    this.products = page.locator('a.hrefch');
    this.homeLink = page.locator('a.nav-link', { hasText: 'Home' });
    this.cartLink = page.locator('#cartur');
    this.cartRows = page.locator('#tbodyid tr');
    this.placeOrderButton = page.locator('button[data-target="#orderModal"]');
    this.orderFormTitle = page.locator('#orderModalLabel');
    this.name = page.locator('#name');
    this.country = page.locator('#country');
    this.city = page.locator('#city');
    this.card = page.locator('#card');
    this.month = page.locator('#month');
    this.year = page.locator('#year');
    this.purchaseButton = page.locator('#orderModal button', { hasText: 'Purchase' });
    this.confirmation = page.locator('.sweet-alert');
    this.confirmationInfo = page.locator('.sweet-alert .lead');
    this.okButton = page.locator('.sweet-alert button', { hasText: 'OK' });
  }

  async booking(productCount = 2) {
    for (let i = 0; i < productCount; i += 1) {
      const items = this.products;
      await items.first().waitFor({ state: 'visible', timeout: 15_000 });
      const productName = (await items.first().textContent())?.trim() || `Product ${i + 1}`;

      await items.first().click();
      const addToCart = this.page.locator('a.btn-success', { hasText: 'Add to cart' });
      await addToCart.waitFor({ state: 'visible', timeout: 15_000 });

      await this.page.once('dialog', async dialog => dialog.accept());
      await addToCart.click();

      await this.homeLink.click();
      await this.page.waitForTimeout(500);
      console.log(`Added product: ${productName}`);
    }
  }

  async reload() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async cartt() {
    await this.cartLink.click();
    await this.cartRows.first().waitFor({ state: 'visible', timeout: 15_000 });
  }

  async tabb() {
    await this.cartRows.first().waitFor({ state: 'visible', timeout: 15_000 });
    const rows = await this.cartRows.count();
    const items = [];
    for (let i = 0; i < rows; i += 1) {
      items.push((await this.cartRows.nth(i).locator('td').nth(1).textContent())?.trim() || '');
    }
    console.log('Cart items:', items);
    return items;
  }

  async deleteLastItem() {
    const before = await this.cartRows.count();
    if (before < 1) throw new Error('Cart is empty; cannot delete an item.');

    const lastRow = this.cartRows.last();
    const productName = (await lastRow.locator('td').nth(1).textContent())?.trim() || '';
    await lastRow.locator('a').click();

    await this.page.waitForFunction(
      expected => document.querySelectorAll('#tbodyid tr').length === expected,
      before - 1
    );

    console.log(`Deleted cart item: ${productName}`);
  }

  async checkoutt() {
    const rows = await this.cartRows.count();
    if (rows < 1) throw new Error('Cart is empty; cannot validate total.');

    const prices = await this.page.locator('#tbodyid tr td:nth-child(3)').allTextContents();
    const sum = prices.reduce((total, value) => total + Number(value.trim()), 0);

    await this.page.locator('#totalp').waitFor({ state: 'visible', timeout: 15_000 });
    const total = Number((await this.page.locator('#totalp').textContent())?.trim() || 0);

    if (sum !== total) throw new Error(`Cart total mismatch. Calculated=${sum}, UI=${total}`);
    console.log(`Cart total validated: ${total}`);
    return { sum, total };
  }

  async placeorder() {
    await this.placeOrderButton.click();
    await this.orderFormTitle.waitFor({ state: 'visible', timeout: 10_000 });
  }

  async plceOrderFom() {
    await this.name.fill(process.env.ORDER_NAME || 'Satyen');
    await this.country.fill(process.env.ORDER_COUNTRY || 'India');
    await this.city.fill(process.env.ORDER_CITY || 'Indore');
    await this.card.fill(process.env.ORDER_CARD || '4111111111111111');
    await this.month.fill(process.env.ORDER_MONTH || 'April');
    await this.year.fill(process.env.ORDER_YEAR || '2026');
  }

  async purchase() { await this.purchaseButton.click(); }

  async confirmationText() {
    await this.confirmation.waitFor({ state: 'visible', timeout: 15_000 });
    return (await this.confirmationInfo.textContent())?.trim() || '';
  }

  async okkay() {
    await this.okButton.click();
    await this.confirmation.waitFor({ state: 'hidden', timeout: 10_000 }).catch(() => {});
  }
}

module.exports = Order;
