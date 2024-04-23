import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  page: Page;
  readonly cartBtn: Locator;
  constructor(page) {
    this.page = page;
    this.cartBtn = page.locator("#shopping_cart_container > a");
  }

  async load() {
    await this.page.goto("/inventory.html");
  }

  cartButton() {
    return this.cartBtn;
  }
}
