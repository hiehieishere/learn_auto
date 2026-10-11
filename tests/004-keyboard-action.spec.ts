import { test, expect } from '@playwright/test';

test('Keyboard Action', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

  const element = page.locator('#username');

  await element.fill('langlang3005');
  await expect(element).toHaveValue('langlang3005');

  await element.press('Tab');
  const email = page.locator('#email');
  await email.pressSequentially('abc@gmail.com');
  // await element.focus();
  await element.press('End');

  await page.keyboard.down('Shift');
  const count = (await(element.inputValue())).length;

  for (let i = 0; i < count; i++) {
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(300);
  }

  await page.keyboard.up('Shift');
  await expect(element).toHaveValue('langlang3005');

  await page.waitForTimeout(3000);
});