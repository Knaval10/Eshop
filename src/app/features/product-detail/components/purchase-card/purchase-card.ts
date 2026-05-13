import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ProductVariant } from '../../models';

@Component({
  selector: 'app-detail-purchase-card',
  imports: [],
  templateUrl: './purchase-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseCard {
  readonly activeVariant = input.required<ProductVariant>();

  protected readonly quantity = signal(1);
  increment() {
    this.quantity.update((q) => q + 1);
  }
  decrement() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }
}
