import test from 'node:test';
import assert from 'node:assert/strict';
import { getShippingCost, NIGERIAN_STATES, DEFAULT_SHIPPING } from '../../src/lib/constants';

test('Shipping Matrix Calculation Suite', async (t) => {
  await t.test('Covenant University (CU) delivery rate is ₦6,500 (650,000 kobo)', () => {
    const rate = getShippingCost('Covenant University (CU)');
    assert.equal(rate.cost, 650000);
    assert.match(rate.estimatedDays, /Campus drop \/ Tradefair pickup/i);

    const rateCU = getShippingCost('CU');
    assert.equal(rateCU.cost, 650000);
  });

  await t.test('Covenant University case-insensitive and variant matching works', () => {
    const rateLower = getShippingCost('covenant university');
    assert.equal(rateLower.cost, 650000);

    const rateUpper = getShippingCost('COVENANT UNIVERSITY');
    assert.equal(rateUpper.cost, 650000);
  });

  await t.test('Lagos (Mainland) delivery rate is ₦5,500 (550,000 kobo)', () => {
    const rate = getShippingCost('Lagos (Mainland)');
    assert.equal(rate.cost, 550000);
    assert.match(rate.estimatedDays, /1-2 business days/i);

    const genericLagos = getShippingCost('Lagos');
    assert.equal(genericLagos.cost, 550000);
  });

  await t.test('Lagos (Island) delivery rate is ₦8,500 (850,000 kobo)', () => {
    const rate = getShippingCost('Lagos (Island)');
    assert.equal(rate.cost, 850000);
    assert.match(rate.estimatedDays, /1-2 business days/i);
  });

  await t.test('Nationwide (all other Nigerian states) falls back to ₦9,000 (900,000 kobo)', () => {
    const testStates = ['Abuja', 'FCT - Abuja', 'Kano', 'Rivers', 'Anambra', 'Delta', 'Ogun'];
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
