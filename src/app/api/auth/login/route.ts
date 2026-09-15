import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createAdminToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const envEmail = (process.env.ADMIN_EMAIL || 'admin@antho.ng').toLowerCase().trim();
    const envPassword = process.env.ADMIN_PASSWORD || 'password123';

    let isAuthenticated = false;

    // Check against environment admin credentials
    if (email.toLowerCase().trim() === envEmail && password === envPassword) {
      isAuthenticated = true;
    }

    // Also check against database user credentials if available
    if (!isAuthenticated) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase().trim() },
        });

        if (user && user.password) {
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            isAuthenticated = true;
          }
        }
      } catch (dbErr) {
        // Fallback already checked above
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Invalid admin credentials provided.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Authenticated successfully.',
    });

    // Set cryptographically signed HMAC-SHA256 admin session cookie
    const token = await createAdminToken(email);
    response.cookies.set({
      name: 'antho_admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal authentication error' },
      { status: 500 }
    );
  }
}
