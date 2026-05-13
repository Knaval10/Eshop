import { CategoryNode, ColorOption, FilterOption, PopularCategory, Product } from './models';

export const POPULAR_CATEGORIES: PopularCategory[] = [
  {
    name: 'iPhone (iOS)',
    count: 142,
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&auto=format&fit=crop',
  },
  {
    name: 'Android',
    count: 318,
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&auto=format&fit=crop',
  },
  {
    name: '5G Support',
    count: 96,
    image:
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=200&auto=format&fit=crop',
  },
  {
    name: 'Apple Tablets',
    count: 47,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=200&auto=format&fit=crop',
  },
  {
    name: 'Chargers',
    count: 215,
    image:
      'https://images.unsplash.com/photo-1583863788434-e58a73c93737?w=200&auto=format&fit=crop',
  },
  {
    name: 'Gaming',
    count: 134,
    image:
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=200&auto=format&fit=crop',
  },
  {
    name: 'Xiaomi',
    count: 88,
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&auto=format&fit=crop',
  },
  {
    name: 'Accessories',
    count: 412,
    image:
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&auto=format&fit=crop',
  },
  {
    name: 'Samsung Tablets',
    count: 36,
    image:
      'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=200&auto=format&fit=crop',
  },
  {
    name: 'eReader',
    count: 22,
    image:
      'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=200&auto=format&fit=crop',
  },
];

export const CATEGORY_TREE: CategoryNode[] = [
  { name: 'All Categories', count: 1820 },
  {
    name: 'Cell Phones & Tablets',
    count: 642,
    children: [
      { name: 'All', count: 642 },
      { name: 'iPhone', count: 142 },
      { name: 'Samsung', count: 198 },
      { name: 'Xiaomi', count: 88 },
      { name: 'Asus', count: 34 },
    ],
  },
  { name: 'Laptops & Computers', count: 412 },
  { name: 'Audio & Headphones', count: 286 },
  { name: 'Gaming', count: 134 },
  { name: 'Accessories', count: 346 },
];

export const BRAND_FILTERS: FilterOption[] = [
  { label: 'Apple', value: 'apple', count: 142 },
  { label: 'Samsung', value: 'samsung', count: 198 },
  { label: 'Xiaomi', value: 'xiaomi', count: 88 },
  { label: 'Google', value: 'google', count: 41 },
  { label: 'OnePlus', value: 'oneplus', count: 23 },
  { label: 'Asus', value: 'asus', count: 34 },
];

export const RATING_FILTERS = [5, 4, 3, 2, 1];
export const SCREEN_SIZES = ['< 5"', '5"–6"', '6"–7"', '> 7"'];

export const COLORS: ColorOption[] = [
  { name: 'Black', hex: '#111111' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Silver', hex: '#c0c0c0' },
  { name: 'Gold', hex: '#d4af37' },
  { name: 'Blue', hex: '#1e40af' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Green', hex: '#16c60c' },
  { name: 'Purple', hex: '#7c3aed' },
];

export const MEMORY_OPTIONS: FilterOption[] = [
  { label: '64GB', value: '64', count: 88 },
  { label: '128GB', value: '128', count: 142 },
  { label: '256GB', value: '256', count: 96 },
  { label: '512GB', value: '512', count: 54 },
  { label: '1TB', value: '1024', count: 18 },
];

export const CONDITIONS: FilterOption[] = [
  { label: 'New', value: 'new' },
  { label: 'Like New', value: 'like-new' },
  { label: 'Open Box', value: 'open-box' },
];

export const BEST_SELLERS: Product[] = [
  {
    id: 101,
    name: 'iPhone 15 Pro Max 256GB Titanium',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&auto=format&fit=crop',
    price: 1199,
    oldPrice: 1299,
    badge: 'sale',
    badgeText: '-8%',
    shipping: 'Free shipping',
    stockStatus: 'in',
  },
  {
    id: 102,
    name: 'Samsung Galaxy S24 Ultra 512GB',
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop',
    price: 1299,
    oldPrice: 1399,
    badge: 'sale',
    badgeText: '-7%',
    shipping: 'Free shipping',
    stockStatus: 'in',
  },
  {
    id: 103,
    name: 'Google Pixel 8 Pro 256GB',
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop',
    price: 999,
    shipping: 'Free shipping',
    stockStatus: 'pre-order',
  },
  {
    id: 104,
    name: 'iPad Pro 12.9" M2 Wi-Fi + Cellular',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&auto=format&fit=crop',
    price: 1099,
    oldPrice: 1299,
    badge: 'sale',
    badgeText: '-15%',
    shipping: 'Free shipping',
    stockStatus: 'in',
  },
  {
    id: 105,
    name: 'OnePlus 12 256GB Flowy Emerald',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop',
    price: 799,
    shipping: 'Free shipping',
    stockStatus: 'contact',
  },
  {
    id: 106,
    name: 'Xiaomi 14 Ultra 512GB',
    image:
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&auto=format&fit=crop',
    price: 1099,
    stockStatus: 'out',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Apple iPhone 15 Pro 128GB Natural Titanium',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop',
    price: 999,
    oldPrice: 1099,
    badge: 'sale',
    badgeText: '-9%',
    shipping: 'Free shipping',
    stockStatus: 'in',
    reviewCount: 1284,
    freeGift: true,
    gallery: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=80&auto=format&fit=crop',
    ],
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24+ 256GB Onyx Black',
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop',
    price: 899,
    oldPrice: 999,
    badge: 'sale',
    badgeText: '-10%',
    shipping: 'Free shipping',
    stockStatus: 'in',
    reviewCount: 842,
  },
  {
    id: 3,
    name: 'Google Pixel 8 128GB Hazel',
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop',
    price: 599,
    shipping: 'Free shipping',
    stockStatus: 'in',
    reviewCount: 412,
    badge: 'new',
    badgeText: 'New',
  },
  {
    id: 4,
    name: 'Xiaomi Redmi Note 12 Pro+ 5G 256GB',
    image:
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&auto=format&fit=crop',
    price: 299,
    oldPrice: 379,
    badge: 'sale',
    badgeText: '-21%',
    shipping: 'Free shipping',
    stockStatus: 'in',
    reviewCount: 1622,
  },
  {
    id: 5,
    name: 'OnePlus 12R 256GB Cool Blue',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop',
    price: 499,
    shipping: 'Free shipping',
    stockStatus: 'pre-order',
    reviewCount: 188,
  },
  {
    id: 6,
    name: 'Apple iPad Air 11" M2 128GB Wi-Fi',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop',
    price: 599,
    oldPrice: 699,
    badge: 'sale',
    badgeText: '-14%',
    shipping: 'Free shipping',
    stockStatus: 'in',
    reviewCount: 524,
  },
  {
    id: 7,
    name: 'Samsung Galaxy Tab S9 FE 128GB',
    image:
      'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=500&auto=format&fit=crop',
    price: 449,
    shipping: 'Free shipping',
    stockStatus: 'in',
    reviewCount: 256,
  },
  {
    id: 8,
    name: 'Asus ROG Phone 8 Pro Gaming 512GB',
    image:
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500&auto=format&fit=crop',
    price: 1199,
    badge: 'new',
    badgeText: 'New',
    shipping: 'Free shipping',
    stockStatus: 'contact',
    reviewCount: 96,
  },
  {
    id: 9,
    name: 'Apple iPhone 14 128GB Midnight',
    image:
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop',
    price: 699,
    oldPrice: 829,
    badge: 'sale',
    badgeText: '-16%',
    shipping: 'Free shipping',
    stockStatus: 'in',
    reviewCount: 2188,
  },
  {
    id: 10,
    name: 'Samsung Galaxy A55 5G 256GB Iceblue',
    image:
      'https://images.unsplash.com/photo-1607936854279-55e8a4d64a4c?w=500&auto=format&fit=crop',
    price: 379,
    shipping: 'Free shipping',
    stockStatus: 'in',
    reviewCount: 642,
  },
  {
    id: 11,
    name: 'Xiaomi 14 Pro 512GB Ceramic White',
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop',
    price: 899,
    oldPrice: 999,
    badge: 'sale',
    badgeText: '-10%',
    shipping: 'Free shipping',
    stockStatus: 'in',
    reviewCount: 318,
  },
  {
    id: 12,
    name: 'Apple iPad Mini 6 64GB Wi-Fi Space Gray',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop',
    price: 449,
    stockStatus: 'out',
    badge: 'out',
    badgeText: 'Out of stock',
    reviewCount: 412,
  },
];
