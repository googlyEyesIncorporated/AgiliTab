import { test, expect } from "@playwright/test";
import { appPage } from "./utils";
import { Locator } from "playwright-core";

test.describe("Settings", () => {
  let settingsButton: Locator,
    mediumDate: Locator,
    mediumLock: Locator,
    mediumDuration: Locator,
    mediumUnlock: Locator,
    mediumDurationFormatInput: Locator,
    hideButton: Locator,
    settingsPanel: Locator;

  test.beforeEach(async ({ page }) => {
    settingsButton = page.getByTestId("settings");
    mediumDate = page.getByTestId("medium-date");
    mediumLock = page.getByTestId("medium-lock");
    mediumDuration = page.getByTestId("medium-duration");
    mediumUnlock = page.getByTestId("medium-unlock");
    mediumDurationFormatInput = page.getByTestId(
      "medium-duration-format-input"
    );
    hideButton = page.getByTestId("hide-button");
    settingsPanel = page.getByTestId("hideable-settings");

    // Go to the starting url before each test.
    await page.goto(appPage);
    await settingsButton.click();
  });

  test.describe("Settings", () => {
    test(`when closing settings panel, unlocked terminputs should lock  `, async () => {
      // starts as locked
      await expect(mediumUnlock).toHaveCount(0);
      await expect(mediumLock).toHaveCount(1);
      await expect(mediumDate).toHaveAttribute("disabled");
      await expect(mediumDuration).toHaveAttribute("disabled");
      await expect(mediumDurationFormatInput).toHaveAttribute("disabled");

      // shows as unlocked after clicking it
      await mediumLock.click();
      await expect(mediumUnlock).toHaveCount(1);
      await expect(mediumLock).toHaveCount(0);
      await expect(mediumDate).not.toHaveAttribute("disabled");
      await expect(mediumDuration).not.toHaveAttribute("disabled");
      await expect(mediumDurationFormatInput).not.toHaveAttribute("disabled");

      // close and reopen the settings
      await hideButton.click();
      await expect(settingsPanel).toHaveClass(/hidden/);
      await settingsButton.click();

      // assert that termInputs have locked when the setttings closed.
      await expect(mediumUnlock).toHaveCount(0);
      await expect(mediumLock).toHaveCount(1);
      await expect(mediumDate).toHaveAttribute("disabled");
      await expect(mediumDuration).toHaveAttribute("disabled");
      await expect(mediumDurationFormatInput).toHaveAttribute("disabled");
    });
  });
});
