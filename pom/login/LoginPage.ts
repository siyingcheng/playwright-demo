import { Locator, Page, expect } from "@playwright/test";
import { LoginUser } from "../../models";
import { STANDARD_USER } from "../../data";

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

  async loginWith(user: LoginUser) {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginBtn.click();
  }

  async load() {
    await this.page.goto("/");
  }

  async expectPageLoaded() {
    await expect(this.loginBtn, "Expect log in page is loaded").toBeVisible();
  }

  async loginAsStandardUser() {
    await this.loginWith(STANDARD_USER);
  }
}
