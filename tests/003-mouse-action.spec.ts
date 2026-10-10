import { test, expect } from '@playwright/test';

test('Homepage Playwright Viet Nam', async ({ page }) => {
  // Goto homepage
  await page.goto('https://material.playwrightvn.com/018-mouse.html');

  const mouseAction = page.locator('#clickArea');

  // click, right click, middle click
  await mouseAction.click( { button: 'right' });

  // // double click
  await mouseAction.dblclick();

  // // multiple click
  await mouseAction.click({ clickCount: 20 });

  // delay click
  await mouseAction.click({ delay: 5000 });

  // Click + press key
  await mouseAction.click({ modifiers: ['Control'] });

  // Click theo toa do
  await mouseAction.click({ position: { x: 100, y: 100 } });

  // timeout
  await mouseAction.click({ timeout: 4000 });

  // trial chờ accessibility chạy xong, nhưng ko click
  await mouseAction.click({ trial: true });

  await page.waitForTimeout(4000);
});