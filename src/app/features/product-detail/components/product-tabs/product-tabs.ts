import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { REVIEWS, TABS } from '../../data';

@Component({
  selector: 'app-detail-product-tabs',
  imports: [],
  templateUrl: './product-tabs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTabs {
  protected readonly tabs = TABS;
  protected readonly reviews = REVIEWS;
  protected readonly activeTab = signal(0);
}
