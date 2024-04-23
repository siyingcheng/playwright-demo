import { Locator, Page } from "@playwright/test";
import { LoginUser } from "../../models";

export class LoginPage {
  page: Page;
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

  async goto() {
    await this.page.goto("/");
  }

  loginButton() {
    return this.loginBtn;
  }
}
