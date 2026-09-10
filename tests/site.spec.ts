import { test, expect } from "@playwright/test";
test("careers flow and renamed navigation work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/careers");
  await expect(page.locator("#main-nav a")).toHaveText([
    "projects↗",
    "expertise↗",
    "about↗",
    "careers↗",
    "contact↗",
  ]);
  const job = page.locator(".job").first();
  await job.locator("summary").click();
  await expect(job.locator(".job-details")).toBeVisible();
  await job.getByRole("button", { name: "Start a demo application" }).click();
  await expect(page.getByLabel("Position", { exact: true })).toHaveValue(
    "Structural Engineer",
  );
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
  await page.getByLabel("Name", { exact: true }).fill("Example Applicant");
  await page.getByLabel("Email", { exact: true }).fill("applicant@example.com");
  await page
    .getByLabel("Tell us about your interests")
    .fill("Exploring structural design.");
  await page.getByRole("button", { name: "Preview application" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Nothing has been sent or stored",
  );
  await page.goto("/work");
  await expect(page).toHaveURL(/\/projects$/);
  const cards = page.locator(".project-feature");
  const first = await cards.nth(0).boundingBox();
  const second = await cards.nth(1).boundingBox();
  expect(first?.y).toBe(second?.y);
  expect(first?.height).toBe(second?.height);
  await expect(cards.first().getByText("Project focus")).toBeVisible();
  await page.goto("/work/morrow-viaduct");
  await expect(page).toHaveURL(/\/projects\/morrow-viaduct$/);
  await page.goto("/studio");
  await expect(page).toHaveURL(/\/about$/);
  await page.goto("/careers");
  await page.screenshot({ path: "tests/careers.png", fullPage: true });
  await page.goto("/projects");
  await page.screenshot({ path: "tests/projects.png", fullPage: true });
});
test("intro uses one logo, settles in place and only plays once", async ({
  page,
}) => {
  await page.goto("/");
  const logo = page.locator("header .logo");
  await expect(page.locator("html")).toHaveClass(/intro-active/);
  await logo.evaluate((el) => el.setAttribute("data-original", "true"));
  await expect(page.locator("html")).not.toHaveClass(/intro-active/, {
    timeout: 4000,
  });
  await expect(logo).toHaveAttribute("data-original", "true");
  expect(await logo.evaluate((el) => getComputedStyle(el).transform)).toBe(
    "none",
  );
  expect(
    await page.evaluate(() => sessionStorage.getItem("alderspan-intro")),
  ).toBe("seen");
  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/intro-active/);
});
test("all routes render without console errors and form stays local", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of [
    "/",
    "/projects",
    "/projects/north-basin-crossing",
    "/projects/morrow-viaduct",
    "/projects/east-reach-waterworks",
    "/projects/cedar-transit-hall",
    "/expertise",
    "/expertise/structures",
    "/expertise/civil-infrastructure",
    "/expertise/transportation",
    "/expertise/water",
    "/expertise/construction-engineering",
    "/about",
    "/careers",
    "/contact",
    "/unknown",
  ]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("html")).not.toHaveClass(/intro-active/);
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el) =>
              (el as HTMLImageElement).complete &&
              (el as HTMLImageElement).naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
  }
  await page.goto("/projects");
  await page.getByRole("button", { name: "Water" }).click();
  await expect(page.locator(".project-feature")).toHaveCount(1);
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: true }).fill("Example Visitor");
  await page.getByLabel("Email", { exact: true }).fill("visitor@example.com");
  await page
    .getByLabel("What are you thinking about?")
    .fill("A fictional concept.");
  await page.getByRole("button", { name: "Preview enquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No message has been sent or stored",
  );
  expect(errors).toEqual([]);
});
test("desktop, tablet and mobile have no horizontal overflow", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 950 });
    for (const path of [
      "/",
      "/projects",
      "/projects/north-basin-crossing",
      "/expertise",
      "/about",
      "/careers",
      "/contact",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${path} at ${width}`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu +" }).click();
  await page
    .locator("#main-nav")
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/contact/);
  await expect(page.getByRole("button", { name: "Menu +" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.goto("/");
  await page.screenshot({ path: "tests/mobile.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.screenshot({ path: "tests/desktop.png", fullPage: true });
});
test("keyboard navigation exposes focus and image hover keeps layout stable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  expect(
    await page
      .locator(".skip-link")
      .evaluate((el) => getComputedStyle(el).outlineStyle),
  ).toBe("solid");
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const feature = page.locator(".project-feature").first();
  await feature.scrollIntoViewIfNeeded();
  const before = await feature.boundingBox();
  await feature.hover();
  expect(await feature.boundingBox()).toEqual(before);
  await page.goto("/projects/north-basin-crossing");
  await page.getByRole("link", { name: "Next project" }).click();
  await expect(page).toHaveURL(/morrow-viaduct/);
});
