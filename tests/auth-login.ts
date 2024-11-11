import { test, expect } from "@playwright/test";

test("test-auth-bootstrapped", async ({ page }) => {
  await page.goto("https://mixyboos.dev.fergl.ie:3000/dashboard");

  await expect(page.getByRole("link", { name: "Mixy/Boos" })).toHaveCount(1);
});
