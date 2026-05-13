import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RECENTLY_VIEWED } from '../../data';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-detail-recently-viewed',
  imports: [ProductCard],
  templateUrl: './recently-viewed.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyViewed {
  protected readonly recentlyViewed = RECENTLY_VIEWED;
}
