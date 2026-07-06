import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-featured-product',
  imports: [RouterLink],
  templateUrl: './featured-product.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProduct {
  readonly product = input<any>(null);
}
