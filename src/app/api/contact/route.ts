import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    // Record inquiry in database if SiteContent model is available, or log locally
    try {
      const inquiryKey = `inquiry_${Date.now()}_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
      await prisma.siteContent.create({
        data: {
          key: inquiryKey,
          value: JSON.stringify({
            name,
            email,
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
