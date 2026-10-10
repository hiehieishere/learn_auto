import { test, expect } from '@playwright/test';

test('Keyboard Action', async ({ page }) => {
    // Goto homepage
    await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

    const element = page.locator('#username');

    // fill
    await element.fill('langlang3005');
    // press
    await element.press('Enter');
    // pressSequentially
    await element.pressSequentially('Shift+Tab',{
        delay: 200
    });
})