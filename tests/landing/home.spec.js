import { test, expect } from "@playwright/test";
import LandingPage from "../../pages/LandingPage";
import { asyncWrapProviders } from "node:async_hooks";
const Hom = require("../../pages/Home");

test("Home", async ({ page }) => {
  const ho = new Hom(page);
  const std = new LandingPage(page);

  await test.step("openurl", async () => {
    await std.goto();
    await std.login();
    await ho.visit();
  });

  await test.step("Check Corsole Function", async()=>{

    await ho.corsoPre();
    await ho.wait(2);
    await ho.corsoNex();
    await ho.wait(2);
    
    console.log("Checked Corsole Function");
  })

  await test.step("Check Categories", async()=>{
    await ho.cator();
    //await ho.card();
    console.log("Checked Categories");
  })

  await test.step("Card Names", async()=>{
    //await ho.cator();
    await ho.card();
    console.log("Checked Card names");
  })

  await test.step("button checked", async()=>{
    //await ho.cator();
    await ho.buchek();
    console.log("Checked button");
  })

  await test.step("Contact" , async()=>{
    await ho.contact();
  })


});


