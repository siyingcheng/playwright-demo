import { Locator, Page, expect } from "@playwright/test";
import { CartItem } from "../../models";
import { CartPage } from "./CartPage";

export class InventoryPage {
  readonly page: Page;
  readonly cartBtn: Locator;

  constructor(page) {
    this.page = page;
    this.cartBtn = page.getByTestId("shopping-cart-link");
  }

  async load() {
    await this.page.goto("/inventory.html");
  }

  async expectPageLoaded() {
    await expect(this.cartBtn, "Expect Inventory page is loaded").toBeVisible();
  }

  async addItemToCart(item: CartItem) {
    await this.page
      .getByTestId("inventory-item-description")
      .filter({ has: this.page.locator(`text=${item.label}`) })
      .first()
      .getByText("Add to cart", { exact: true })
      .click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartBtn, `Expect cart count to be ${count}`).toHaveText(
      count.toString()
    );
  }

  async expectCartEmpty() {
    expect(
      await this.cartBtn.textContent(),
      "Expect cart to be empty"
    ).toHaveLength(0);
  }

  async openCart() {
    await this.cartBtn.click();
    return new CartPage(this.page);
  }
}
