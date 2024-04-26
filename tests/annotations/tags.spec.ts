import { test, expect } from "@playwright/test";

test(
  "test login page",
  {
    tag: "@fast",
  },
  async ({ page }) => {
    // ...
  }
);

test("test full report @slow", async ({ page }) => {
  // ...
});

test.describe(
  "group",
  {
    tag: "@report",
  },
  () => {
    test("test report header", async ({ page }) => {
      // ...
    });

    test(
      "test full report",
      {
        tag: ["@slow", "@vrt"],
      },
      async ({ page }) => {
        // ...
      }
    );
  }
);
