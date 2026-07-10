export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  categoryId?: string;
  categoryName?: string;
  brandId?: string;
  brandName?: string;
  images: { url: string; public_id: string }[];
  sizes?: string[];
  colors?: string[];
  stock: number;
  featured?: boolean;
  newArrival?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  cta?: string;
  link?: string;
  active: boolean;
  order?: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: {
    productId: string;
    name: string;
    image: string;
    price: number;
    qty: number;
    size?: string;
  }[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentMethod: "cod";
  status: OrderStatus;
  createdAt?: any;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percent" | "flat";
  value: number;
  minOrder?: number;
  expiresAt?: any;
  active: boolean;
}

export interface UserRecord {
  uid: string;
  email: string;
  displayName?: string;
  phone?: string;
  blocked?: boolean;
  createdAt?: any;
}

export interface StoreSettings {
  storeName: string;
  tagline?: string;
  email?: string;
  phone?: string;
  address?: string;
  shippingFee: number;
  freeShippingAbove?: number;
  currency: string;
}