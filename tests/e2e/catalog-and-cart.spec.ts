import { test, expect } from '@playwright/test';

test.describe('Catalog & Cart Workflow', () => {
  test('Catalog displays all 4 youth pieces with deterministic prices', async ({ page }) => {
    await page.goto('/shop');

    // Check for the 4 hero pieces
    await expect(page.getByText("ANTHO 99' POLO")).toBeVisible();
    await expect(page.getByText('ANTHO “NPNG” SWEATS')).toBeVisible();
    await expect(page.getByText('ANTHO GLOBAL TEE')).toBeVisible();
    await expect(page.getByText('ANTHO PREVAILS TEE')).toBeVisible();

    // Check prices
    await expect(page.getByText('₦45,000')).toBeVisible();
    await expect(page.getByText('₦25,000')).toBeVisible();
    await expect(page.getByText('₦30,000')).toBeVisible();
    await expect(page.getByText('₦15,000')).toBeVisible();
  });

  test('Product detail page enables size selection and adding to cart', async ({ page }) => {
    await page.goto('/products/antho-99-polo');

    // Verify title and price
    await expect(page.getByText("ANTHO 99' POLO")).toBeVisible();
    await expect(page.getByText('₦45,000')).toBeVisible();

    // Select size if available
    const sizeButton = page.locator('button:has-text("M"), button:has-text("L")').first();
    if (await sizeButton.isVisible()) {
      await sizeButton.click();
    }

    // Click Add to Cart
    const addToCartButton = page.locator('button:has-text("Add to Bag"), button:has-text("Add to Cart")').first();
    await addToCartButton.click();

    // Verify Cart Drawer / Modal opens
    await expect(page.getByText(/Shopping Bag|Cart|Subtotal/i)).toBeVisible();
  });
});
