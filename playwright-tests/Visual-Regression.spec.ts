import { test, expect } from "@playwright/test";
import { appPage, setTime } from "./utils";
import { Locator } from "playwright-core";

const viewports = [
  // { width: 2560, height: 1400 },
  { width: 1920, height: 1080 },
  // { width: 1600, height: 900 },
  // { width: 1536, height: 864 },
  // { width: 1440, height: 900 },
  // { width: 1366, height: 768 },
  { width: 1280, height: 720 },
];
for (const viewport of viewports) {
  test.describe(`Visual Regression Testing (${viewport.width} x ${viewport.height})`, async () => {
    test.use({ viewport: viewport });
    //  Locators:
    let settingsButton: Locator,
      bgColorPicker: Locator,
      dateFormatPicker: Locator,
      timeFormatPicker: Locator,
      infoIcon: Locator,
      mediumLock: Locator,
      mediumDurationFormatInput: Locator,
      mediumDate: Locator,
      maskTimeFormatWithSeconds: Locator,
      mediumEditPriorities: Locator,
      todoInputMedium: Locator,
      mediumAddItemButton: Locator,
      listItemCheckbox0: Locator,
      listItem0: Locator;

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
      maskTimeFormatWithSeconds = page.getByTestId(
        "date-time-format-h:mm:ss a"
      );
      infoIcon = page.getByTestId("info-icon");
      mediumEditPriorities = page.getByTestId(
        "mediumTermList-edit-priorities-link"
      );
      todoInputMedium = page.getByTestId("todo-input-mediumTermList");
      mediumAddItemButton = page.getByTestId("mediumTermList-add-item-button");
      listItemCheckbox0 = page.getByTestId("list-item-checkbox-0");
      listItem0 = page.getByTestId("list-item-0");

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

    test.describe("Settings", () => {
      test.beforeEach("", async () => {
        await settingsButton.click();
      });
      test("open settings panel", async ({ page }) => {
        await expect(page).toHaveScreenshot();
      });

      test("open color picker", async ({ page }) => {
        await bgColorPicker.click();
        await expect(page).toHaveScreenshot();
      });

      test("open date format picker", async ({ page }) => {
        await dateFormatPicker.click();
        await expect(page).toHaveScreenshot();
      });

      test("open time format picker", async ({ page }) => {
        await timeFormatPicker.click();
        await expect(page).toHaveScreenshot({
          mask: [maskTimeFormatWithSeconds],
        });
      });

      test("open medium term duration format", async ({ page }) => {
        await mediumLock.click();
        await mediumDurationFormatInput.click();
        await expect(page).toHaveScreenshot();
      });

      test("switch to medium term date format", async ({ page }) => {
        await mediumLock.click();
        await mediumDate.click();
        await expect(page).toHaveScreenshot();
      });

      test("open info box", async ({ page }) => {
        await infoIcon.click();
        await expect(page).toHaveScreenshot();
      });
    });
    test.describe("Todo", () => {
      test.beforeEach("", async () => {
        await mediumEditPriorities.click();
      });
      test("open todo input", async ({ page }) => {
        await expect(page).toHaveScreenshot();
      });
      test("input text", async ({ page }) => {
        todoInputMedium.fill("Todo 1");
        await expect(page).toHaveScreenshot();
      });
      test("input text and add item", async ({ page }) => {
        todoInputMedium.fill("Todo 1");
        mediumAddItemButton.click();
        await expect(page).toHaveScreenshot();
      });
      test("input text and add item and edit item", async ({ page }) => {
        todoInputMedium.fill("Todo 1");
        mediumAddItemButton.click();
        await page.waitForSelector(".todo-text");
        await listItem0.dblclick();
        await expect(page).toHaveScreenshot();
      });
      test("input text and add items and mark done", async ({ page }) => {
        todoInputMedium.fill("Todo 1");
        mediumAddItemButton.click();
        await listItemCheckbox0.click({ force: true });
        await expect(page).toHaveScreenshot();
      });
    });
    test("Main page", async ({ page }) => {
      // Update the Date accordingly in your test pages
      await expect(page).toHaveScreenshot();
    });
  });
}
