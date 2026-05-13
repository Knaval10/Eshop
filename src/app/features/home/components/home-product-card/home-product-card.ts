import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { HomeProduct } from '../../models';

@Component({
  selector: 'app-home-product-card',
  templateUrl: './home-product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeProductCard {
  readonly product = input.required<HomeProduct>();
}
