import { ChangeDetectionStrategy, Component } from '@angular/core';
import { POPULAR_CATEGORIES } from '../../data';

@Component({
  selector: 'app-products-popular-categories',
  imports: [],
  templateUrl: './popular-categories.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularCategories {
  protected readonly categories = POPULAR_CATEGORIES;
}
