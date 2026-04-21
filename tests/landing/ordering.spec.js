import { test, expect } from "@playwright/test";
import Home from "../../pages/Home";
const LandingPage = require("../../pages/LandingPage");
const Order = require("../../pages/Order");

test("Ordering", async ({ page }) => {
  const std = new LandingPage(page);
  const ho = new Home(page);
  const od = new Order(page);

  await test.step("openurl", async () => {
    await std.goto();
  });

  await test.step("Login User", async () => {
    await std.login();
    await std.wait(2);
  });

  await test.step("Booking Items", async () => {
    await od.booking();
    console.log("Items added successfully");
  });

  await test.step("Navigate to  cart", async () => {
    await od.cartt();
    await od.reloaad();
    await std.wait(2);

    console.log("Cart opened");
  });

  await test.step("Cart Operations", async () => {
    await od.tabb();
    console.log("Items Traced successfully");
    await od.reloaad();
  });

  await test.step("Delete Ops", async () => {
    await od.delet();
    await od.reloaad();
    await std.wait(2);
  });

  await test.step("Price Count", async () => {
    await od.delet();
    await od.checkoutt();
    await std.wait(2);

    console.log("Totaling correct");
  });

  await test.step("PlaceOrderButton" ,async()=>{
    await od.placeorder();
  })

  await test.step("place order form" ,async()=>{
    await od.plceOrderFom()
    await std.wait(1);
    await od.purchase();
  })

  await test.step("Confirmation of Purchase" ,async()=>{
    await od.confirmation();
    await std.wait(1);
    await od.okkay();
  })
});
