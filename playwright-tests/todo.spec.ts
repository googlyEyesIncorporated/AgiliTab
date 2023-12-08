import { test, expect } from "@playwright/test";
import { appPage, setTime } from "./utils";
import { Locator } from "playwright-core";

test.describe("Todo", () => {
  let mediumEditPriorities: Locator,
    todoInputMedium: Locator,
    mediumAddItemButton: Locator,
    listItemCheckbox0: Locator,
    listItem0: Locator;
  test.beforeEach(async ({ page }) => {
    mediumEditPriorities = page.getByTestId(
      "mediumTermList-edit-priorities-link"
    );
    todoInputMedium = page.getByTestId("todo-input-mediumTermList");
    mediumAddItemButton = page.getByTestId("mediumTermList-add-item-button");
    listItemCheckbox0 = page.getByTestId("list-item-checkbox-0");
    listItem0 = page.getByTestId("list-item-0");
    await setTime(page);
    await page.goto(appPage);
    await mediumEditPriorities.click();
  });
  test.describe("Visual Regression", () => {
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
});
