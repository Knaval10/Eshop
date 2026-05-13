import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { BRAND, CATEGORY, FEATURES, MEMORY_OPTIONS, SKU, VARIANTS } from '../../data';

@Component({
  selector: 'app-detail-product-info',
  imports: [],
  templateUrl: './product-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfo {
  readonly productName = input.required<string>();
  readonly activeVariantIndex = input.required<number>();
  readonly activeMemoryIndex = input.required<number>();

  readonly variantSelected = output<number>();
  readonly memorySelected = output<number>();

  protected readonly features = FEATURES;
  protected readonly variants = VARIANTS;
  protected readonly memoryOptions = MEMORY_OPTIONS;
  protected readonly sku = SKU;
  protected readonly brand = BRAND;
  protected readonly category = CATEGORY;
  protected readonly socials = ['T', 'f', 'I', 'Y'];

  protected readonly activeVariant = computed(() => this.variants[this.activeVariantIndex()]);
  protected readonly priceRange = computed(() => {
    const prices = this.variants.map((v) => v.price).sort((a, b) => a - b);
    return { min: prices[0], max: prices[prices.length - 1] };
  });
}
