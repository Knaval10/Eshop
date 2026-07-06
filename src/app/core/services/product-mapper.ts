import { BackendProduct } from './product.service';
import { PRODUCTS } from '../../features/products/data';
import { HEADPHONES, TABLETS, LAPTOPS } from '../../features/home/data';

export interface UnifiedProduct {
  id: string | number;
  name: string;
  price: number;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
  variants: { color: string; hex: string; image: string; price: number }[];
  memoryOptions: string[];
  sku: string;
  brand: string;
  category: string;
  stock: number;
}

export function getMockProductById(id: string | number): any {
  const allMock = [...PRODUCTS, ...HEADPHONES, ...TABLETS, ...LAPTOPS];
  return allMock.find((p) => String(p.id) === String(id)) || null;
}

export function mapBackendToProduct(bp: BackendProduct): any {
  const isPS5 = bp.name.toLowerCase().includes('playstation');
  const image = isPS5
    ? 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop'
    : 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&auto=format&fit=crop';

  return {
    id: bp._id,
    name: bp.name,
    price: bp.price,
    oldPrice: bp.price * 1.15,
    image,
    badge: bp.stock > 0 ? 'sale' : 'out',
    badgeText: bp.stock > 0 ? '-15%' : 'Out of stock',
    shipping: 'Free shipping',
    stockStatus: bp.stock > 0 ? 'in' : 'out',
    reviewCount: 42,
    gallery: [image],
    description: bp.description,
  };
}

export function mapBackendToHomeProduct(bp: BackendProduct): any {
  const isPS5 = bp.name.toLowerCase().includes('playstation');
  const image = isPS5
    ? 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop'
    : 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&auto=format&fit=crop';

  return {
    id: bp._id,
    name: bp.name,
    brand: isPS5 ? 'Sony' : 'Eshop',
    image,
    price: bp.price,
    oldPrice: bp.price * 1.15,
    tag: 'Free Shipping',
    badge: 'sale',
  };
}

export function mapBackendToUnifiedProduct(bp: BackendProduct): UnifiedProduct {
  const name = bp.name || 'Product';
  const price = bp.price || 0;
  const isPS5 = name.toLowerCase().includes('playstation');
  const image = isPS5
    ? 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=900&auto=format&fit=crop'
    : 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=900&auto=format&fit=crop';

  return {
    id: bp._id,
    name,
    price,
    description: bp.description || 'No description available.',
    image,
    gallery: [
      image,
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=900&auto=format&fit=crop',
    ],
    features: [
      'Authentic original manufacturer device',
      'Tested and certified for safety and reliability',
      'Backed by 1-year store warranty',
      bp.description || 'Premium design and construction',
    ],
    variants: [{ color: 'Standard', hex: '#111111', image, price }],
    memoryOptions: ['Standard'],
    sku: bp._id.substring(0, 8).toUpperCase(),
    brand: isPS5 ? 'Sony' : 'Eshop',
    category: isPS5 ? 'Gaming' : 'Electronics',
    stock: bp.stock ?? 10,
  };
}

export function mapMockToUnifiedProduct(mp: any): UnifiedProduct {
  const image = mp.image || 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=900&auto=format&fit=crop';
  return {
    id: mp.id,
    name: mp.name,
    price: mp.price,
    description: mp.description || 'Premium performance. Sleek design. Uncompromised quality.',
    image,
    gallery: mp.gallery || [
      image,
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=900&auto=format&fit=crop',
    ],
    features: [
      'High-performance capabilities',
      'Sleek modern design with premium materials',
      'Outstanding battery life and efficiency',
      '1-year brand warranty included',
    ],
    variants: [{ color: 'Standard Blue', hex: '#1e3a8a', image, price: mp.price }],
    memoryOptions: ['128GB', '256GB'],
    sku: `SKU-${mp.id}`,
    brand: mp.brand || 'Eshop',
    category: 'Electronics',
    stock: 10,
  };
}
