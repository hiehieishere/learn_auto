import { test, expect } from '@playwright/test';

test('Fill form with all locators', async ({ page }) => {

  // Register first user  
  // Goto homepage
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

  // Locator with text
  await expect(page.getByText('User Registration')).toBeVisible();

  // Locator with role
  await page.getByRole('textbox', { name: 'username' }).fill('langlang3005');
  await page.getByRole('textbox', { name: 'email' }).fill('langlang3005@gmail.com');
  await page.getByRole('radio', { name: 'female' }).check();
  await page.getByRole('checkbox', { name: 'traveling' }).check();


  // Locator with label
  await page.getByLabel('interests').selectOption('technology');

  // Locator with id
  await page.locator('#country').selectOption('australia');
  await page.locator('#dob').fill('2001-01-01');
  await page.locator('#profile').setInputFiles("C:\\Users\\Admin\\Downloads\\qc_manual_middle_165_interview_latest.html");
  await page.locator('#bio').fill('I am a software tester');

  // Locator with name
  await page.locator('[name="rating"]').fill('9');
  await page.locator('[name="favcolor"]').fill('#259ad4');
  await page.locator('[name="newsletter"]').check();
  await page.locator('.tooltip').hover();
  await expect(page.getByText('Subscribe to our newsletter for updates')).toBeVisible();

  const toggleOption = page.locator('#toggleOption');
  await toggleOption.locator('xpath=..').click();
  await expect(toggleOption).toBeChecked();
  
  // Locator with bounding box
  const starRating = page.locator('#starRating');
  const box = await starRating.boundingBox();

  if (box) {
    // Tính vị trí X tương ứng với rating 4.4 (88% chiều rộng)
    const clickX = box.x + box.width * (4.4 / 5);
    const clickY = box.y + box.height / 2; // Click ở giữa theo chiều cao

    await page.mouse.click(clickX, clickY);
  }

  // Complete fill registration form
  // Locator with button
  await page.getByRole('button', { name: 'Register' }).click();


  const firstUserRow = page.getByRole('row').filter({ hasText: 'langlang3005' });
  await expect(firstUserRow).toBeVisible();
  await expect(firstUserRow).toContainText('Enable Feature: Yes');

  await page.waitForTimeout(4000);

  // Register second user
  await page.getByRole('textbox', { name: 'username' }).fill('langlang3006');
  await page.getByRole('textbox', { name: 'email' }).fill('langlang3006@gmail.com');
  await page.locator('#male').check();
  await page.getByRole('checkbox', { name: 'reading' }).check();


  // Locator with label
  await page.getByLabel('interests').selectOption('music');

  // Locator with id
  await page.locator('#country').selectOption('usa');
  await page.locator('#dob').fill('2001-10-11');
  await page.locator('#bio').fill('I am a software engineer');

  // Locator with name
  await page.locator('[name="rating"]').fill('7');
  await page.locator('[name="favcolor"]').fill('#259ad4');
  await page.locator('[name="newsletter"]').check();
  await page.locator('.tooltip').hover();
  await expect(page.getByText('Subscribe to our newsletter for updates')).toBeVisible();

  await toggleOption.locator('xpath=..').click();
  await expect(toggleOption).toBeChecked();
  // Locator with bounding box

  const secondStarRating = page.locator('#starRating');
  const secondBox = await secondStarRating.boundingBox();

  if (secondBox) {
    // Tính vị trí X tương ứng với rating 4.4 (88% chiều rộng)
    const clickX = secondBox.x + secondBox.width * (4.4 / 5);
    const clickY = secondBox.y + secondBox.height / 2; // Click ở giữa theo chiều cao

    await page.mouse.click(clickX, clickY);
  }
  await expect(secondStarRating).toHaveAttribute('data-rating', '4.4');

  // Complete fill registration form
  // Locator with button
  await page.getByRole('button', { name: 'Register' }).click();


  const secondUserRow = page.getByRole('row').filter({ hasText: 'langlang3006' });
  await expect(secondUserRow).toBeVisible();
  await page.waitForTimeout(4000);

  await Promise.all([
    page.waitForEvent('dialog').then(dialog => dialog.accept()),
    secondUserRow.getByRole('button', { name: 'Delete' }).click(),
  ]);
  await expect(secondUserRow).toHaveCount(0);
  await expect(firstUserRow).toBeVisible();
  await page.waitForTimeout(4000);

});