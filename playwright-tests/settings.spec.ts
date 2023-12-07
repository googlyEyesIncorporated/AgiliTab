import { test, expect } from "@playwright/test";
import { appPage, setTime } from "./utils";
import { Locator } from "playwright-core";

test.describe("Settings", () => {
  //  Locators:
  let settingsButton: Locator,
    bgColorPicker: Locator,
    dateFormatPicker: Locator,
    timeFormatPicker: Locator,
    infoIcon: Locator,
    mediumLock: Locator,
    mediumDurationFormatInput: Locator,
    mediumDate: Locator,
    maskTimeFormatWithSeconds: Locator;

  // mediumUnlock: Locator,
  // mediumRestoreDefaults: Locator,
  // mediumDuration: Locator,
  // longDuration: Locator,
  // longDate: Locator;
  test.beforeEach(async ({ page }) => {
    settingsButton = page.getByTestId("settings");
    bgColorPicker = page.getByTestId("bgColor-picker");
    dateFormatPicker = page.getByTestId("date-format-input");
    timeFormatPicker = page.getByTestId("time-format-input");
    mediumDate = page.getByTestId("medium-date");
    mediumLock = page.getByTestId("medium-lock");
    mediumDurationFormatInput = page.getByTestId(
      "medium-duration-format-input"
    );
    maskTimeFormatWithSeconds = page.getByTestId("date-time-format-h:mm:ss a");
    infoIcon = page.getByTestId("info-icon");

    // mediumDuration = page.getByTestId("medium-duration");
    // mediumUnlock = page.getByTestId("medium-unlock");
    // mediumDurationFormatInput = page.getByTestId("medium-duration-format-input");
    // longDuration = page.getByTestId("long-duration");
    // longDate = page.getByTestId("long-date");

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
    await expect(page).toHaveScreenshot({ mask: [maskTimeFormatWithSeconds] });
  });

  test("open medium term duration format", async ({ page }) => {
    await settingsButton.click();
    await mediumLock.click();
    await mediumDurationFormatInput.click();
    await expect(page).toHaveScreenshot();
  });

  test("switch to medium term date format", async ({ page }) => {
    await settingsButton.click();
    await mediumLock.click();
    await mediumDate.click();
    await expect(page).toHaveScreenshot();
  });

  test("open info box", async ({ page }) => {
    await settingsButton.click();
    await infoIcon.click();
    await expect(page).toHaveScreenshot();
  });
});
