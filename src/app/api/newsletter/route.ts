import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    try {
      await prisma.newsletter.upsert({
        where: { email: email.toLowerCase().trim() },
        update: {},
        create: { email: email.toLowerCase().trim() },
      });
    } catch (dbErr) {
      console.warn('Database offline or transitioning, newsletter subscription logged locally:', email);
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list for exclusive ANTHO drops.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process newsletter subscription' },
      { status: 500 }
    );
  }
}
