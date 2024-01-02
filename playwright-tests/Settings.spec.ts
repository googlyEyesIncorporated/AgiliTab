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
    mediumUnitName: Locator,
    mediumBeginningDatepicker: Locator,
    mediumEndDatepicker: Locator,
    mediumUnitQuantity: Locator,
    mediumRestoreDefaults: Locator,
    hideButton: Locator,
    settingsPanel: Locator;

  test.beforeEach(async ({ page }) => {
    settingsButton = page.getByTestId("settings");
    mediumDate = page.getByTestId("medium-date");
    mediumLock = page.getByTestId("medium-lock");
    mediumDuration = page.getByTestId("medium-duration");
    mediumUnlock = page.getByTestId("medium-unlock");
    mediumUnitName = page.getByTestId("medium-unit-name");
    mediumBeginningDatepicker = page.getByTestId("medium-beginning-datepicker");
    mediumEndDatepicker = page.getByTestId("medium-end-datepicker");
    mediumUnitQuantity = page.getByTestId("medium-unit-qty");
    mediumDurationFormatInput = page.getByTestId(
      "medium-duration-format-input"
    );
    mediumRestoreDefaults = page.getByTestId("medium-restore-defaults");

    hideButton = page.getByTestId("hide-button");
    settingsPanel = page.getByTestId("hideable-settings");

    // Go to the starting url before each test.
    await page.goto(appPage);
    await settingsButton.click();
  });

  test.describe("Settings", () => {
    test.describe("TermInputs", () => {
      test.skip(`when closing settings panel, unlocked terminputs should lock`, async () => {
        // starts as locked
        await expect(mediumUnlock).toHaveCount(0);
        await expect(mediumLock).toHaveCount(1);

        // shows as unlocked after clicking it
        await mediumLock.click();
        await expect(mediumUnlock).toHaveCount(1);
        await expect(mediumLock).toHaveCount(0);

        // close and reopen the settings
        await hideButton.click();
        await expect(settingsPanel).toHaveClass(/hidden/);
        await settingsButton.click();

        // assert that termInputs have locked when the setttings closed.
        await expect(mediumUnlock).toHaveCount(0);
        await expect(mediumLock).toHaveCount(1);
      });
      test.skip(`termInput's respect locked status`, async () => {
        // term inputs are locked
        await expect(mediumUnlock).toHaveCount(0);
        await expect(mediumLock).toHaveCount(1);
        // check these inputs before we change the type
        await expect(mediumUnitQuantity).toHaveAttribute("disabled");
        await expect(mediumDurationFormatInput).toHaveAttribute("disabled");

        // shows as unlocked after clicking it
        await mediumLock.click();
        await expect(mediumUnlock).toHaveCount(1);
        await expect(mediumLock).toHaveCount(0);

        // inputs are disabled
        await expect(mediumUnitQuantity).not.toHaveAttribute("disabled");
        await expect(mediumDurationFormatInput).not.toHaveAttribute("disabled");
        await expect(mediumDate).not.toHaveAttribute("disabled");
        await expect(mediumDuration).not.toHaveAttribute("disabled");
        await expect(mediumUnitName).not.toHaveAttribute("disabled");
        await expect(mediumBeginningDatepicker).not.toHaveAttribute("disabled");

        // click mediumDate to enable end date input
        await mediumDate.click();
        await expect(mediumEndDatepicker).toBeVisible();
        await expect(mediumEndDatepicker).not.toHaveAttribute("disabled");

        // relock settings
        await mediumUnlock.click();

        // assert that inputs are disabled as expected
        await expect(mediumDate).toHaveAttribute("disabled");
        await expect(mediumDuration).toHaveAttribute("disabled");
        await expect(mediumUnitName).toHaveAttribute("disabled");
        await expect(mediumBeginningDatepicker).toHaveAttribute("disabled");
        await expect(mediumEndDatepicker).toHaveAttribute("disabled");
      });
      test.skip(`locking termInput also prevents resetting values`, async () => {
        // Unlock termInput settings
        await mediumLock.click();

        // set a new value for Unit Name
        mediumUnitName.fill("NewValue");
        await expect(mediumUnitName).toHaveValue("NewValue");

        // re-lock TermInput
        await mediumUnlock.click();

        // attempt to reset values, but fail
        await mediumRestoreDefaults.click();
        await expect(mediumUnitName).toHaveValue("NewValue");

        // unlock TermInput again
        await mediumLock.click();

        // attempt to reset values and succeed
        await mediumRestoreDefaults.click();
        await expect(mediumUnitName).toHaveValue("Month");
      });
    });
  });
});
