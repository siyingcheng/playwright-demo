import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../pom/login/LoginPage";
import { MenuComponent } from "../../pom/conponents/MenuComponent";
import { InventoryPage } from "../../pom/inventory/InventoryPage";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let menuComponent: MenuComponent;

test.describe("Menu", () => {
  test.beforeEach("Login as an standard user", async ({ page }) => {
    loginPage = new LoginPage(page);
    loginPage.load();
    inventoryPage = await loginPage.loginAsStandardUser();
  });

  test("Log out from inventory page", async ({ page }) => {
    menuComponent = new MenuComponent(page);
    await menuComponent.logout();
    // Log out should redirect to login page
    await loginPage.expectPageLoaded();
  });

  test("Log out from cart page", async ({ page }) => {
    const cartPage = await inventoryPage.openCart();
    menuComponent = new MenuComponent(page);
    await menuComponent.logout();
    // Log out should redirect to login page
    await loginPage.expectPageLoaded();
  });
});
