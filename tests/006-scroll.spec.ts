
import { test, expect } from '@playwright/test';

test.describe('Scroll', function () {
  test('Vertical Scroll', async function ({ page }) {
    await page.goto('https://material.playwrightvn.com/029-scroll.html');

    const product48 = page
      .locator('#internalScrollContainer')
      .getByText('Sản phẩm 48', { exact: true });

    await product48.scrollIntoViewIfNeeded();
    await expect(product48).toBeVisible();
  });

  test('Horizontal Scroll', async function ({ page }) {
    await page.goto('https://material.playwrightvn.com/029-scroll.html');

    const image09 = page
      .locator('#galleryContainer')
      .getByText('Image 9', { exact: true });

    await image09.scrollIntoViewIfNeeded();
    await expect(image09).toBeVisible();
    await page.waitForTimeout(2000)
  });

  test('Lazy vertical loading', async function ({ page }) {
    await page.goto('https://material.playwrightvn.com/029-scroll.html');

    const container = page.locator('#lazyInternalScrollContainer');
    const targetProduct = page.getByText('Lazy Product 100', { exact: true });
    const lazyScrollInfo = page.locator('#lazyScrollInfo');

    await container.scrollIntoViewIfNeeded();

    let attempts = 0;
    const maxAttempt = 10;

    while (attempts < maxAttempt) {
      // Kiểm tra sản phẩm đã xuất hiện chưa
      if (await targetProduct.count() > 0) {
        break;
      }

      // Lấy số lượng item hiện tại
      const text = await lazyScrollInfo.textContent();
      const currentTuso = Number(text?.trim().split('/')[0].trim());

      console.log('Số item hiện tại:', currentTuso);

      // Scroll xuống cuối container
      await container.evaluate(el => {
        el.scrollTop = el.scrollHeight;
      });

      // Chờ số lượng item tăng lên
      if (currentTuso < 100) {
        await expect(async () => {
          const updatedText = await lazyScrollInfo.textContent();
          const updatedTuso = Number(
            updatedText?.trim().split('/')[0].trim()
          );

          expect(updatedTuso).toBeGreaterThan(currentTuso);
        }).toPass({ timeout: 3000 }).catch(() => { });
      }

      attempts++;
    }

    // Kiểm tra kết quả cuối cùng
    await expect(targetProduct).toBeVisible();
  });

  test('Lazy horizontal loading', async function ({ page }) {

    // goto scroll page
    await page.goto('https://material.playwrightvn.com/029-scroll.html');

    // declare container and targetProduct variables
    const container = page.locator('#lazyGalleryContainer');
    await container.scrollIntoViewIfNeeded();
    const targetProduct = page.locator('#lazyGalleryContainer').getByText('Lazy Image 50', {
      exact: true
    })

    // Check the targetProduct exists
    let attempts = 0;
    const maxAttempt = 10;

    while (attempts < maxAttempt) {

      // Check count of targetProduct > 0 then break
      const count = await targetProduct.count();
      if (count > 0) {
        break;
      }

      // Scroll to the right of content
      await container.evaluate(el => {
        el.scrollLeft = el.scrollWidth;
      })

      // Wait for lazy loading
      await page.waitForTimeout(500);
      attempts++;
    }

    // Now scroll to targetProduct and verify this's visible
    await targetProduct.scrollIntoViewIfNeeded();
    await expect(targetProduct).toBeVisible();
  })

  test('Scroll outer and inner container', async function ({ page }) {
    // goto scroll page
    await page.goto('https://material.playwrightvn.com/029-scroll.html');

    // Scroll outer content
    const outerContent = page.locator('#outerContent').getByText('Outer paragraph 30');
    await outerContent.scrollIntoViewIfNeeded();
    await expect(outerContent).toBeVisible();
    await page.waitForTimeout(1000);

    // Scoll inner content
    const innerContent = page.locator('#innerContent').getByText('Inner paragraph 20');
    await innerContent.scrollIntoViewIfNeeded();
    await expect(innerContent).toBeVisible();
    await page.waitForTimeout(1000);

  })
});