export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;               // in integer paise (e.g. 449900 = ₹4,499)
  originalPrice?: number;      // in integer paise (e.g. 529900 = ₹5,299)
  category: 'wearables' | 'home-decor' | 'bags' | 'amigurumi' | 'accessories' | 'bouquets' | 'charms' | 'keychains' | 'bundles';
  categoryLabel: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  leadTimeDays: number;
  description: string;
  details: {
    materials: string[];
    dimensions?: string;
    careInstructions: string[];
    difficultyOrHours: string;
    yarnOrigin?: string;
  };
  images: {
    url: string;
    alt: string;
    isPrimary?: boolean;
  }[];
  colors: ProductVariant[];
  sizes?: string[];
  stockQuantity: number;
  isActive?: boolean;
}

export interface CartItem {
  id: string;                  // unique cart item key: productId-color-size
  productId: string;
  slug: string;
  name: string;
  price: number;               // in integer paise
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  leadTimeDays: number;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'payment_failed';

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string;
  productSlug: string;
  productName: string;
  unitPrice: number;           // in integer paise
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  lineTotal: number;           // in integer paise
  leadTimeDays?: number;
  imageUrl?: string;
  createdAt?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  provider: 'razorpay';
  providerOrderId: string;
  providerPaymentId?: string;
  providerSignature?: string;
  status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed';
  amount: number;              // in integer paise
  currency: string;
  errorCode?: string;
  errorDescription?: string;
  verifiedAt?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: ShippingAddress;
  currency: string;
  subtotal: number;            // in integer paise
  shippingFee: number;         // in integer paise
  discountAmount: number;      // in integer paise
  taxAmount: number;           // in integer paise
  totalAmount: number;         // in integer paise
  status: OrderStatus;
  giftNote?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
  payment?: Payment;
}

export interface AdminOrderStats {
  total_orders: number;
  paid_orders: number;
  pending_orders: number;
  refunded_orders: number;
  cancelled_orders: number;
  failed_orders: number;
  total_revenue_paise: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedBuyer: boolean;
  productName: string;
  avatarUrl?: string;
}

export interface CategoryMeta {
  id: 'all' | 'wearables' | 'home-decor' | 'bags' | 'amigurumi' | 'accessories' | 'bouquets' | 'charms' | 'keychains' | 'bundles';
  name: string;
  description: string;
  image: string;
  itemCount: number;
}
