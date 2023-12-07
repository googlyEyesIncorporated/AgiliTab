import { test, expect } from "@playwright/test";
import { setTime } from "./utils";
const appPage = "http://127.0.0.1:3000";

// Pick the new/fake "now" for you test pages.
const fakeNow = new Date("September 25 2023 12:20:00").valueOf();

test("has title", async ({ page }) => {
  await page.goto(appPage);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AgiliTab/);
});

test("passes visual regression", async ({ page }) => {
  // Update the Date accordingly in your test pages
  await setTime(page);
  await page.goto(appPage);
  await expect(page).toHaveScreenshot();
});

// xtest("get started link", async ({ page }) => {
//   await page.goto(appPage);

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });
