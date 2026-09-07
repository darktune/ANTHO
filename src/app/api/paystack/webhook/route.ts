import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyWebhookSignature } from '@/lib/paystack';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'charge.success') {
      const reference = event.data?.reference;
      if (reference) {
        try {
          await prisma.order.updateMany({
            where: { orderNumber: reference },
            data: {
              paymentStatus: 'paid',
              status: 'confirmed',
              paymentRef: reference,
            },
          });
          console.log(`[Paystack Webhook] Order ${reference} verified and marked as paid`);
        } catch (dbErr) {
          console.error('[Paystack Webhook] Database update error:', dbErr);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Paystack Webhook] Error processing webhook event:', error);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
