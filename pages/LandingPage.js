class LandingPage {
  constructor(page) {
    this.page = page;
    this.logi = page.locator('#login2');
    this.logpopup = page.locator('#logInModalLabel');
    this.user = page.locator('#loginusername');
    this.pass = page.locator('#loginpassword');
    this.loginbutton = page.locator('#logInModal .btn-primary');
    this.userIndicator = page.locator('#nameofuser');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle').catch(() => {});
    return this.page.title();
  }

  async wait(seconds) {
    await this.page.waitForTimeout(seconds * 1000);
  }

  async login() {
    await this.logi.click();
    await this.logpopup.waitFor({ state: 'visible' });
    await this.user.fill(process.env.DEMOBLAZE_USERNAME || 'satyen@amwebtech.com');
    await this.pass.fill(process.env.DEMOBLAZE_PASSWORD || 'Test@123');

    await this.loginbutton.click();
    await this.userIndicator.waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
  }
}

module.exports = LandingPage;
