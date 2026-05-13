import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeProductCard } from '../home-product-card/home-product-card';
import { LAPTOPS, LAPTOP_CATEGORIES } from '../../data';

@Component({
  selector: 'app-home-laptops-section',
  imports: [HomeProductCard],
  templateUrl: './laptops-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaptopsSection {
  protected readonly laptops = LAPTOPS;
  protected readonly categories = LAPTOP_CATEGORIES;
}
