// Web Crypto-based HMAC-SHA256 session token management
// 100% compatible with Next.js Edge Runtime and Node.js without warnings

const ADMIN_SECRET =
  process.env.ADMIN_SECRET_KEY ||
  process.env.NEXTAUTH_SECRET ||
  'antho-luxury-syllogi-secret-key-salt-99-prevails';

export interface AdminTokenPayload {
  email: string;
  role: 'admin';
  iat: number;
  exp: number;
}

function base64UrlEncode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64url');
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64url').toString('utf8');
  }
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToUint8Array(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getCryptoKey(secret: string, usage: 'sign' | 'verify'): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    [usage]
  );
}

/**
 * Creates a cryptographically signed HMAC-SHA256 admin session token.
 * Valid for 7 days. Edge-safe.
 */
export async function createAdminToken(
  email: string,
  durationSeconds = 60 * 60 * 24 * 7
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminTokenPayload = {
    email: email.toLowerCase().trim(),
    role: 'admin',
    iat: now,
    exp: now + durationSeconds,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const enc = new TextEncoder();
  const key = await getCryptoKey(ADMIN_SECRET, 'sign');
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(encodedPayload));
  const signature = bufferToBase64Url(signatureBuffer);

  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies an HMAC-SHA256 admin session token using constant-time Web Crypto verification.
 * Edge-safe and Node.js-safe.
 */
export async function verifyAdminToken(token: string | undefined | null): Promise<{
  valid: boolean;
  payload?: AdminTokenPayload;
  error?: string;
}> {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Token missing' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, error: 'Malformed token structure' };
  }

  const [encodedPayload, signature] = parts;

  try {
    const enc = new TextEncoder();
    const key = await getCryptoKey(ADMIN_SECRET, 'verify');
    const signatureBytes = base64UrlToUint8Array(signature);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as unknown as BufferSource,
      enc.encode(encodedPayload) as unknown as BufferSource
    );

    if (!isValid) {
      return { valid: false, error: 'Signature mismatch' };
    }

    const payloadJson = base64UrlDecode(encodedPayload);
    const payload: AdminTokenPayload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: 'Token expired' };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, error: 'Verification failed' };
  }
}
