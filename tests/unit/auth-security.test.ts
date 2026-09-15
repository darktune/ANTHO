import test from 'node:test';
import assert from 'node:assert/strict';
import { createAdminToken, verifyAdminToken } from '../../src/lib/auth';

test('Cryptographic HMAC-SHA256 Admin Authentication Suite', async (t) => {
  const testEmail = 'admin@antho.ng';

  await t.test('Creates valid HMAC-signed session token', async () => {
    const token = await createAdminToken(testEmail);
    assert.ok(token, 'Token must be generated');
    assert.ok(token.includes('.'), 'Token must contain payload and signature separated by dot');

    const [payload, signature] = token.split('.');
    assert.ok(payload.length > 10, 'Payload segment must not be empty');
    assert.ok(signature.length > 20, 'Signature segment must not be empty');
  });

  await t.test('Verifies valid HMAC session token successfully', async () => {
    const token = await createAdminToken(testEmail);
    const result = await verifyAdminToken(token);

    assert.equal(result.valid, true, 'Verification of legitimate token must succeed');
    assert.equal(result.payload?.email, testEmail);
    assert.equal(result.payload?.role, 'admin');
    assert.ok(result.payload?.exp && result.payload.exp > Math.floor(Date.now() / 1000));
  });

  await t.test('Rejects token if signature is tampered', async () => {
    const token = await createAdminToken(testEmail);
    const [payload, signature] = token.split('.');
    
    // Maliciously tamper with last character of signature
    const tamperedSig = signature.slice(0, -1) + (signature.endsWith('a') ? 'b' : 'a');
    const tamperedToken = `${payload}.${tamperedSig}`;

    const result = await verifyAdminToken(tamperedToken);
    assert.equal(result.valid, false, 'Tampered signature must be rejected');
    assert.match(result.error || '', /Signature mismatch|Verification failed/i);
  });

  await t.test('Rejects token if payload is tampered', async () => {
    const token = await createAdminToken(testEmail);
    const [, signature] = token.split('.');

    // Tampered payload substituting different email
    const fakePayload = Buffer.from(
      JSON.stringify({
        email: 'attacker@evil.com',
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      })
    ).toString('base64url');

    const tamperedToken = `${fakePayload}.${signature}`;
    const result = await verifyAdminToken(tamperedToken);

    assert.equal(result.valid, false, 'Payload with altered contents must fail HMAC verification');
  });

  await t.test('Rejects expired token', async () => {
    // Generate token with negative duration (-100 seconds)
    const expiredToken = await createAdminToken(testEmail, -100);
    const result = await verifyAdminToken(expiredToken);

    assert.equal(result.valid, false, 'Expired token must fail validation');
    assert.match(result.error || '', /Token expired/i);
  });

  await t.test('Rejects malformed tokens, null, and empty strings', async () => {
    const invalidInputs = ['', 'invalid-token-no-dot', 'a.b.c', null, undefined];
    for (const input of invalidInputs) {
      const result = await verifyAdminToken(input as any);
      assert.equal(result.valid, false, `Input "${input}" must be rejected`);
    }
  });
});
