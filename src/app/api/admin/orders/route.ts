import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/supabase/admin';
import { getAdminSession } from '@/lib/supabase/admin-auth';
import { AdminOrderStats, Order } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    const { user, isAdmin } = await getAdminSession();
    const serviceRoleClient = getServiceRoleClient();

    // Admin data is never available without an authenticated admin session,
    // including during development and when the database has no orders yet.
    if (!user) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 });
    if (!isAdmin) return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
    if (!serviceRoleClient) return NextResponse.json({ error: 'Admin data is not configured.' }, { status: 503 });

    // 2. Fetch Aggregated Stats Directly from Database (Avoid loading every row into memory)
    let stats: AdminOrderStats = {
      total_orders: 0,
      paid_orders: 0,
      pending_orders: 0,
      refunded_orders: 0,
      cancelled_orders: 0,
      failed_orders: 0,
      total_revenue_paise: 0,
    };

    let orders: Order[] = [];

    {
      // Call RPC or execute server-side count queries
      try {
        const { data: rpcStats, error: rpcErr } = await serviceRoleClient.rpc('get_admin_order_stats');
        if (!rpcErr && rpcStats) {
          stats = rpcStats;
        } else {
          // Fallback to direct count aggregation
          const { data: orderAggs } = await serviceRoleClient
            .from('orders')
            .select('status, total_amount');

          if (orderAggs && orderAggs.length > 0) {
            stats.total_orders = orderAggs.length;
            stats.paid_orders = orderAggs.filter((o) => o.status === 'paid').length;
            stats.pending_orders = orderAggs.filter((o) => o.status === 'pending').length;
            stats.refunded_orders = orderAggs.filter((o) => o.status === 'refunded').length;
            stats.cancelled_orders = orderAggs.filter((o) => o.status === 'cancelled').length;
            stats.failed_orders = orderAggs.filter((o) => o.status === 'payment_failed').length;
            stats.total_revenue_paise = orderAggs
              .filter((o) => o.status === 'paid')
              .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
          }
        }
      } catch (e) {
        console.warn('Could not compute database stats RPC:', e);
      }

      // 3. Fetch Filtered Orders List
      let query = serviceRoleClient
        .from('orders')
        .select(`
          id,
          order_number,
          customer_name,
          customer_email,
          customer_phone,
          shipping_address,
          currency,
          subtotal,
          shipping_fee,
          discount_amount,
          tax_amount,
          total_amount,
          status,
          gift_note,
          created_at,
          updated_at,
          items:order_items (
            id,
            product_slug,
            product_name,
            unit_price,
            selected_color,
            selected_size,
            quantity,
            line_total,
            image_url
          ),
          payments:payments (
            id,
            provider,
            provider_order_id,
            provider_payment_id,
            status,
            amount,
            verified_at,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (status !== 'all') {
        query = query.eq('status', status);
      }

      if (search.trim()) {
        query = query.or(
          `order_number.ilike.%${search}%,customer_name.ilike.%${search}%,customer_email.ilike.%${search}%`
        );
      }

      const { data: dbOrders, error: ordersErr } = await query.limit(50);

      if (!ordersErr && dbOrders && dbOrders.length > 0) {
        orders = dbOrders.map((o: any) => ({
          id: o.id,
          orderNumber: o.order_number,
          customerName: o.customer_name,
          customerEmail: o.customer_email,
          customerPhone: o.customer_phone,
          shippingAddress: o.shipping_address,
          currency: o.currency || 'INR',
          subtotal: Number(o.subtotal),
          shippingFee: Number(o.shipping_fee || 0),
          discountAmount: Number(o.discount_amount || 0),
          taxAmount: Number(o.tax_amount || 0),
          totalAmount: Number(o.total_amount),
          status: o.status,
          giftNote: o.gift_note,
          createdAt: o.created_at,
          updatedAt: o.updated_at,
          items: o.items?.map((item: any) => ({
            id: item.id,
            orderId: o.id,
            productSlug: item.product_slug,
            productName: item.product_name,
            unitPrice: Number(item.unit_price),
            selectedColor: item.selected_color,
            selectedSize: item.selected_size,
            quantity: Number(item.quantity),
            lineTotal: Number(item.line_total),
            imageUrl: item.image_url,
          })),
          payment: o.payments?.[0]
            ? {
                id: o.payments[0].id,
                orderId: o.id,
                provider: o.payments[0].provider,
                providerOrderId: o.payments[0].provider_order_id,
                providerPaymentId: o.payments[0].provider_payment_id,
                status: o.payments[0].status,
                amount: Number(o.payments[0].amount),
                currency: 'INR',
                verifiedAt: o.payments[0].verified_at,
                createdAt: o.payments[0].created_at,
              }
            : undefined,
        }));
      }
    }

    return NextResponse.json({
      success: true,
      stats,
      orders,
      user: user.email ? { email: user.email } : null,
    });
  } catch (err: any) {
    console.error('Admin orders API exception:', err);
    return NextResponse.json({ error: err?.message || 'Server error fetching admin orders.' }, { status: 500 });
  }
}
