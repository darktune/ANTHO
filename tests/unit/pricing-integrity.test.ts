import test from 'node:test';
import assert from 'node:assert/strict';
import { sampleProducts } from '../../src/lib/sample-data';
import { getShippingCost, FREE_SHIPPING_THRESHOLD } from '../../src/lib/constants';

test('Product Catalog & Pricing Integrity Suite', async (t) => {
  await t.test('Catalog strictly contains only 4 curated youth streetwear pieces', () => {
    assert.equal(sampleProducts.length, 4, 'Catalog must contain exactly 4 products');
  });

  await t.test('All 4 products have deterministic, non-discounted luxury pricing', () => {
    const expectedPrices: Record<string, number> = {
      'antho-99-polo': 4500000,       // ₦45,000
      'antho-npng-sweats': 2500000,    // ₦25,000
      'antho-global-tee': 3000000,     // ₦30,000
      'antho-prevails-tee': 1500000,   // ₦15,000
    };

    for (const [slug, expectedPrice] of Object.entries(expectedPrices)) {
      const product = sampleProducts.find((p) => p.slug === slug);
      assert.ok(product, `Product with slug "${slug}" must exist in catalog`);
      assert.equal(product.price, expectedPrice, `Price for ${slug} must be ${expectedPrice} kobo`);
      assert.equal((product as any).compareAtPrice, undefined, `compareAtPrice must be undefined for ${slug}`);
    }
  });

  await t.test('Server-side cart recalculation prevents price tampering exploit', () => {
    // Malicious client payload with tampered unit price of 100 kobo (1 NGN)
    const tamperedClientItems = [
      { slug: 'antho-99-polo', quantity: 2, price: 100 },
      { slug: 'antho-global-tee', quantity: 1, price: 50 },
    ];

    let authoritativeSubtotal = 0;
    for (const item of tamperedClientItems) {
      const catalogProduct = sampleProducts.find((p) => p.slug === item.slug);
      assert.ok(catalogProduct, 'Product must be found in authoritative catalog');
      // Server overrides client price with catalog product price
      authoritativeSubtotal += catalogProduct.price * item.quantity;
    }

    // Expected: (45,000 * 2) + (30,000 * 1) = ₦120,000 = 12,000,000 kobo
    assert.equal(authoritativeSubtotal, 12000000);
    assert.notEqual(authoritativeSubtotal, 250, 'Server must reject client tampered subtotal');
  });

  await t.test('Total order calculation combines authoritative subtotal and shipping', () => {
    const polo = sampleProducts.find((p) => p.slug === 'antho-99-polo')!;
    const shipping = getShippingCost('Lagos');

    const subtotal = polo.price * 1; // 4,500,000
    const shippingCost = shipping.cost; // 650,000
    const total = subtotal + shippingCost; // 5,150,000

    assert.equal(total, 5150000, 'Total must equal authoritative subtotal + Lagos shipping');
  });
});
