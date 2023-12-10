import { test, expect } from "@playwright/test";
import { appPage } from "./utils";

test("has title", async ({ page }) => {
  await page.goto(appPage);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AgiliTab/);
});
