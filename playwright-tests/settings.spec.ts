import { test, expect } from "@playwright/test";
import { appPage, setTime } from "./utils";

test("open settings panel", async ({ page }) => {
  const settingsButton = await page.getByTestId("settings");
  // Update the Date accordingly in your test pages
  await setTime(page);
  await page.goto(appPage);
  await settingsButton.click();
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
