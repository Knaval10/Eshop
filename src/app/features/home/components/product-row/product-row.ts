import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HomeProductCard } from '../home-product-card/home-product-card';
import type { HomeProduct } from '../../models';

@Component({
  selector: 'app-home-product-row',
  imports: [HomeProductCard],
  templateUrl: './product-row.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRow {
  readonly title = input.required<string>();
  readonly products = input.required<HomeProduct[]>();
}
