import { test, expect } from '@playwright/test';

test('Radio and Checkbox', async ({ page }) => {
  // goto homepage
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

  const radioFemale = page.getByRole('radio', { name: 'Female' });
  const cbTraveling = page.getByRole('checkbox', { name: 'Traveling' });
  const cbReading = page.getByLabel('Reading');
  const cbCooking = page.getByLabel('Cooking');

  // check
  await radioFemale.check();
  await cbTraveling.check();
  await cbReading.check();
  await cbCooking.check();

  // uncheck
  await cbTraveling.uncheck();

  // isChecked & toBeChecked
  expect(await cbCooking.isChecked()).toBe(true);
  await expect(cbReading).toBeChecked();
  await expect(cbTraveling).not.toBeChecked();
  await page.waitForTimeout(3000);

  console.log(await cbTraveling.isChecked());

});