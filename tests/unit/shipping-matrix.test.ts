import test from 'node:test';
import assert from 'node:assert/strict';
import { getShippingCost, NIGERIAN_STATES, DEFAULT_SHIPPING } from '../../src/lib/constants';

test('Shipping Matrix Calculation Suite', async (t) => {
  await t.test('Covenant University campus delivery rate is ₦3,000 (300,000 kobo)', () => {
    const rate = getShippingCost('Covenant University');
    assert.equal(rate.cost, 300000);
    assert.match(rate.estimatedDays, /Campus drop \/ Tradefair pickup/i);
  });

  await t.test('Covenant University case-insensitive matching works', () => {
    const rateLower = getShippingCost('covenant university');
    assert.equal(rateLower.cost, 300000);

    const rateUpper = getShippingCost('COVENANT UNIVERSITY');
    assert.equal(rateUpper.cost, 300000);
  });

  await t.test('Lagos State delivery rate is ₦6,500 (650,000 kobo)', () => {
    const rate = getShippingCost('Lagos');
    assert.equal(rate.cost, 650000);
    assert.match(rate.estimatedDays, /1-2 business days/i);
  });

  await t.test('Ogun State delivery rate is ₦6,500 (650,000 kobo)', () => {
    const rate = getShippingCost('Ogun');
    assert.equal(rate.cost, 650000);
  });

  await t.test('Nationwide (other Nigerian states) falls back to ₦9,000 (900,000 kobo)', () => {
    const testStates = ['Abuja', 'FCT - Abuja', 'Kano', 'Rivers', 'Anambra', 'Delta'];
    for (const state of testStates) {
      const rate = getShippingCost(state);
      assert.equal(rate.cost, 900000, `State "${state}" must be charged nationwide rate`);
      assert.match(rate.estimatedDays, /3-5 business days/i);
    }
  });

  await t.test('Default fallback applies to unknown regions', () => {
    const rate = getShippingCost('Unknown Region');
    assert.equal(rate.cost, DEFAULT_SHIPPING.cost);
  });
});
