import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pom/login/LoginPage";
import { LOCKED_OUT_USER, NON_EXIST_USER, STANDARD_USER } from "../../data";
import { InventoryPage } from "../../pom/inventory/InventoryPage";

test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach("Open login page", async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.load();
    await loginPage.expectPageLoaded();
  });

  test("Log in with a standard user successfully", async ({ page }) => {
    await loginPage.loginWith(STANDARD_USER);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectPageLoaded();
  });

  test("Log in with an incorrect username/password fail", async ({ page }) => {
    await loginPage.loginWith(NON_EXIST_USER);
    await expect(
      loginPage.loginErrorMessage,
      "When the login fails, an error message should be displayed"
    ).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Log in with a locked out user fail", async ({ page }) => {
    await loginPage.loginWith(LOCKED_OUT_USER);
    await expect(
      loginPage.loginErrorMessage,
      "When the user is locked out, an error message should be displayed"
    ).toHaveText("Epic sadface: Sorry, this user has been locked out.");
  });
});
