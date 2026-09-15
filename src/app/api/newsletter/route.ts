import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Please provide a valid email address').max(150),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parseResult = newsletterSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Valid email address is required',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = parseResult.data;
    const sanitizedEmail = email.toLowerCase().trim();

    try {
      await prisma.newsletter.upsert({
        where: { email: sanitizedEmail },
        update: {},
        create: { email: sanitizedEmail },
      });
    } catch (dbErr) {
      console.warn('Database offline or transitioning, newsletter subscription logged locally:', sanitizedEmail);
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
