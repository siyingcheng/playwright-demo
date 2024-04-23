import { expect, test } from "@playwright/test";
import { InventoryPage } from "../../pom/inventory/InventoryPage";
import { LoginPage } from "../../pom/login/LoginPage";
import { CartPage } from "../../pom/inventory/CartPage";

const firstItem = {
  label: "Sauce Labs Fleece Jacket",
  price: "$49.99",
};

const secondItem = {
  label: "Sauce Labs Onesie",
  price: "$7.99",
};

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;

test.describe("Add item to cart", () => {
  test.beforeEach("Log in with a standard user", async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.load();
    await loginPage.loginAsStandardUser();
    inventoryPage = new InventoryPage(page);
    await inventoryPage.expectPageLoaded();
  });

  test("The cart default should be empty", async ({ page }) => {
    await inventoryPage.expectCartEmpty();
  });

  test("Add items to cart successfully", async ({ page }) => {
    // add first item
    await inventoryPage.addItemToCart(firstItem);
    await inventoryPage.expectCartCount(1);

    // add second item
    await inventoryPage.addItemToCart(secondItem);
    await inventoryPage.expectCartCount(2);

    // open cart and check items are correct
    cartPage = await inventoryPage.openCart();
    await cartPage.expectCartContains([firstItem, secondItem]);
  });
});

test.describe("Operations in cart", () => {
  test.beforeEach("Log in and add two items to cart", async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.load();
    await loginPage.loginAsStandardUser();
    inventoryPage = new InventoryPage(page);
    await inventoryPage.expectPageLoaded();
    await inventoryPage.addItemToCart(firstItem);
    await inventoryPage.addItemToCart(secondItem);
    cartPage = await inventoryPage.openCart();
  });

  test("Remove item from cart", async ({ page }) => {
    // remove first item
    await cartPage.removeItem(firstItem);
    await cartPage.expectCartItemCount(1);

    // remove second item
    await cartPage.removeItem(secondItem);
    await cartPage.expectCartItemCount(0);
  });

  test("Continue shopping should redirect to inventory page", async ({
    page,
  }) => {
    inventoryPage = await cartPage.continueShopping();
    await inventoryPage.expectPageLoaded();

    await cartPage.expectCartClosed();
  });
});
