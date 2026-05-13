import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { BUNDLE_DEFAULTS } from '../../data';

@Component({
  selector: 'app-detail-frequently-bought',
  imports: [],
  templateUrl: './frequently-bought.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrequentlyBought {
  protected readonly bundleItems = signal(BUNDLE_DEFAULTS);

  protected readonly bundleTotal = computed(() =>
    this.bundleItems().reduce((sum, i) => sum + (i.selected ? i.price : 0), 0),
  );

  toggle(id: number) {
    this.bundleItems.update((items) =>
      items.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)),
    );
  }
}
