class LandingPage {
  constructor(page) {
    this.page = page;
    this.logi = page.locator('//a[@id="login2"]');
    this.logpopup = page.locator('//h5[@id="logInModalLabel"]');
    this.user = page.locator('//input[@id="loginusername"]');
    this.pass = page.locator('//input[@id="loginpassword"]');
    this.loginbutton = page.locator('//button[text()="Log in"]');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/');
    const k = await this.page.title();
    console.log(k);
  }

   async wait(seconds) {
    await this.page.waitForTimeout(seconds * 1000);
  }

  async login() {
    await this.logi.click(); // hover not needed
    await this.logpopup.waitFor();
    await this.user.fill('satyen@amwebtech.com');
    await this.pass.fill('Test@123');
    await this.loginbutton.click();
  }

  
}

module.exports = LandingPage;