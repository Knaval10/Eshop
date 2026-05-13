import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RelatedProduct } from '../../models';

@Component({
  selector: 'app-detail-product-card',
  imports: [],
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  readonly product = input.required<RelatedProduct>();
  readonly compact = input<boolean>(false);
}
