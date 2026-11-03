import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/supabase/admin';
import { createRazorpayOrder, getRazorpayClient } from '@/lib/razorpay';
import { PRODUCTS } from '@/data/products';
import { FREE_SHIPPING_THRESHOLD_PAISE, STANDARD_SHIPPING_FEE_PAISE } from '@/lib/format';

interface CartItemPayload {
  productId: string;
  slug: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CreateOrderPayload {
  items: CartItemPayload[];
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country?: string;
  };
  giftNote?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateOrderPayload = await req.json();
    const { items, customer, giftNote } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });
    }

    if (!customer?.name || !customer?.email || !customer?.address || !customer?.city || !customer?.postal_code) {
      return NextResponse.json({ error: 'Please provide full shipping details.' }, { status: 400 });
    }

    const supabase = getServiceRoleClient();

    // 1. Authoritative Server-Side Product Validation & Price Calculation
    // Never trust client amounts. Validate each item against database or mock catalog.
    let dbProductsMap = new Map<string, { id: string; slug: string; name: string; price: number; leadTimeDays: number; image: string }>();

    if (supabase) {
      const slugs = items.map((i) => i.slug);
      const { data: dbProducts } = await supabase
        .from('products')
        .select('*')
        .in('slug', slugs)
        .eq('is_active', true);

      if (dbProducts && dbProducts.length > 0) {
        for (const p of dbProducts) {
          dbProductsMap.set(p.slug, {
            id: p.id,
            slug: p.slug,
            name: p.name,
            price: Number(p.price),
            leadTimeDays: Number(p.lead_time_days || 3),
            image: p.images?.[0]?.url || '/images/hero.jpg',
          });
        }
      }
    }

    // Fall back to seed products if Supabase isn't populated yet
    for (const mockP of PRODUCTS) {
      if (!dbProductsMap.has(mockP.slug)) {
        dbProductsMap.set(mockP.slug, {
          id: mockP.id,
          slug: mockP.slug,
          name: mockP.name,
          price: mockP.price,
          leadTimeDays: mockP.leadTimeDays,
          image: mockP.images?.[0]?.url || '/images/hero.jpg',
        });
      }
    }

    // Calculate verified line items and subtotal
    let subtotalPaise = 0;
    const verifiedOrderItems: Array<{
      productId?: string;
      productSlug: string;
      productName: string;
      unitPrice: number;
      selectedColor?: string;
      selectedSize?: string;
      quantity: number;
      lineTotal: number;
      leadTimeDays: number;
      imageUrl: string;
    }> = [];

    for (const item of items) {
      const product = dbProductsMap.get(item.slug);
      if (!product) {
        return NextResponse.json(
          { error: `Product "${item.slug}" is no longer available in our collection.` },
          { status: 400 }
        );
      }

      const qty = Math.max(1, Math.floor(item.quantity));
      const lineTotal = product.price * qty;
      subtotalPaise += lineTotal;

      verifiedOrderItems.push({
        productId: product.id.includes('-') && product.id.length === 36 ? product.id : undefined,
        productSlug: product.slug,
        productName: product.name,
        unitPrice: product.price,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: qty,
        lineTotal,
        leadTimeDays: product.leadTimeDays,
        imageUrl: product.image,
      });
    }

    // 2. Shipping & Total Calculation (in paise)
    const shippingFeePaise = subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE ? 0 : STANDARD_SHIPPING_FEE_PAISE;
    const totalAmountPaise = subtotalPaise + shippingFeePaise;

    // 3. Unique Order Number e.g. HZL-202611-9482
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const datePrefix = new Date().toISOString().slice(0, 7).replace('-', '');
    const orderNumber = `HZL-${datePrefix}-${randomSuffix}`;

    let dbOrderId = `ord-${Date.now()}`;
    let razorpayOrderId = `order_sim_${Date.now()}`;
    let isTestMode = false;

    // 4. Create Razorpay Order on the Server
    const razorpay = getRazorpayClient();
    if (razorpay) {
      try {
        const rzpOrder = await createRazorpayOrder({
          amountInPaise: totalAmountPaise,
          receipt: orderNumber,
          notes: {
            customer_name: customer.name,
            customer_email: customer.email,
            order_number: orderNumber,
          },
        });
        razorpayOrderId = rzpOrder.id;
      } catch (rzpErr: any) {
        console.error('Razorpay order creation failed:', rzpErr);
        return NextResponse.json(
          { error: 'Payment gateway error: ' + (rzpErr?.message || 'Unable to initiate Razorpay order.') },
          { status: 502 }
        );
      }
    } else {
      isTestMode = true;
    }

    // 5. Store pending order & order_items in Supabase
    if (supabase) {
      const { data: orderData, error: orderErr } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone || null,
          shipping_address: {
            name: customer.name,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            postal_code: customer.postal_code,
            country: customer.country || 'IN',
          },
          currency: 'INR',
          subtotal: subtotalPaise,
          shipping_fee: shippingFeePaise,
          discount_amount: 0,
          tax_amount: 0,
          total_amount: totalAmountPaise,
          status: 'pending',
          gift_note: giftNote || null,
        })
        .select('id')
        .single();

      if (orderErr) {
        console.error('Supabase order insert error:', orderErr);
      } else if (orderData) {
        dbOrderId = orderData.id;

        // Insert items snapshot
        const itemsToInsert = verifiedOrderItems.map((item) => ({
          order_id: dbOrderId,
          product_id: item.productId,
          product_slug: item.productSlug,
          product_name: item.productName,
          unit_price: item.unitPrice,
          selected_color: item.selectedColor || null,
          selected_size: item.selectedSize || null,
          quantity: item.quantity,
          line_total: item.lineTotal,
          lead_time_days: item.leadTimeDays,
          image_url: item.imageUrl,
        }));

        await supabase.from('order_items').insert(itemsToInsert);

        // Insert initial payment record
        await supabase.from('payments').insert({
          order_id: dbOrderId,
          provider: 'razorpay',
          provider_order_id: razorpayOrderId,
          status: 'created',
          amount: totalAmountPaise,
          currency: 'INR',
        });
      }
    }

    // 6. Return only necessary public checkout details to the browser
    return NextResponse.json({
      success: true,
      orderId: dbOrderId,
      orderNumber,
      razorpayOrderId,
      amount: totalAmountPaise,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || '',
      isTestMode,
      customerDetails: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone || '',
      },
    });
  } catch (err: any) {
    console.error('Order creation error:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal server error while preparing order.' },
      { status: 500 }
    );
  }
}
