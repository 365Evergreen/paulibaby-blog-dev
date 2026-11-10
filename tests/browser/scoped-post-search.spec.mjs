import { expect, test } from "@playwright/test";
import { searchPublicPosts } from "../../src/content/publicPostSearch.ts";
import { searchDatabase } from "../fixtures/public-search.mjs";

test.use({ timezoneId: "America/Los_Angeles" });

for (const kind of ["page", "post"]) {
  test(`public ${kind} search stays scoped and resets on navigation`, async ({ page }) => {
    const { db, sqlite } = searchDatabase();
    const queries = [];
    try {
      await page.route("https://blog.paulibaby.com/**", (route) => route.abort());
      await page.route("**/api/**", async (route) => {
        const url = new URL(route.request().url());
        if (url.pathname === "/api/search/posts") {
          queries.push(url.searchParams.get("q"));
          const response = await searchPublicPosts(url.searchParams, db, true);
          return route.fulfill({ status: response.status, json: await response.json() });
        }
        if (url.pathname === "/api/pages/the-beatles" || url.pathname === "/api/posts/album-review") {
          return route.fulfill({ json: {
            id: kind === "page" ? 1 : 2, slug: kind === "page" ? "the-beatles" : "album-review",
            title: "The Beatles", body: "<p>Public document</p>", cover_image: null,
            created_at: "2026-01-01", published_date: "1969-09-26", template: null, template_content: {},
          } });
        }
        if (url.pathname === "/api/posts/the-beatles-abbey-road") {
          return route.fulfill({ json: {
            id: 1, slug: "the-beatles-abbey-road", title: "Abbey Road",
            body: "<p>Album</p>", created_at: "2026-01-01", cover_image: null,
          } });
        }
        // Public shell data is isolated too; no authenticated requests reach a server.
        return route.fulfill({ json: [] });
      });

      await page.goto(kind === "page" ? "/the-beatles" : "/posts/album-review");
      const search = page.getByRole("search");
      await expect(search).toBeVisible();
      if (kind === "post") await expect(page.locator("article time")).toHaveText("September 26, 1969");
      await search.getByRole("button", { name: "Search", exact: true }).click();
      expect(queries).toEqual([]);
      await search.getByRole("searchbox", { name: "Search posts", exact: true }).fill("abbey");
      await search.getByRole("button", { name: "Search", exact: true }).click();
      const section = page.getByRole("region", { name: "Search posts within The Beatles", exact: true });
      await expect(section.getByRole("link")).toHaveCount(4);
      await expect(section).not.toContainText("Abbey elsewhere");
      await expect(section).not.toContainText("Abbey draft");
      await expect(section).not.toContainText("Abbey hidden");
      await section.getByRole("link", { name: "Abbey Road", exact: true }).click();
      await expect(page.getByRole("heading", { name: "Abbey Road", exact: true })).toBeVisible();
      await expect(page.getByRole("searchbox")).toHaveValue("");
      await expect(page.getByRole("region", { name: "Search posts within Abbey Road", exact: true }).getByRole("link")).toHaveCount(0);
    } finally { sqlite.close(); }
  });
}

test("public search shows scoped empty and failure states without widening results", async ({ page }) => {
  let fail = false;
  await page.route("https://blog.paulibaby.com/**", (route) => route.abort());
  await page.route("**/api/**", (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path === "/api/pages/the-beatles") return route.fulfill({ json: {
      id: 1, slug: "the-beatles", title: "The Beatles", body: "", template: null,
    } });
    if (path === "/api/search/posts") {
      return route.fulfill(fail ? { status: 503, json: { error: "Unavailable" } } : { json: [] });
    }
    return route.fulfill({ json: [] });
  });
  await page.goto("/the-beatles");
  await page.getByRole("searchbox").fill("no match");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.getByText("No matching posts within this page.", { exact: true })).toBeVisible();
  fail = true;
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.getByRole("alert")).toHaveText("Unable to search posts. Please try again.");
  await page.getByRole("searchbox").fill("");
  await expect(page.getByRole("alert")).toHaveCount(0);
});
