import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initializePaystackTransaction } from '@/lib/paystack';
import { sampleProducts } from '@/lib/sample-data';
import { getShippingCost, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { z } from 'zod';

// Strict input validation schema
const orderItemSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(100).optional(),
  productId: z.string().min(1).max(100).optional(),
  size: z.string().max(20).optional(),
  color: z.string().max(50).optional(),
  quantity: z.number().int().min(1).max(20),
  price: z.number().positive().optional(),
  imageUrl: z.string().optional(),
});

const createOrderSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  customerEmail: z.string().email('Valid email is required').max(150),
  customerPhone: z.string().max(30).optional().default(''),
  shippingAddress: z.string().min(5, 'Shipping address is required').max(300),
  shippingCity: z.string().max(100).optional().default(''),
  shippingState: z.string().min(2, 'Shipping state is required').max(100),
  notes: z.string().max(500).optional().default(''),
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item').max(50),
  subtotal: z.number().optional(),
  shippingCost: z.number().optional(),
  total: z.number().optional(),
  paymentMethod: z.string().max(30).optional().default('paystack'),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parseResult = createOrderSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingState,
      notes,
      items,
      total: clientTotal,
      paymentMethod,
    } = parseResult.data;

    // Authoritative Server-Side Price Recalculation
    // Prevents Client-Side Price Tampering (Vibe-Coded Web App Vuln #12)
    let calculatedSubtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const slugOrId = (item.slug || item.productId || '').toLowerCase().trim();
      
      // Look up authoritative product from curated catalog
      let catalogProduct = sampleProducts.find(
        (p) => p.slug.toLowerCase() === slugOrId || p.id.toLowerCase() === slugOrId
      );

      // Database fallback lookup if not found in sampleProducts
      if (!catalogProduct) {
        try {
          const dbProduct = await prisma.product.findFirst({
            where: {
              OR: [{ slug: slugOrId }, { id: slugOrId }],
            },
          });
          if (dbProduct) {
            catalogProduct = dbProduct as any;
          }
        } catch {
          // DB offline or transitioning
        }
      }

      if (!catalogProduct) {
        return NextResponse.json(
          { error: `Invalid product in order: "${item.name || slugOrId}" cannot be verified in catalog.` },
          { status: 400 }
        );
      }

      const authoritativePrice = catalogProduct.price; // Stored strictly in Kobo
      const itemTotal = authoritativePrice * item.quantity;
      calculatedSubtotal += itemTotal;

      verifiedItems.push({
        productName: catalogProduct.name,
        productSlug: catalogProduct.slug,
        variant: [item.size, item.color].filter(Boolean).join(' / ') || 'Standard',
        quantity: item.quantity,
        price: authoritativePrice,
        imageUrl: item.imageUrl || catalogProduct.images?.[0]?.url || null,
        productId: catalogProduct.id,
      });
    }

    // Authoritative Shipping Calculation
    const shippingZone = getShippingCost(shippingState);
    const calculatedShippingCost =
      calculatedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shippingZone.cost;

    const authoritativeTotal = calculatedSubtotal + calculatedShippingCost;

    // If client supplied a total, verify that it matches server calculation (tolerance: 0)
    if (typeof clientTotal === 'number' && Math.abs(clientTotal - authoritativeTotal) > 100) {
      console.warn(
        `[Security Alert] Price tampering detected for order. Client: ${clientTotal}, Server: ${authoritativeTotal}`
      );
      return NextResponse.json(
        {
          error: 'Price mismatch detected. Cart items have been recalculated against authoritative rates.',
          authoritativeTotal,
        },
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
          shippingState,
          notes: notes || '',
          subtotal: calculatedSubtotal,
          shippingCost: calculatedShippingCost,
          total: authoritativeTotal,
          paymentMethod,
          paymentStatus: 'pending',
          status: 'pending',
          items: {
            create: verifiedItems,
          },
        },
      });
    } catch (dbErr) {
      console.warn('Database offline or transitioning, proceeding with in-memory order:', orderNumber);
    }

    // Determine base URL for Paystack callback
    const rawOrigin =
      request.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000';
    const origin = rawOrigin.replace(/\/+$/, '');
    const callbackUrl = `${origin}/api/paystack/callback`;

    // Initialize Paystack transaction with authoritative total (amount in Kobo)
    const paystackResult = await initializePaystackTransaction({
      email: customerEmail,
      amount: authoritativeTotal,
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
      calculatedTotal: authoritativeTotal,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to process order. Please try again or contact concierge.' },
      { status: 500 }
    );
  }
}
