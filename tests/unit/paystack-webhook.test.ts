import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import { verifyWebhookSignature } from '../../src/lib/paystack';

test('Paystack Webhook HMAC-SHA512 Signature Suite', async (t) => {
  const secretKey = 'sk_test_mock_secret_key_12345';

  const samplePayload = JSON.stringify({
    event: 'charge.success',
    data: {
      id: 998877,
      reference: 'ANTHO-20260914-1001',
      amount: 4500000,
      currency: 'NGN',
      status: 'success',
    },
  });

  await t.test('Valid Paystack HMAC-SHA512 signature passes verification', () => {
    const validSignature = crypto
      .createHmac('sha512', secretKey)
      .update(samplePayload)
      .digest('hex');

    const isValid = verifyWebhookSignature(samplePayload, validSignature, secretKey);
    assert.equal(isValid, true, 'Correct webhook signature must be accepted');
  });

  await t.test('Invalid or forged signature is strictly rejected', () => {
    const forgedSignature = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    const isValid = verifyWebhookSignature(samplePayload, forgedSignature, secretKey);
    assert.equal(isValid, false, 'Forged signature must be rejected');
  });

  await t.test('Tampered webhook payload body is rejected', () => {
    const validSignature = crypto
      .createHmac('sha512', secretKey)
      .update(samplePayload)
      .digest('hex');

    const tamperedPayload = samplePayload.replace('4500000', '100');
    const isValid = verifyWebhookSignature(tamperedPayload, validSignature, secretKey);
    assert.equal(isValid, false, 'Tampered payload body must fail signature check');
  });

  await t.test('Missing or null signature is rejected', () => {
    assert.equal(verifyWebhookSignature(samplePayload, null, secretKey), false);
    assert.equal(verifyWebhookSignature(samplePayload, '', secretKey), false);
  });
});
