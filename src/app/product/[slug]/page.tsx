import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductDetailView } from '@/components/ProductDetailView';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Crafted by Reet`,
    description: `${product.tagline}. ${product.description.slice(0, 150)}...`,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [
        {
          url: product.images[0]?.url || '/images/sunflower-bouquet.jpg',
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const relatedProducts =
    related.length < 3
      ? [...related, ...PRODUCTS.filter((p) => p.id !== product.id && !related.includes(p))].slice(0, 3)
      : related;

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
