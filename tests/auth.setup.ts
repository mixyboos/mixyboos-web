import { test as setup } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto("https://mixyboos.dev.fergl.ie:3000/login");
  //TODO: Properly fill these guys
  //   await page.getByLabel("Username or email address").fill("username");
  //   await page.getByLabel("Password").fill("password");
  await page.locator('button[type="submit"][name="login"]').click();
  await page.waitForURL("https://mixyboos.dev.fergl.ie:3000/dashboard");
});
