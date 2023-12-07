import { test, expect } from "@playwright/test";
import { appPage, setTime } from "./utils";
import { Locator } from "playwright-core";

test.describe("Settings", () => {
  let settingsButton: Locator,
    bgColorPicker: Locator,
    dateFormatPicker: Locator,
    timeFormatPicker: Locator;
  test.beforeEach(async ({ page }) => {
    //  Locators:
    settingsButton = page.getByTestId("settings");
    bgColorPicker = page.getByTestId("bgColor-picker");
    dateFormatPicker = page.getByTestId("date-format-input");
    timeFormatPicker = page.getByTestId("time-format-input");
    // Update the Date accordingly in your test pages
    await setTime(page);
    // Go to the starting url before each test.
    await page.goto(appPage);
  });

  test("open settings panel", async ({ page }) => {
    await settingsButton.click();
    await expect(page).toHaveScreenshot();
  });

  test("open color picker", async ({ page }) => {
    await settingsButton.click();
    await bgColorPicker.click();
    await expect(page).toHaveScreenshot();
  });

  test("open date format picker", async ({ page }) => {
    await settingsButton.click();
    await dateFormatPicker.click();
    await expect(page).toHaveScreenshot();
  });

  test("open time format picker", async ({ page }) => {
    await settingsButton.click();
    await timeFormatPicker.click();
    await expect(page).toHaveScreenshot();
  });
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
