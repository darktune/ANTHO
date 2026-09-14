import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initializePaystackTransaction } from '@/lib/paystack';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingState,
      notes,
      items,
      subtotal,
      shippingCost,
      total,
      paymentMethod = 'paystack',
    } = body;

    if (!customerEmail || !customerName || !shippingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required order fields' },
        { status: 400 }
      );
    }

    // Generate unique order reference (e.g. ANTHO-20260907-9821)
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const orderNumber = `ANTHO-${dateStr}-${randomSuffix}`;

    let savedOrder = null;
    try {
      savedOrder = await prisma.order.create({
        data: {
          orderNumber,
          customerName,
          customerEmail,
          customerPhone: customerPhone || '',
          shippingAddress,
          shippingCity: shippingCity || '',
          shippingState: shippingState || '',
          notes: notes || '',
          subtotal: Math.round(subtotal),
          shippingCost: Math.round(shippingCost || 0),
          total: Math.round(total),
          paymentMethod,
          paymentStatus: 'pending',
          status: 'pending',
          items: {
            create: items.map((item: any) => ({
              productName: item.name || 'ANTHO Item',
              productSlug: item.slug || item.productId || 'antho-piece',
              variant: [item.size, item.color].filter(Boolean).join(' / ') || 'Standard',
              quantity: item.quantity || 1,
              price: Math.round(item.price),
              imageUrl: item.imageUrl || null,
              productId: item.productId || null,
            })),
          },
        },
      });
    } catch (dbErr) {
      console.warn('Database offline or transitioning, proceeding with in-memory order:', orderNumber);
    }

    // Determine base URL for Paystack callback
    const rawOrigin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const origin = rawOrigin.replace(/\/+$/, '');
    const callbackUrl = `${origin}/api/paystack/callback`;

    // Initialize Paystack transaction (amount in Kobo)
    const paystackResult = await initializePaystackTransaction({
      email: customerEmail,
      amount: Math.round(total),
      reference: orderNumber,
      callbackUrl,
      metadata: {
        orderNumber,
        customerName,
        customerPhone,
        shippingState,
        shippingCity,
      },
    });

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: savedOrder?.id || orderNumber,
      authorizationUrl: paystackResult.authorizationUrl,
      isSimulated: paystackResult.isSimulated || false,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
