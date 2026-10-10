import { test, expect } from '@playwright/test';

test('Homepage Playwright Viet Nam', async ({ page }) => {
  // Goto homepage
  await page.goto('https://playwrightvn.com');

  // Check title
  await expect(page).toHaveTitle(/Học Automation Test từ chưa biết gì/);

  // Click on the first link with the name 'Playwright Master Class: From Zero To Hero'
  await page.getByRole('link', { name: 'Playwright Master Class: From Zero To Hero' }).first().click();
  await page.waitForTimeout(2000);
  await expect(page).toHaveTitle(/Playwright Master Class: From Zero To Hero/)

});
