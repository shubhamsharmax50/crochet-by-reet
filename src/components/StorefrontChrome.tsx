'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { useCart } from '@/context/CartContext';

export function StorefrontChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isCheckoutOpen, closeCheckout } = useCart();
  if (pathname.startsWith('/admin')) return <main>{children}</main>;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={closeCheckout} />
    </>
  );
}

