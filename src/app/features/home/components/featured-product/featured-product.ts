import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-featured-product',
  templateUrl: './featured-product.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProduct {}
