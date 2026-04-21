class Order {
  constructor(page) {
    this.page = page;
    this.caar = page.locator('//a[@class="hrefch"]');
    this.hoo = page.locator('//a[@class="nav-link" and text()="Home "]');
    this.carte = page.locator('//a[@class="nav-link" and text()="Cart"]');
    this.tab = page.locator('//tbody[@id="tbodyid"]//tr');
    this.plcebuto = page.locator('//button[@data-target="#orderModal"]');

    this.placeform = page.locator('//h5[@id="orderModalLabel"]');
    this.placeNam = page.locator('//input[@id="name"]');
    this.placeCou = page.locator('//input[@id="country"]');
    this.placeCit = page.locator('//input[@id="city"]');
    this.placeId = page.locator('//input[@id="card"]');
    this.placeMon = page.locator('//input[@id="month"]');
    this.placeYer = page.locator('//input[@id="year"]');
    this.placePur = page.locator(
      '//button[@class="btn btn-primary" and text()="Purchase"]',
    );
    this.confir = page.locator('div[class*="sweet-alert"]');
    this.conInfo = page.locator('//p[@class="lead text-muted "]');
    this.ok = page.locator('//button[text()="OK"]');
  }
  async booking() {
    const items = this.page.locator('//a[@class="hrefch"]');
    const count = await items.count();

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * count);
      await items.nth(randomIndex).click();
      await this.page.locator('//a[contains(@class,"btn-success")]').click();
      await this.hoo.click();
    }
  }
  async reloaad() {
    await this.page.reload();
  }
  async cartt() {
    await this.carte.click();
  }

  async tabb() {
    const rows = this.page.locator('//tbody[@id="tbodyid"]//tr');
    const count = await rows.count();

    console.log("Total Rows:", count);

    for (let i = 0; i < count; i++) {
      const name = await rows.nth(i).locator("td").nth(1).textContent();
      console.log(`Item ${i + 1}:`, name);
    }
  }

  async delet() {
    const rows = this.page.locator('//tbody[@id="tbodyid"]//tr');

    //  wait until table has at least 1 row
    await this.page.waitForSelector('//tbody[@id="tbodyid"]//tr');

    while ((await rows.count()) > 5) {
      const count = await rows.count();

      const lastRow = rows.nth(count - 1);
      const del = lastRow.locator("//td//a[text()]");

      await del.click();
      await this.page.waitForTimeout(3000);

      //  wait until table updates (row removed)
      await this.page.waitForFunction(
        () => document.querySelectorAll("#tbodyid tr").length > 0,
      );
    }

    console.log("Final Count:", await rows.count());
  }

  //console.log("Final Count:", await rows.count());

  async scrol() {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
  async checkoutt() {
    //  wait for table visible
    await this.page.waitForSelector("#tbodyid tr");

    const prices = await this.page
      .locator('//tbody[@id="tbodyid"]//tr//td[3]')
      .allTextContents();

    let sum = 0;
    for (const p of prices) {
      sum += Number(p);
    }

    // wait for total to be visible
    await this.page.waitForSelector("#totalp");

    const total = Number(await this.page.locator("#totalp").textContent());

    console.log("Sum:", sum);
    console.log("Total:", total);
  }

  async placeorder() {
    await this.plcebuto.hover();
    await this.plcebuto.click();
  }

  async plceOrderFom() {
    await this.placeform.hover();
    await this.placeNam.fill("Satyen");
    await this.placeCou.fill("India");
    await this.placeCit.fill("Indore");
    await this.placeId.fill("4521454589745527");
    await this.placeMon.fill("April");
    await this.placeYer.fill("2026");
  }

  async purchase() {
    await this.placePur.click();
  }

  async confirmation() {
    const coms = await this.conInfo.textContent();
    console.log(coms);
  }

  async okkay() {
    await this.ok.hover();
    await this.ok.click();
  }
}

module.exports = Order;
