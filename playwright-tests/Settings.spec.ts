import { test, expect } from "@playwright/test";
import { appPage, setTime } from "./utils";
import { Locator } from "playwright-core";
import { epochTimes } from "../src/commonTestData.json";
import { DateTime } from "luxon";

import { DATE_TIME_NO_SECONDS } from "../src/commonUtils";
const { Sep012023, Sep152023 } = epochTimes;

const zeroDaysLater =
  DateTime.fromMillis(Sep012023).toFormat(DATE_TIME_NO_SECONDS) ?? "09/01/2023";

const twentyFiveDaysLater = DateTime.fromMillis(Sep012023)
  .plus({ days: 25 })
  .toFormat(DATE_TIME_NO_SECONDS);

const fiftyDaysLater = DateTime.fromMillis(Sep012023)
  .plus({ days: 50 })
  .toFormat(DATE_TIME_NO_SECONDS);

const hundredDaysLater = DateTime.fromMillis(Sep012023)
  .plus({ days: 99 })
  .toFormat(DATE_TIME_NO_SECONDS);

test.describe("Settings", () => {
  let groupOneDate: Locator,
    groupEndDatepicker: Locator,
    groupOneUnitQuantity: Locator,
    groupOneRestoreDefaults: Locator,
    groupTitle: Locator,
    groupOneUnitName: Locator,
    groupBeginningDatepicker: Locator,
    groupElapsedTime: Locator,
    groupSettingsButton: Locator,
    groupOneDurationFormat: Locator;

  test.beforeEach(async ({ page }) => {
    groupSettingsButton = page.getByTestId("group-1-settings");
    groupTitle = page.getByTestId("group-1-title");
    groupBeginningDatepicker = page.getByTestId("group-1-beginning-datepicker");
    groupEndDatepicker = page.getByTestId("group-1-end-datepicker");
    groupElapsedTime = page.getByTestId("group-1-elapsed-time");
    groupOneUnitName = page.getByTestId("group-1-unit-name");
    groupOneDate = page.getByTestId("group-1-date");
    groupOneUnitQuantity = page.getByTestId("group-1-unit-qty");
    groupOneDurationFormat = page.getByTestId("group-1-duration-format-input");
    groupOneRestoreDefaults = page.getByTestId("group-1-restore-defaults");
  });

  test.describe("Settings", () => {
    test.describe("TermInputs", () => {
      test(`clicking the gear icon opens the settings dialogue`, async ({
        page,
      }) => {
        // Update the Date accordingly in your test pages
        await setTime(page, Sep152023);
        // Go to the starting url before each test.
        await page.goto(appPage);

        await page.hover('[data-testid="group-1-header"]');
        await groupSettingsButton.click();

        await expect(groupOneUnitName).toBeVisible();
      });
      test(`changing group name updates the title`, async ({ page }) => {
        // Update the Date accordingly in your test pages
        await setTime(page, Sep152023);
        // Go to the starting url before each test.
        await page.goto(appPage);

        await page.hover('[data-testid="group-1-header"]');
        await groupSettingsButton.click();

        // establish baseline
        await expect(groupTitle).toBeVisible();
        await expect(groupOneUnitName).toBeVisible();
        await expect(groupTitle).toHaveText("Month");

        // update text and verify change
        const ChangedValue = "ChangedValue";
        groupOneUnitName.fill(ChangedValue);
        await expect(groupTitle).toHaveText(ChangedValue);
      });
      test(`changing beginning date updates the total elapsed time percentage`, async ({
        page,
      }) => {
        // Openening sequence
        await setTime(page, DateTime.fromISO(fiftyDaysLater).toMillis());
        await page.goto(appPage);
        await page.hover('[data-testid="group-1-header"]');
        await groupSettingsButton.click();

        // establish baseline and set an end date with a nice round number of days in duration (100)
        await groupBeginningDatepicker.fill(zeroDaysLater);
        await groupOneDurationFormat.selectOption("days");
        await groupOneUnitQuantity.fill("99");

        // verify orginal value
        await expect(groupElapsedTime).toHaveText("50%");

        // set and verify changed value
        await groupBeginningDatepicker.fill(twentyFiveDaysLater);
        await expect(groupElapsedTime).toHaveText("25%");
      });
      test(`changing end date updates the total elapsed time percentage`, async ({
        page,
      }) => {
        // Openening sequence
        await setTime(page, DateTime.fromISO(fiftyDaysLater).toMillis());
        await page.goto(appPage);
        await page.hover('[data-testid="group-1-header"]');
        await groupSettingsButton.click();

        // verify orginal value
        await expect(groupElapsedTime).toHaveText("64%"); // 20/31 = 64% (rounded down)

        // establish baseline
        await groupBeginningDatepicker.fill(zeroDaysLater);

        // set and verify changed value
        await groupOneDate.click();
        await groupEndDatepicker.fill(hundredDaysLater);
        await expect(groupElapsedTime).toHaveText("50%"); // 50/100 === 49% (rounded down)
      });
      test(`changing duration qty updates the total elapsed time percentage`, async ({
        page,
      }) => {
        // Openening sequence
        await setTime(page, DateTime.fromISO(twentyFiveDaysLater).toMillis());
        await page.goto(appPage);
        await page.hover('[data-testid="group-1-header"]');
        await groupSettingsButton.click();

        // Set beginning value to baseline
        await groupBeginningDatepicker.fill(zeroDaysLater);

        // verify orginal value
        await expect(groupElapsedTime).toHaveText("83%"); // 25/30 = 5/6 = 83%

        // set and verify changed value
        await groupOneDurationFormat.selectOption("days");
        await groupOneUnitQuantity.fill("99");
        await expect(groupElapsedTime).toHaveText("25%");
      });
      test(`changing duration unit updates the total elapsed time percentage`, async ({
        page,
      }) => {
        // Openening sequence
        await setTime(page, DateTime.fromISO(twentyFiveDaysLater).toMillis());
        await page.goto(appPage);
        await page.hover('[data-testid="group-1-header"]');
        await groupSettingsButton.click();

        // Set beginning value to baseline
        await groupBeginningDatepicker.fill(zeroDaysLater);

        // verify orginal value
        await expect(groupElapsedTime).toHaveText("83%"); // 25/30 = 5/6 = 83%

        // set and verify changed value
        await groupOneUnitQuantity.fill("99");
        await groupOneDurationFormat.selectOption("days");
        await expect(groupElapsedTime).toHaveText("25%");
      });
      test(`clicking restore defaults resets the values`, async ({ page }) => {
        // Openening sequence
        await setTime(page, DateTime.fromISO(fiftyDaysLater).toMillis());
        await page.goto(appPage);
        await page.hover('[data-testid="group-1-header"]');
        await groupSettingsButton.click();

        // verify orginal value
        await expect(groupElapsedTime).toHaveText("64%"); // 20/31 = 64% (rounding down)

        // Change values
        await groupBeginningDatepicker.fill(zeroDaysLater);
        await groupOneDurationFormat.selectOption("days");
        await groupOneUnitQuantity.fill("99");
        await expect(groupElapsedTime).toHaveText("50%"); // 50/100 = 50%

        // reset and verify changed values
        await groupOneRestoreDefaults.click();
        await expect(groupElapsedTime).toHaveText("64%"); // (rounding down)
        await expect(groupOneDurationFormat).toHaveValue("months");
        await expect(groupOneUnitQuantity).toHaveValue("1");
        await expect(groupBeginningDatepicker).toHaveValue("2023-10-01T00:00");
      });
    });
  });
});
