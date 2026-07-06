import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { ProductGallery } from './components/product-gallery/product-gallery';
import { ProductInfo } from './components/product-info/product-info';
import { PurchaseCard } from './components/purchase-card/purchase-card';
import { FrequentlyBought } from './components/frequently-bought/frequently-bought';
import { ProductTabs } from './components/product-tabs/product-tabs';
import { RelatedProducts } from './components/related-products/related-products';
import { RecentlyViewed } from './components/recently-viewed/recently-viewed';
import { PRODUCT_NAME, VARIANTS, GALLERY, FEATURES, SKU, BRAND, CATEGORY } from './data';
import { ProductService } from '../../core/services/product.service';
import {
  mapBackendToUnifiedProduct,
  mapMockToUnifiedProduct,
  getMockProductById,
} from '../../core/services/product-mapper';

@Component({
  selector: 'app-product-detail',
  imports: [
    Breadcrumb,
    ProductGallery,
    ProductInfo,
    PurchaseCard,
    FrequentlyBought,
    ProductTabs,
    RelatedProducts,
    RecentlyViewed,
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  private readonly apiProduct = signal<any>(null);

  protected readonly product = computed(() => {
    const ap = this.apiProduct();
    if (ap) {
      return ap;
    }
    return mapMockToUnifiedProduct({
      id: 'mock',
      name: PRODUCT_NAME,
      price: 569,
      image: GALLERY[0],
      gallery: GALLERY,
      features: FEATURES,
      variants: VARIANTS,
      memoryOptions: ['64GB', '128GB', '256GB', '512GB'],
      sku: SKU,
      brand: BRAND,
      category: CATEGORY,
      stock: 10,
    });
  });

  protected readonly productName = computed(() => this.product().name);
  protected readonly activeVariantIndex = signal(0);
  protected readonly activeMemoryIndex = signal(1);
  protected readonly activeVariant = computed(() => {
    const p = this.product();
    return p.variants[this.activeVariantIndex()] || p.variants[0];
  });

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
        this.productService.getProductById(id).subscribe({
          next: (data) => {
            if (data) {
              this.apiProduct.set(mapBackendToUnifiedProduct(data));
            } else {
              this.apiProduct.set(null);
            }
            this.activeVariantIndex.set(0);
            this.activeMemoryIndex.set(1);
          },
          error: () => {
            const mock = getMockProductById(id);
            if (mock) {
              this.apiProduct.set(mapMockToUnifiedProduct(mock));
            } else {
              this.apiProduct.set(null);
            }
            this.activeVariantIndex.set(0);
            this.activeMemoryIndex.set(1);
          },
        });
      } else if (id) {
        const mock = getMockProductById(id);
        if (mock) {
          this.apiProduct.set(mapMockToUnifiedProduct(mock));
        } else {
          this.apiProduct.set(null);
        }
        this.activeVariantIndex.set(0);
        this.activeMemoryIndex.set(1);
      }
    });
  }
}
