import { Locator, Page, expect } from "@playwright/test";
import { LoginUser } from "../../models";
import { STANDARD_USER } from "../../data";
import { InventoryPage } from "../inventory/InventoryPage";

export class LoginPage {
  readonly page: Page;
  readonly loginBtn: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginBtn = page.locator("#login-button");
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginErrorMessage = page.getByTestId("error");
  }

  async loginWith(user: LoginUser): Promise<InventoryPage> {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginBtn.click();
    await this.page.waitForLoadState();
    return new InventoryPage(this.page);
  }

  async load() {
    await this.page.goto("/");
  }

  async expectPageLoaded() {
    await expect(this.loginBtn, "Expect log in page is loaded").toBeVisible();
  }

  async loginAsStandardUser(): Promise<InventoryPage> {
    return await this.loginWith(STANDARD_USER);
  }
}
