import { test, expect } from "@playwright/test";

const appPage = "https://127.0.0.1:3000";

test("has title", async ({ page }) => {
  await page.goto(appPage);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AgiliTab/);
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
