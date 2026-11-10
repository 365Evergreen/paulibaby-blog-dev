import { expect, test } from "@playwright/test";
import worker from "../../dist/paulibaby/index.js";
import { playlistDatabase, playlistRequest, samplePlaylist } from "../fixtures/video-playlists.mjs";

async function isolate(page, db, token) {
  await page.route("**/api/**", async route => {
    const original = route.request();
    const url = new URL(original.url());
    if (url.pathname.startsWith("/api/video-playlists") || url.pathname.startsWith("/api/admin/video-playlists") || url.pathname === "/api/auth/me") {
      const response = await worker.fetch(new Request(`https://fixture.invalid${url.pathname}`, {
        method: original.method(),
        headers: await original.allHeaders(),
        ...(original.postData() ? { body: original.postData() } : {}),
      }), { DB: db });
      return route.fulfill({ status: response.status, json: await response.json() });
    }
    return route.fulfill({ json: [] });
  });
  if (token) await page.addInitScript(token => localStorage.setItem("paulibaby_admin_token", token), token);
}

test("public playlists show only published records, select ordered videos, and load embeds only after consent", async ({ page }) => {
  const { db, sqlite } = playlistDatabase();
  try {
    const admin = playlistRequest(worker, db);
    const published = await (await admin("/api/admin/video-playlists", "POST", samplePlaylist(1))).json();
    const draft = await (await admin("/api/admin/video-playlists", "POST", { ...samplePlaylist(), title: "Hidden draft" })).json();
    const embeds = [];
    await page.route("https://www.youtube-nocookie.com/**", route => { embeds.push(route.request().url()); return route.abort(); });
    await page.route("https://player.vimeo.com/**", route => { embeds.push(route.request().url()); return route.abort(); });
    await isolate(page, db);
    await page.goto("/video-playlists");
    await expect(page.getByRole("heading", { name: "Music videos" })).toBeVisible();
    await expect(page.getByText("Hidden draft")).toHaveCount(0);
    await page.getByRole("link", { name: "Music videos", exact: true }).click();
    await expect(page.getByRole("heading", { name: "First performance" })).toBeVisible();
    expect(embeds).toEqual([]);
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.screenshot({ path: "test-results/video-playlists-public.png", fullPage: true });
    await page.getByRole("button", { name: "Second performance", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Second performance" })).toBeVisible();
    await page.getByRole("button", { name: "Play video", exact: true }).click();
    await expect(page.locator("iframe")).toHaveAttribute("src", "https://player.vimeo.com/video/12345678?dnt=1&h=abcdef1234");
    await expect(page.locator("iframe")).toHaveAttribute("sandbox", "allow-scripts allow-same-origin allow-presentation");
    await expect(page.locator("iframe")).toHaveAttribute("referrerpolicy", "no-referrer");
    await expect(page.getByRole("link", { name: "open on Vimeo" })).toHaveAttribute("rel", "noopener noreferrer");
    await page.getByRole("button", { name: "First performance", exact: true }).click();
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.getByRole("button", { name: "Play video", exact: true }).click();
    await expect(page.locator("iframe")).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
    await page.goto(`/video-playlists/${draft.id}`);
    await expect(page.getByRole("alert")).toContainText("Playlist not found");
    sqlite.prepare("UPDATE video_playlist_entries SET url = 'javascript:bad' WHERE playlist_id = ? AND position = 0").run(published.id);
    await page.goto(`/video-playlists/${published.id}`);
    await expect(page.getByRole("alert")).toContainText("invalid or unsupported");
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.getByRole("button", { name: "Second performance", exact: true }).click();
    await expect(page.getByRole("button", { name: "Play video" })).toBeVisible();
    await page.setViewportSize({ width: 375, height: 812 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  } finally { sqlite.close(); }
});

test("admin creates, reorders, edits, removes and deletes persisted videos and playlists", async ({ page }) => {
  const { db, sqlite } = playlistDatabase();
  try {
    await isolate(page, db, "playlist-admin");
    await page.goto("/admin/dashboard/video-playlists");
    await page.getByRole("button", { name: "Add playlist", exact: true }).click();
    await page.getByLabel("Playlist title", { exact: true }).fill("Saved playlist");
    await page.getByLabel("Description", { exact: true }).fill("Two performances");
    await page.getByRole("button", { name: "Add video", exact: true }).click();
    await page.getByLabel("Video 1 title", { exact: true }).fill("First");
    await page.getByLabel("Video 1 URL", { exact: true }).fill("https://evil.invalid/video");
    await page.getByRole("button", { name: "Save playlist", exact: true }).click();
    await expect(page.getByRole("alert")).toContainText("valid HTTPS YouTube or Vimeo");
    await page.getByLabel("Video 1 URL", { exact: true }).fill("https://youtu.be/dQw4w9WgXcQ");
    await page.getByRole("button", { name: "Add video", exact: true }).click();
    await page.getByLabel("Video 2 title", { exact: true }).fill("Second");
    await page.getByLabel("Video 2 URL", { exact: true }).fill("https://vimeo.com/12345");
    await page.getByRole("button", { name: "Move video 2 up", exact: true }).click();
    await expect(page.getByLabel("Video 1 title", { exact: true })).toHaveValue("Second");
    await page.getByRole("button", { name: "Save playlist", exact: true }).click();
    await expect(page.getByRole("status")).toHaveText("Playlist saved.");
    await page.reload();
    await page.getByRole("button", { name: "Edit Saved playlist", exact: true }).click();
    await expect(page.getByLabel("Video 1 title", { exact: true })).toHaveValue("Second");
    await page.getByRole("button", { name: "Remove video 2", exact: true }).click();
    await page.getByRole("combobox", { name: "Status", exact: true }).selectOption("1");
    await page.getByRole("button", { name: "Save playlist", exact: true }).click();
    await expect(page.getByRole("status")).toHaveText("Playlist saved.");
    await page.reload();
    await page.getByRole("button", { name: "Edit Saved playlist", exact: true }).click();
    await expect(page.getByLabel("Video 2 title", { exact: true })).toHaveCount(0);
    await expect(page.getByRole("combobox", { name: "Status", exact: true })).toHaveValue("1");
    await page.screenshot({ path: "test-results/video-playlists-admin.png", fullPage: true });
    page.once("dialog", dialog => dialog.accept());
    await page.getByRole("button", { name: "Delete Saved playlist", exact: true }).click();
    await expect(page.getByRole("status")).toHaveText("Playlist deleted.");
    expect(sqlite.prepare("SELECT COUNT(*) AS n FROM video_playlists").get().n).toBe(0);
    expect(sqlite.prepare("SELECT COUNT(*) AS n FROM video_playlist_entries").get().n).toBe(0);
  } finally { sqlite.close(); }
});

test("anonymous admin navigation requires sign-in and editors have no permanent delete control", async ({ page }) => {
  const { db, sqlite } = playlistDatabase();
  try {
    await playlistRequest(worker, db)("/api/admin/video-playlists", "POST", samplePlaylist());
    await isolate(page, db);
    await page.goto("/admin/dashboard/video-playlists");
    await expect(page).toHaveURL(/\/sign-in\?/);
    await page.evaluate(() => localStorage.setItem("paulibaby_admin_token", "playlist-editor"));
    await page.goto("/admin/dashboard/video-playlists");
    await expect(page.getByRole("button", { name: "Edit Music videos", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Delete Music videos", exact: true })).toHaveCount(0);
  } finally { sqlite.close(); }
});

test("public catalog exposes empty and retryable storage failure states", async ({ page }) => {
  let failed = true;
  await page.route("**/api/**", route => {
    const path = new URL(route.request().url()).pathname;
    if (path === "/api/video-playlists") return route.fulfill(failed
      ? { status: 503, json: { error: "Playlist storage unavailable. Please try again." } }
      : { json: [] });
    return route.fulfill({ json: [] });
  });
  await page.goto("/video-playlists");
  await expect(page.getByRole("alert")).toContainText("Playlist storage unavailable");
  failed = false;
  await page.getByRole("button", { name: "Retry", exact: true }).click();
  await expect(page.getByText("No published video playlists yet.", { exact: true })).toBeVisible();
});
