import { BundleItem, ProductVariant, RelatedProduct, Review } from './models';

export const PRODUCT_NAME = 'Somseng Galatero X6 Ultra LTE 4G/128GB Black Smartphone';
export const SKU = 'ABC025168';
export const BRAND = 'sumsong';
export const CATEGORY = 'Cell Phones & Tablets';

export const GALLERY = [
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611791484670-ce19b801d192?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=900&auto=format&fit=crop',
];

export const FEATURES = [
  'Snapdragon 8 Gen 2 with 5G connectivity',
  '6.7" Dynamic AMOLED 2X display, 120Hz',
  'Triple-lens 200MP camera system',
  'IP68 water and dust resistance',
  '5000 mAh battery with 45W fast charging',
];

export const VARIANTS: ProductVariant[] = [
  {
    color: 'Midnight Blue',
    hex: '#1e3a8a',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&auto=format&fit=crop',
    price: 569,
  },
  {
    color: 'Deep Purple',
    hex: '#6d28d9',
    image:
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200&auto=format&fit=crop',
    price: 589,
  },
  {
    color: 'Space Black',
    hex: '#111111',
    image:
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=200&auto=format&fit=crop',
    price: 609,
  },
];

export const MEMORY_OPTIONS = ['64GB', '128GB', '256GB', '512GB'];

export const TABS = ['DESCRIPTION', 'REVIEWS (5)', 'ADDITIONAL INFORMATION'];

export const BUNDLE_DEFAULTS: BundleItem[] = [
  {
    id: 1,
    name: 'Somseng Galatero X6 Ultra',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&auto=format&fit=crop',
    price: 569,
    selected: true,
  },
  {
    id: 2,
    name: 'Wireless Charging Pad',
    image:
      'https://images.unsplash.com/photo-1583863788434-e58a73c93737?w=200&auto=format&fit=crop',
    price: 39,
    selected: true,
  },
  {
    id: 3,
    name: 'Premium Silicone Case',
    image:
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&auto=format&fit=crop',
    price: 19,
    selected: true,
  },
];

export const RELATED_PRODUCTS: RelatedProduct[] = [
  {
    id: 201,
    name: 'Apple iPhone 15 Pro 128GB Natural Titanium',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop',
    price: 999,
    oldPrice: 1099,
    badge: 'sale',
    badgeText: '-9%',
    shipping: 'Free shipping',
    stockStatus: 'in',
  },
  {
    id: 202,
    name: 'Samsung Galaxy S24+ 256GB Onyx',
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop',
    price: 899,
    oldPrice: 999,
    badge: 'sale',
    badgeText: '-10%',
    shipping: 'Free shipping',
    stockStatus: 'in',
  },
  {
    id: 203,
    name: 'Google Pixel 8 Pro 256GB Hazel',
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop',
    price: 999,
    badge: 'new',
    badgeText: 'New',
    shipping: 'Free shipping',
    stockStatus: 'in',
  },
  {
    id: 204,
    name: 'Xiaomi Redmi Note 12 Pro+ 5G',
    image:
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&auto=format&fit=crop',
    price: 299,
    oldPrice: 379,
    badge: 'sale',
    badgeText: '-21%',
    shipping: 'Free shipping',
    stockStatus: 'in',
  },
  {
    id: 205,
    name: 'OnePlus 12R 256GB Cool Blue',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop',
    price: 499,
    shipping: 'Free shipping',
    stockStatus: 'pre-order',
  },
  {
    id: 206,
    name: 'Asus ROG Phone 8 Pro 512GB',
    image:
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500&auto=format&fit=crop',
    price: 1199,
    badge: 'new',
    badgeText: 'New',
    shipping: 'Free shipping',
    stockStatus: 'in',
  },
];

export const RECENTLY_VIEWED: RelatedProduct[] = [
  {
    id: 301,
    name: 'iPad Pro 12.9" M2',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&auto=format&fit=crop',
    price: 1099,
    oldPrice: 1299,
    badge: 'sale',
    badgeText: '-15%',
  },
  {
    id: 302,
    name: 'Galaxy Tab S9 Ultra 512GB',
    image:
      'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=400&auto=format&fit=crop',
    price: 999,
  },
  {
    id: 303,
    name: 'Surface Pro 9 i7 256GB',
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&auto=format&fit=crop',
    price: 899,
    oldPrice: 1099,
    badge: 'sale',
    badgeText: '-18%',
  },
  {
    id: 304,
    name: 'Sony WH-1000XM5',
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&auto=format&fit=crop',
    price: 349,
    oldPrice: 399,
    badge: 'sale',
    badgeText: '-12%',
  },
  {
    id: 305,
    name: 'Bose QuietComfort Ultra',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop',
    price: 429,
    badge: 'new',
    badgeText: 'New',
  },
  {
    id: 306,
    name: 'Apple AirPods Max Sky Blue',
    image:
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&auto=format&fit=crop',
    price: 549,
  },
];

export const REVIEWS: Review[] = [
  {
    author: 'Daniel R.',
    rating: 5,
    date: 'Mar 12, 2026',
    title: 'Best smartphone I have owned',
    body: 'Battery life is incredible and the camera is stunning. Fast delivery and authentic packaging.',
  },
  {
    author: 'Priya S.',
    rating: 4,
    date: 'Feb 28, 2026',
    title: 'Great phone, slight learning curve',
    body: 'The display is gorgeous. Took a few days to figure out all the features but worth it.',
  },
  {
    author: 'Marco T.',
    rating: 5,
    date: 'Feb 04, 2026',
    title: 'Worth every penny',
    body: 'Premium build quality. The 5G speeds are impressive in my area.',
  },
  {
    author: 'Aisha K.',
    rating: 5,
    date: 'Jan 19, 2026',
    title: 'Phenomenal camera',
    body: '200MP camera makes a real difference for product photos. Highly recommend.',
  },
  {
    author: 'Tom B.',
    rating: 4,
    date: 'Jan 02, 2026',
    title: 'Solid all-rounder',
    body: 'Great performance for gaming and daily use. Charger could be in the box though.',
  },
];
