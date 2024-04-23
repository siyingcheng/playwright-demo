import { Locator, Page, expect } from "@playwright/test";
import { CartItem } from "../../models";
import { InventoryPage } from "./InventoryPage";

export class CartPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;
  readonly continueShoppingBtn: Locator;
  readonly cartList: Locator;

  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.getByTestId("checkout");
    this.continueShoppingBtn = page.getByTestId("continue-shopping");
    this.cartList = page.getByTestId("cart-list");
  }

  async expectCartOpened() {
    await expect(this.checkoutBtn, "Expect cart to be opened").toBeVisible();
  }

  async expectCartClosed() {
    await expect(
      this.checkoutBtn,
      "Expect cart to be closed"
    ).not.toBeVisible();
  }

  async expectCartContains(items: CartItem[]) {
    for (const item of items) {
      const matchedItem = await this.findItemBy(item);
      await expect(
        matchedItem,
        `Expect cart to contain ${item.label}`
      ).toBeVisible();

      const price = matchedItem
        .first()
        .getByTestId("inventory-item-price")
        .textContent();
      expect(
        await price,
        `Expect ${item.label} price to be ${item.price}`
      ).toBe(item.price);
    }
  }

  async expectCartItemCount(count: number) {
    await expect(
      this.cartList.locator(".cart_item"),
      `Expect ${count} items in cart`
    ).toHaveCount(count);
  }

  async removeItems(items: CartItem[]) {
    for (const item of items) {
      await this.removeItem(item);
    }
  }

  async removeItem(item: CartItem) {
    const matchedItem = await this.findItemBy(item);
    await matchedItem.first().getByText("Remove", { exact: true }).click();
  }

  private async findItemBy(item: CartItem) {
    return await this.cartList.locator(".cart_item").filter({
      has: this.page
        .getByTestId("inventory-item-name")
        .getByText(item.label, { exact: true }),
    });
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
    return new InventoryPage(this.page);
  }
}
