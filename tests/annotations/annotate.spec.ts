import { test, expect } from "@playwright/test";

test(
  "test login page",
  {
    annotation: {
      type: "issue",
      description: "https://github.com/microsoft/playwright/issues/23180",
    },
  },
  async ({ page }) => {
    // ...
  }
);

test.describe(
  "report tests",
  {
    annotation: { type: "category", description: "report" },
  },
  () => {
    test("test report header", async ({ page }) => {
      // ...
    });

    test(
      "test full report",
      {
        annotation: [
          {
            type: "issue",
            description: "https://github.com/microsoft/playwright/issues/23180",
          },
          { type: "performance", description: "very slow test!" },
        ],
      },
      async ({ page }) => {
        // ...
      }
    );
  }
);

test("Add annotation to test when test running", async ({ page, browser }) => {
  test.info().annotations.push({
    type: "browser version",
    description: browser.version(),
  });

  // ...
});
