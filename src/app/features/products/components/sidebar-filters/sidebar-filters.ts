import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BRAND_FILTERS,
  CATEGORY_TREE,
  COLORS,
  CONDITIONS,
  MEMORY_OPTIONS,
  RATING_FILTERS,
  SCREEN_SIZES,
} from '../../data';

@Component({
  selector: 'app-products-sidebar-filters',
  imports: [FormsModule],
  templateUrl: './sidebar-filters.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFilters {
  protected readonly categoryTree = CATEGORY_TREE;
  protected readonly brandFilters = BRAND_FILTERS;
  protected readonly ratingFilters = RATING_FILTERS;
  protected readonly screenSizes = SCREEN_SIZES;
  protected readonly colors = COLORS;
  protected readonly memoryOptions = MEMORY_OPTIONS;
  protected readonly conditions = CONDITIONS;

  protected readonly minPrice = signal(0);
  protected readonly maxPrice = signal(2000);
}
