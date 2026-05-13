import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { ProductGallery } from './components/product-gallery/product-gallery';
import { ProductInfo } from './components/product-info/product-info';
import { PurchaseCard } from './components/purchase-card/purchase-card';
import { FrequentlyBought } from './components/frequently-bought/frequently-bought';
import { ProductTabs } from './components/product-tabs/product-tabs';
import { RelatedProducts } from './components/related-products/related-products';
import { RecentlyViewed } from './components/recently-viewed/recently-viewed';
import { PRODUCT_NAME, VARIANTS } from './data';

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
  protected readonly productName = PRODUCT_NAME;
  protected readonly activeVariantIndex = signal(0);
  protected readonly activeMemoryIndex = signal(1);
  protected readonly activeVariant = computed(() => VARIANTS[this.activeVariantIndex()]);
}
