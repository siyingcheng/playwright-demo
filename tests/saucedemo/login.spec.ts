import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pom/login/LoginPage";
import { STANDARD_USER } from "../../data";
import { InventoryPage } from "../../pom/login/InventoryPage";

test.describe("Verify Login", () => {
  test("Login with a standard user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.loginButton()).toBeVisible();

    await loginPage.loginWith(STANDARD_USER);
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.cartButton()).toBeVisible();
  });
});
