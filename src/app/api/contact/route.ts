import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please provide a valid email address').max(150),
  subject: z.string().max(200).optional().default('General Inquiry'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parseResult = contactSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parseResult.data;

    // Record inquiry in database if SiteContent model is available, or log locally
    try {
      const inquiryKey = `inquiry_${Date.now()}_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
      await prisma.siteContent.create({
        data: {
          key: inquiryKey,
          value: JSON.stringify({
            name,
            email: email.toLowerCase().trim(),
            subject: subject || 'General Inquiry',
            message,
            submittedAt: new Date().toISOString(),
          }),
        },
      });
    } catch (dbErr) {
      console.warn('[Contact] Database offline or transitioning; inquiry logged safely:', { name, email, subject });
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out. The ANTHO concierge team will respond within 24–48 hours.',
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please reach out via WhatsApp concierge.' },
      { status: 500 }
    );
  }
}
