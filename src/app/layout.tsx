import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { StorefrontChrome } from '@/components/StorefrontChrome';

export const metadata: Metadata = {
  metadataBase: new URL('https://craftedbyreet.com'),
  title: {
    default: 'Crafted by Reet | Handmade Crochet by Reet Bhadani',
    template: '%s | Crafted by Reet',
  },
  description:
    'Handcrafted crochet creations by Reet Bhadani. Small-batch cardigans, daisy totes, amigurumi plushies, and custom crochet pieces made with premium yarn.',
  keywords: [
    'Crafted by Reet',
    'Reet Bhadani',
    'handmade crochet India',
    'crochet shop',
    'crochet cardigan',
    'amigurumi plushie',
    'crochet tote bag',
    'small batch crochet',
    'handcrafted crochet gifts',
  ],
  openGraph: {
    title: 'Crafted by Reet | Handcrafted Crochet by Reet Bhadani',
    description: 'Slow-crafted handmade crochet creations and custom pieces made with love in small batches.',
    url: 'https://craftedbyreet.com',
    siteName: 'Crafted by Reet',
    images: [
      {
        url: '/images/sunflower-bouquet.jpg',
        width: 1200,
        height: 675,
        alt: 'Crafted by Reet — Handmade Crochet Studio',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <CartProvider>
            <Suspense fallback={<div aria-hidden="true" style={{ minHeight: '1px' }} /> }>
              <StorefrontChrome>{children}</StorefrontChrome>
            </Suspense>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
