import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BRANDS } from '../../data';

@Component({
  selector: 'app-home-brand-bar',
  templateUrl: './brand-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandBar {
  protected readonly brands = BRANDS;
}
