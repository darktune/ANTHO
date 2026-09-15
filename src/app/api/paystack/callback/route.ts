import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPaystackTransaction } from '@/lib/paystack';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference') || searchParams.get('trxref');

  if (!reference) {
    return NextResponse.redirect(new URL('/shop', request.url));
  }

  try {
    const verifyResult = await verifyPaystackTransaction(reference);

    // Simulation is strictly prohibited in production environments
    const isDevSimulation =
      process.env.NODE_ENV !== 'production' &&
      verifyResult.isSimulated === true &&
      searchParams.get('simulated') === 'true';

    const isConfirmed =
      (verifyResult.success && verifyResult.status === 'success') || isDevSimulation;

    if (isConfirmed) {
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
          `/orders/${encodeURIComponent(reference)}?payment=success${isDevSimulation ? '&simulated=true' : ''}`,
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
