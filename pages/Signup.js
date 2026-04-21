class SignUp {
    constructor(page) {
        this.page =page;
        this.sign=page.locator('//a[@id="signin2"]');
        this.signpop=page.locator('//h5[@id="signInModalLabel"]');
        this.users=page.locator('//input[@id="sign-username"]');
        this.passs=page.locator('//input[@id="sign-password"]');
        this.buton= page.locator('//button[@type="button" and text()="Sign up"]');
        
    }

    async signn(){
        await this.sign.hover();
        await this.sign.click();
        await this.sign.hover();
        await this.users.fill('satyen@amwebtech.com');
        await this.passs.fill('Test@123');


    }


    async signupbutton(){
        await this.buton.click();
    }
}