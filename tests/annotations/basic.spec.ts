import { test, expect } from "@playwright/test";

// test.only("focus this test", async ({ page }) => {
//   // Run only focused tests in the entire project.
// });

test.skip("skip this test", async ({ page }) => {
  // This test is not run
});

test("skip this test when browser is chromium", async ({
  page,
  browserName,
}) => {
  test.skip(browserName === "chromium", "Still working on it");
});

test.fail("this test should fail", async ({ page }) => {
  expect(1).toBe(2);
});

test.fail("this test should fail, but not", async ({ page }) => {
  expect(1).toBe(1);
});

test.fixme("this test should fix", async ({ page }) => {
  // marks the test as failing. Playwright will not run this test, as opposed to the fail annotation. Use fixme when running the test is slow or crashes.
});

test("this test is slow", async ({ page, browserName }) => {
  // marks the test as slow and triples the test timeout.
  // test.slow();
  // Or with conditional
  test.slow(browserName === "chromium", "This feature is slow in chromium");
});
