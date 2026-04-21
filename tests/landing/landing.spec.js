import { test, expect } from "@playwright/test";
import Home from "../../pages/Home";
const LandingPage = require("../../pages/LandingPage");

test("Login", async ({ page }) => {
  const std = new LandingPage(page);
  const ho = new Home(page);

  await test.step("openurl", async () => {
    await std.goto();
  });

  await test.step("Login User", async () => {
    await std.login();
    await std.wait(2);
    
  });
});