class Home {
  constructor(page) {
    this.page = page;
    this.userIndicator = page.locator('#nameofuser');
    this.previousCarousel = page.locator('#carouselExampleIndicators .carousel-control-prev');
    this.nextCarousel = page.locator('#carouselExampleIndicators .carousel-control-next');
    this.categories = page.locator('#itemc');
    this.productCards = page.locator('.card');
    this.footerNext = page.locator('#next2');
    this.footerPrevious = page.locator('#prev2');
    this.contactLink = page.locator('a.nav-link', { hasText: 'Contact' });
    this.contactModal = page.locator('#exampleModal');
    this.sendMessageButton = this.contactModal.locator('button', { hasText: 'Send message' });
    this.emailInput = page.locator('#recipient-email');
    this.nameInput = page.locator('#recipient-name');
    this.messageInput = page.locator('#message-text');
  }

  async visit() {
    await this.userIndicator.hover();
    return (await this.userIndicator.textContent())?.trim();
  }

  async corsoPre() { await this.previousCarousel.click(); }
  async corsoNex() { await this.nextCarousel.click(); }

  async cator() {
    return (await this.categories.allTextContents()).map(v => v.trim()).filter(Boolean);
  }

  async card() {
    const count = await this.productCards.count();
    const products = [];
    for (let i = 0; i < count; i += 1) {
      const card = this.productCards.nth(i);
      products.push({
        name: (await card.locator('.card-title').textContent())?.trim() || '',
        price: (await card.locator('.card-block h5').textContent())?.trim() || '',
      });
    }
    return products;
  }

  async buchek() {
    await this.footerNext.click();
    await this.footerPrevious.click();
  }

  async contact() {
    await this.contactLink.click();
    await this.contactModal.waitFor({ state: 'visible' });

    await this.emailInput.fill(process.env.CONTACT_EMAIL || 'test@example.com');
    await this.nameInput.fill(process.env.CONTACT_NAME || 'Satyendra');
    await this.messageInput.fill('Automated DemoBlaze contact-form verification.');

    await this.page.once('dialog', async dialog => dialog.accept());
    await this.sendMessageButton.click();
  }
}

module.exports = Home;
