import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';
import { getServiceRoleClient } from './supabase/admin';

// Helper to map Supabase database row to frontend Product type
function mapDbRowToProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline || '',
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    category: row.category,
    categoryLabel: row.category_label,
    rating: Number(row.rating || 5.0),
    reviewCount: Number(row.review_count || 0),
    isFeatured: Boolean(row.is_featured),
    isBestseller: Boolean(row.is_bestseller),
    isNew: Boolean(row.is_new),
    leadTimeDays: Number(row.lead_time_days || 3),
    description: row.description,
    details: row.details || { materials: [], careInstructions: [], difficultyOrHours: '' },
    images: row.images || [],
    colors: row.colors || [],
    sizes: row.sizes || undefined,
    stockQuantity: Number(row.stock_quantity || 0),
    isActive: Boolean(row.is_active),
  };
}

/**
 * Fetch all active products.
 * Tries Supabase first; if not configured or empty, falls back gracefully to mock data.
 */
export async function getActiveProducts(): Promise<Product[]> {
  try {
    const supabase = getServiceRoleClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(mapDbRowToProduct);
      }
    }
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to mock catalog:', err);
  }

  return PRODUCTS;
}

/**
 * Fetch single product by slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = getServiceRoleClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (!error && data) {
        return mapDbRowToProduct(data);
      }
    }
  } catch (err) {
    console.warn(`Supabase fetch for slug "${slug}" failed, falling back to mock:`, err);
  }

  const mock = PRODUCTS.find((p) => p.slug === slug);
  return mock || null;
}
