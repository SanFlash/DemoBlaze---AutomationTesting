class Home {
  constructor(page) {
    this.page = page;
    this.buton = page.locator('//button[@type="button" and text()="Sign up"]');
    this.chek = page.locator('//a[@id="nameofuser"]');
    this.prev = page.locator('//span[@class="sr-only" and text()="Previous"]');
    this.nex = page.locator('//span[@class="sr-only" and text()="Next"]');
    this.category = page.locator('//div[@class="list-group"]//a');
    this.footprev = page.locator('//button[@id="prev2"]');
    this.footnex = page.locator('//button[@id="next2"]');
    this.contac = page.locator('//a[@class="nav-link" and text()="Contact"]');
    this.sendms =page.locator('//button[@type="button" and text()="Send message"]');
    this.newmsg = page.locator('//h5[@id="exampleModalLabel"]').textContent();
    this.emai = page.locator('//input[@id="recipient-email"]');
    this.namee=page.locator('//input[@id="recipient-name"]');
    this.txtare = page.locator('//textarea[@id="message-text"]');
    
  }

  async wait(seconds) {
    await this.page.waitForTimeout(seconds * 1000);
  }

  async visit() {
    await this.chek.hover();
    let l = await this.chek.textContent();
    console.log(l);
  }

  async corsoPre() {
    await this.prev.hover();
    await this.prev.click();
  }

  async corsoNex() {
    await this.nex.hover();
    await this.nex.click();
  }

  async cator() {
    const links = this.page.locator('//div[@class="list-group"]//a');

    const count = await links.count();

    for (let i = 1; i < count; i++) {
      const text = await links.nth(i).textContent();
      console.log(text);
    }
    console.log("Done")

  }


  async card(){
    const cardd =this.page.locator('//h4[@class="card-title"]');
    const cardCose =this.page.locator('//div[@class="card-block"]//h5')
    const count = await cardd.count();

    for (let i = 0; i < count; i++) {
      const text = await cardd.nth(i).textContent();
      const texts = await cardCose.nth(i).textContent();
      console.log(text);
      console.log(texts);
    }
  }

  async buchek(){
    await this.footnex.hover();
    await this.footnex.click();
    await this.footprev.hover();
    await this.footprev.click();
  }

  async contact(){
    await this.contac.hover();
    await this.contac.click();
    console.log("Contact Open");
    await this.emai.fill('satyen@amwebtech.com');
    await this.namee.fill('Satyendra');
    await this.txtare.fill('This is the demo message for the textarea \n do not have time to finish the complete\n message so  dont waste your time.');
    await this.sendms.click();
    console.log("Sended senseless message");
  }




}

module.exports = Home;
