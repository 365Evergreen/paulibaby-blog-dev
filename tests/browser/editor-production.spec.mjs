import { readdirSync } from "node:fs";
import { expect, test } from "@playwright/test";

const chunks = readdirSync(new URL("../../dist/client/assets/", import.meta.url))
  .filter((name) => /^editor-vendor-.*\.js$/.test(name));

test("production build contains the retained Tiptap vendor bundle", () => {
  expect(chunks.length).toBeGreaterThan(0);
});

for (const chunk of chunks) {
  test(`production editor module initializes: ${chunk}`, async ({ page }) => {
    // A blank, unauthenticated harness imports only the production vendor
    // module. Never navigate to an admin route or request an authenticated API.
    await page.route("**/__editor-bundle-check", (route) =>
      route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Bundle check</title>" }),
    );
    await page.route("**/api/**", (route) => route.abort());
    await page.goto("/__editor-bundle-check");
    const result = await page.evaluate(async (url) => {
      try {
        await import(url);
        return null;
      } catch (error) {
        return error instanceof Error ? `${error.name}: ${error.message}` : String(error);
      }
    }, `/assets/${chunk}`);
    expect(result).toBeNull();
  });
}
