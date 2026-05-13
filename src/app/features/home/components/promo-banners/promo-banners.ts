import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-promo-banners',
  templateUrl: './promo-banners.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoBanners {}
