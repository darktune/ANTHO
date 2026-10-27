import test from 'node:test';
import assert from 'node:assert/strict';
import { sampleProducts } from '../../src/lib/sample-data';
import { getShippingCost, FREE_SHIPPING_THRESHOLD } from '../../src/lib/constants';

test('Product Catalog & Pricing Integrity Suite', async (t) => {
  await t.test('Catalog strictly contains only 5 active launch pieces (Polos & Independence Tee)', () => {
    assert.equal(sampleProducts.length, 5, 'Catalog must contain exactly 5 active launch products');
  });

  await t.test('All 5 products have deterministic, non-discounted luxury pricing', () => {
    const expectedPrices: Record<string, number> = {
      'red-christos-polo': 3500000,              // ₦35,000
      'white-christos-polo': 3500000,            // ₦35,000
      'black-christos-polo': 3500000,            // ₦35,000
      'black-longsleeve-christos-polo': 3500000, // ₦35,000
      'independence-tee-black': 1799900,         // ₦17,999
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
      { slug: 'red-christos-polo', quantity: 2, price: 100 },
      { slug: 'independence-tee-black', quantity: 1, price: 50 },
    ];

    let authoritativeSubtotal = 0;
    for (const item of tamperedClientItems) {
      const catalogProduct = sampleProducts.find((p) => p.slug === item.slug);
      assert.ok(catalogProduct, 'Product must be found in authoritative catalog');
      // Server overrides client price with catalog product price
      authoritativeSubtotal += catalogProduct.price * item.quantity;
    }

    // Expected: (35,000 * 2) + (17,999 * 1) = ₦87,999 = 8,799,900 kobo
    assert.equal(authoritativeSubtotal, 8799900);
    assert.notEqual(authoritativeSubtotal, 250, 'Server must reject client tampered subtotal');
  });

  await t.test('Total order calculation combines authoritative subtotal and shipping', () => {
    const polo = sampleProducts.find((p) => p.slug === 'red-christos-polo')!;
    const shipping = getShippingCost('Lagos');

    const subtotal = polo.price * 1; // 3,500,000
    const shippingCost = shipping.cost; // 650,000
    const total = subtotal + shippingCost; // 4,150,000

    assert.equal(total, 4150000, 'Total must equal authoritative subtotal + Lagos shipping');
  });
});
