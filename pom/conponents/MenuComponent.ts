import { Locator, Page } from "@playwright/test";
import { LoginPage } from "../login/LoginPage";

export class MenuComponent {
  readonly page: Page;
  readonly menuBtn: Locator;
  readonly closeBtn: Locator;
  readonly allItemLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Two ways to find locators by id:
    this.menuBtn = page.locator("id=react-burger-menu-btn");
    this.closeBtn = page.locator("#react-burger-cross-btn");
    this.allItemLink = page.locator("#inventory_sidebar_link");
    this.aboutLink = page.locator("#about_sidebar_link");
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.resetAppStateLink = page.locator("#reset_sidebar_link");
  }

  async open() {
    if (await this.closeBtn.isVisible()) {
      return;
    }
    if (!(await this.menuBtn.isVisible())) {
      throw new Error("Menu button is not enabled");
    }
    await this.menuBtn.click();
  }

  async close() {
    if (await this.menuBtn.isVisible()) {
      return;
    }
    if (!(await this.closeBtn.isVisible())) {
      throw new Error("Close button is not enabled");
    }
    await this.closeBtn.click();
  }

  async logout() {
    await this.open();
    await this.logoutLink.click();
    return new LoginPage(this.page);
  }
}
