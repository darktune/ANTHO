import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPaystackTransaction } from '@/lib/paystack';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference') || searchParams.get('trxref');
  const isSimulated = searchParams.get('simulated') === 'true';

  if (!reference) {
    return NextResponse.redirect(new URL('/shop', request.url));
  }

  try {
    const verifyResult = await verifyPaystackTransaction(reference);

    if (verifyResult.success && (verifyResult.status === 'success' || isSimulated)) {
      try {
        await prisma.order.updateMany({
          where: { orderNumber: reference },
          data: {
            paymentStatus: 'paid',
            status: 'confirmed',
            paymentRef: reference,
          },
        });
      } catch (dbErr) {
        console.warn('Could not update order in DB:', dbErr);
      }

      return NextResponse.redirect(
        new URL(
          `/orders/${encodeURIComponent(reference)}?payment=success${isSimulated ? '&simulated=true' : ''}`,
          request.url
        )
      );
    } else {
      try {
        await prisma.order.updateMany({
          where: { orderNumber: reference },
          data: {
            paymentStatus: 'failed',
          },
        });
      } catch (dbErr) {
        console.warn('Could not update order failure in DB:', dbErr);
      }

      return NextResponse.redirect(
        new URL(`/orders/${encodeURIComponent(reference)}?payment=failed`, request.url)
      );
    }
  } catch (err) {
    console.error('Paystack callback error:', err);
    return NextResponse.redirect(
      new URL(`/orders/${encodeURIComponent(reference)}?payment=pending`, request.url)
    );
  }
}
