import { test, expect } from '@playwright/test';

test.describe('Defensive Security Guardrails E2E', () => {
  test('Unauthenticated user visiting /admin is redirected to /login', async ({ page }) => {
    // Clear cookies
    await page.context().clearCookies();

    // Attempt to access protected admin dashboard
    await page.goto('/admin');

    // Must be redirected to /login
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.getByText(/ADMINISTRATIVE CONCIERGE PORTAL|Admin Email/i)).toBeVisible();
  });

  test('Unauthenticated user visiting /admin/orders is redirected to /login', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/admin/orders');
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('Order API rejects price tampering with HTTP 400', async ({ request }) => {
    // Attempt to create order with ₦1 total instead of ₦45,000 for Polo
    const response = await request.post('/api/orders/create', {
      data: {
        customerName: 'Attacker Test',
        customerEmail: 'attacker@example.com',
        shippingAddress: '123 Fake Street',
        shippingState: 'Lagos',
        items: [
          {
            slug: 'antho-99-polo',
            quantity: 1,
            price: 100, // ₦1 in kobo
          },
        ],
        total: 100, // Tampered total
      },
    });

    // Server must reject with 400 Price mismatch
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toMatch(/Price mismatch detected/i);
  });

  test('Contact API rejects invalid payload with HTTP 400', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        name: 'T',
        email: 'invalid-email',
        message: 'short',
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toMatch(/Validation failed/i);
  });

  test('Newsletter API rejects invalid email with HTTP 400', async ({ request }) => {
    const response = await request.post('/api/newsletter', {
      data: {
        email: 'not-an-email',
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toMatch(/Valid email address is required/i);
  });
});
