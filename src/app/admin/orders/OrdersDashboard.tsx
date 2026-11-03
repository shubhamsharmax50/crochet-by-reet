'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  ShoppingBagIcon,
  SearchIcon,
  ShieldCheckIcon,
  CheckIcon,
  TruckIcon,
  ClockIcon,
  SparklesIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from '@/components/Icons';
import { AdminOrderStats, Order } from '@/types';
import { formatINR, formatDate } from '@/lib/format';
import { createClient } from '@/lib/supabase/client';

export default function OrdersDashboard({ adminEmail }: { adminEmail: string }) {
  const [stats, setStats] = useState<AdminOrderStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Supabase Auth state
  const [user, setUser] = useState<{ email?: string } | null>({ email: adminEmail });
  const supabase = useMemo(() => createClient(), []);

  // Fetch orders & stats
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      if (selectedStatus !== 'all') params.set('status', selectedStatus);

      const res = await fetch(`/api/admin/orders?${params.toString()}`, { cache: 'no-store' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch admin orders.');
      }

      setStats(data.stats);
      setOrders(data.orders || []);
      if (data.user) {
        setUser(data.user);
      }
    } catch (err: any) {
      setError(err?.message || 'Error loading orders.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    window.location.assign('/admin/login');
  };

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'badge-sage';
      case 'pending':
        return 'badge-cream';
      case 'refunded':
      case 'cancelled':
      case 'payment_failed':
        return 'badge-terracotta';
      default:
        return 'badge-cream';
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Admin Top Header */}
      <div
        style={{
          backgroundColor: '#1E2522',
          color: '#FFFFFF',
          padding: '24px 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-honey)',
                  backgroundColor: 'rgba(221, 161, 94, 0.15)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                Atelier Operations
              </span>
              <span style={{ fontSize: '0.8rem', color: '#8E9E94' }}>INR &bull; Razorpay Verified</span>
            </div>
            <h1 style={{ color: '#FFFFFF', fontSize: '1.8rem', margin: '6px 0 0 0' }}>
              Order Management &amp; Revenue
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: '#C2D6CA' }}>{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline btn-sm"
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ fontSize: '0.82rem', color: 'var(--color-honey)' }}>
                🛡️ Verified Server Mode
              </div>
            )}
            <Link href="/" className="btn btn-primary btn-sm">
              View Storefront
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* KPI Stats Cards (Computed directly from Database queries) */}
        {stats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2.5rem',
            }}
          >
            {/* Total Revenue */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Verified Paid Revenue
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-sage-700)', marginTop: '4px' }}>
                {formatINR(stats.total_revenue_paise)}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-sage-600)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheckIcon size={14} /> From captured Razorpay orders
              </div>
            </div>

            {/* Total Orders */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Total Orders
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                {stats.total_orders}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                All customer orders placed
              </div>
            </div>

            {/* Paid Orders */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Paid &amp; Confirmed
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-sage-600)', marginTop: '4px' }}>
                {stats.paid_orders}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-sage-600)', marginTop: '4px' }}>
                Ready for studio crafting
              </div>
            </div>

            {/* Pending Orders */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Pending Payment
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#C86D51', marginTop: '4px' }}>
                {stats.pending_orders}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Awaiting gateway verification
              </div>
            </div>

            {/* Refunded or Cancelled */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Refunded / Cancelled
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-muted)', marginTop: '4px' }}>
                {stats.refunded_orders + stats.cancelled_orders}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Processed adjustments
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '16px 20px',
            marginBottom: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', minWidth: '280px', flex: 1 }}>
            <SearchIcon size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by order number (HZL-...), customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: '38px', borderRadius: 'var(--radius-full)' }}
            />
          </div>

          {/* Status Filter Buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'paid', label: 'Paid' },
              { id: 'pending', label: 'Pending' },
              { id: 'shipped', label: 'Shipped' },
              { id: 'refunded', label: 'Refunded' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: selectedStatus === tab.id ? 700 : 500,
                  backgroundColor: selectedStatus === tab.id ? 'var(--color-sage-100)' : 'var(--color-cream-100)',
                  color: selectedStatus === tab.id ? 'var(--color-sage-700)' : 'var(--text-secondary)',
                  border: selectedStatus === tab.id ? '1px solid var(--color-sage-300)' : '1px solid var(--border-color-subtle)',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading order records from database...
            </div>
          ) : error ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--color-terracotta-600)' }}>
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No orders found matching the filter criteria.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {orders.map((order) => {
                const isExpanded = expandedOrderId === order.id;
                return (
                  <div
                    key={order.id}
                    style={{
                      borderBottom: '1px solid var(--border-color-subtle)',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    {/* Row Header */}
                    <div
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                      style={{
                        padding: '18px 24px',
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 1.5fr 1fr 1fr auto',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: 'pointer',
                        backgroundColor: isExpanded ? 'var(--color-cream-50)' : 'transparent',
                      }}
                    >
                      {/* Order Number & Date */}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          {order.orderNumber}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {formatDate(order.createdAt)}
                        </div>
                      </div>

                      {/* Customer Details */}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                          {order.customerName}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {order.customerEmail}
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div>
                        <span className={`badge ${statusBadgeClass(order.status)}`}>
                          {order.status.toUpperCase()}
                        </span>
                        {order.payment && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-sage-700)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <ShieldCheckIcon size={13} /> {order.payment.provider} ({order.payment.status})
                          </div>
                        )}
                      </div>

                      {/* Total */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-sage-800)' }}>
                          {formatINR(order.totalAmount)}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {order.items?.length || 1} item(s)
                        </div>
                      </div>

                      {/* Chevron */}
                      <div
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.2s ease',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <ChevronDownIcon size={18} />
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div
                        style={{
                          padding: '20px 24px 24px 24px',
                          backgroundColor: 'var(--color-cream-50)',
                          borderTop: '1px dashed var(--border-color)',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                          gap: '24px',
                        }}
                      >
                        {/* Order Items */}
                        <div>
                          <h4 style={{ fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '12px' }}>
                            Line Items Snapshot ({order.items?.length || 0})
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {order.items?.map((item) => (
                              <div
                                key={item.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  backgroundColor: '#FFFFFF',
                                  padding: '10px 14px',
                                  borderRadius: '10px',
                                  border: '1px solid var(--border-color-subtle)',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  {item.imageUrl && (
                                    <img
                                      src={item.imageUrl}
                                      alt={item.productName}
                                      style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }}
                                    />
                                  )}
                                  <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.productName}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                      Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                                    </div>
                                  </div>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                                  {formatINR(item.lineTotal)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping & Delivery Address */}
                        <div>
                          <h4 style={{ fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '12px' }}>
                            Shipping Destination
                          </h4>
                          <div
                            style={{
                              backgroundColor: '#FFFFFF',
                              padding: '14px',
                              borderRadius: '10px',
                              border: '1px solid var(--border-color-subtle)',
                              fontSize: '0.88rem',
                              lineHeight: 1.6,
                            }}
                          >
                            <div style={{ fontWeight: 600 }}>{order.shippingAddress?.name || order.customerName}</div>
                            <div>{order.shippingAddress?.address}</div>
                            <div>
                              {order.shippingAddress?.city}, {order.shippingAddress?.state} — {order.shippingAddress?.postal_code}
                            </div>
                            <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                              Phone: {order.customerPhone || 'Not provided'}
                            </div>
                            {order.giftNote && (
                              <div style={{ marginTop: '10px', padding: '8px 10px', backgroundColor: 'var(--color-cream-100)', borderRadius: '6px', fontStyle: 'italic', fontSize: '0.82rem' }}>
                                Gift Note: &ldquo;{order.giftNote}&rdquo;
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Payment Ledger Info */}
                        <div>
                          <h4 style={{ fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '12px' }}>
                            Razorpay Transaction Ledger
                          </h4>
                          <div
                            style={{
                              backgroundColor: '#FFFFFF',
                              padding: '14px',
                              borderRadius: '10px',
                              border: '1px solid var(--border-color-subtle)',
                              fontSize: '0.85rem',
                              lineHeight: 1.6,
                            }}
                          >
                            <div><strong>Provider:</strong> Razorpay (INR)</div>
                            <div><strong>Order ID:</strong> <code>{order.payment?.providerOrderId || 'N/A'}</code></div>
                            <div><strong>Payment ID:</strong> <code>{order.payment?.providerPaymentId || 'N/A'}</code></div>
                            <div>
                              <strong>Verified At:</strong>{' '}
                              {order.payment?.verifiedAt ? formatDate(order.payment.verifiedAt) : 'Pending gateway capture'}
                            </div>
                            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-color-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                              <span>Subtotal: {formatINR(order.subtotal)}</span>
                              <span>Shipping: {order.shippingFee === 0 ? 'FREE' : formatINR(order.shippingFee)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
