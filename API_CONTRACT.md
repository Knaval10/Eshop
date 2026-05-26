# Eshop API Contract

This API contract is based on the mock data used in the app pages.
It excludes the `user` and `comments` pages, which currently use an external mock API (`jsonplaceholder.typicode.com`).

## Overview

The repository uses local mock data for page rendering in the following sections:
- Home page
- Products page
- Product detail page
- About page
- Checkout page

## Home API

### GET /api/home/hero-slides
Response: `HeroSlide[]`

```
interface HeroSlide {
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  bg: string;
}
```

### GET /api/home/sidebar-categories
Response: `SidebarCategory[]`

```
interface SidebarCategory {
  name: string;
  icon: string;
}
```

### GET /api/home/brands
Response: `string[]`

### GET /api/home/products?category={category}
Response: `HomeProduct[]`

```
interface HomeProduct {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice?: number;
  tag?: string;
  badge?: 'sale' | 'new' | 'hot';
}
```

### GET /api/home/laptop-categories
Response: `string[]`

## Products API

### GET /api/products/popular-categories
Response: `PopularCategory[]`

```
interface PopularCategory {
  name: string;
  count: number;
  image: string;
}
```

### GET /api/products/categories
Response: `CategoryNode[]`

```
interface CategoryNode {
  name: string;
  count: number;
  children?: { name: string; count: number }[];
}
```

### GET /api/products/filters
Response: {
  brands: FilterOption[];
  ratings: number[];
  screenSizes: string[];
  colors: ColorOption[];
  memoryOptions: FilterOption[];
  conditions: FilterOption[];
}

```
interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface ColorOption {
  name: string;
  hex: string;
}
```

### GET /api/products/best-sellers
Response: `Product[]`

### GET /api/products
Response: `Product[]`

```
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  badge?: 'sale' | 'new' | 'out';
  badgeText?: string;
  shipping?: string;
  stockStatus?: 'in' | 'pre-order' | 'contact' | 'out';
  reviewCount?: number;
  gallery?: string[];
  freeGift?: boolean;
}
```

## Product Detail API

### GET /api/products/{id}
Response: `ProductDetail`

```
interface ProductVariant {
  color: string;
  hex: string;
  image: string;
  price: number;
}

interface RelatedProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  badge?: 'sale' | 'new';
  badgeText?: string;
  shipping?: string;
  stockStatus?: 'in' | 'pre-order' | 'out';
}

interface BundleItem {
  id: number;
  name: string;
  image: string;
  price: number;
  selected: boolean;
}

interface Review {
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

interface ProductDetail {
  id: number;
  name: string;
  sku: string;
  brand: string;
  category: string;
  price: number;
  gallery: string[];
  features: string[];
  variants: ProductVariant[];
  memoryOptions: string[];
  tabs: string[];
  bundleDefaults: BundleItem[];
  relatedProducts: RelatedProduct[];
  recentlyViewed: RelatedProduct[];
  reviews: Review[];
}
```

## About API

### GET /api/about/stats
Response: `Stat[]`

```
interface Stat {
  value: string;
  label: string;
}
```

### GET /api/about/features
Response: `FeatureCard[]`

```
interface FeatureCard {
  title: string;
  description: string;
  icon: string;
}
```

### GET /api/about/timeline
Response: {
  left: TimelineItem[];
  right: TimelineItem[];
}

```
interface TimelineItem {
  year: string;
  description: string;
}
```

### GET /api/about/team
Response: `TeamMember[]`

```
interface TeamMember {
  name: string;
  role: string;
  image: string;
}
```

## Checkout API

### GET /api/checkout/cart
Response: `CheckoutCart`

```
interface OrderItem {
  name: string;
  variant: string;
  quantity: number;
  price: number;
  image: string;
}

interface CheckoutCart {
  items: OrderItem[];
  shipping: number;
  subtotal: number;
  total: number;
}
```

### POST /api/checkout/order
Request: `CheckoutOrderRequest`

```
interface CheckoutOrderRequest {
  billing: {
    firstName: string;
    lastName: string;
    company: string;
    country: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    notes: string;
  };
  payment: 'bank' | 'cod' | 'paypal';
  total: number;
}
```

Response: `CheckoutOrderResult`

```
interface CheckoutOrderResult {
  success: boolean;
  orderId?: string;
  message?: string;
}
```

## Notes

- This contract is derived from local mock data definitions and page state in `src/app/features/`.
- `user` and `comments` pages are intentionally excluded because they use external mock APIs.
- The endpoints are proposed as REST-style resources matching the existing page data shapes.
