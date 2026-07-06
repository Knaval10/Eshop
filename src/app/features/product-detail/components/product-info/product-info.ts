import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { BRAND, CATEGORY, FEATURES, MEMORY_OPTIONS, SKU, VARIANTS } from '../../data';
import { ProductVariant } from '../../models';

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
  readonly product = input<any>();

  readonly variantSelected = output<number>();
  readonly memorySelected = output<number>();

  protected readonly features = computed(() => this.product()?.features ?? FEATURES);
  protected readonly variants = computed<ProductVariant[]>(() => this.product()?.variants ?? VARIANTS);
  protected readonly memoryOptions = computed(() => this.product()?.memoryOptions ?? MEMORY_OPTIONS);
  protected readonly sku = computed(() => this.product()?.sku ?? SKU);
  protected readonly brand = computed(() => this.product()?.brand ?? BRAND);
  protected readonly category = computed(() => this.product()?.category ?? CATEGORY);
  protected readonly socials = ['T', 'f', 'I', 'Y'];

  protected readonly activeVariant = computed(() => this.variants()[this.activeVariantIndex()]);
  protected readonly priceRange = computed(() => {
    const prices = this.variants().map((v: ProductVariant) => v.price).sort((a: number, b: number) => a - b);
    return { min: prices[0], max: prices[prices.length - 1] };
  });
}
