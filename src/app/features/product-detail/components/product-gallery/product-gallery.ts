import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { GALLERY } from '../../data';

@Component({
  selector: 'app-detail-product-gallery',
  imports: [],
  templateUrl: './product-gallery.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGallery {
  readonly productName = input.required<string>();
  readonly product = input<any>();

  protected readonly gallery = computed(() => this.product()?.gallery ?? GALLERY);
  protected readonly activeImageIndex = signal(0);
  protected readonly activeImage = computed(() => this.gallery()[this.activeImageIndex()]);
}
