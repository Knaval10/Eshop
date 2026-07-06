import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HomeProductCard } from '../home-product-card/home-product-card';
import { LAPTOPS, LAPTOP_CATEGORIES } from '../../data';

@Component({
  selector: 'app-home-laptops-section',
  imports: [HomeProductCard],
  templateUrl: './laptops-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaptopsSection {
  private readonly router = inject(Router);
  protected readonly searchQuery = signal('');

  protected readonly laptops = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return LAPTOPS;
    }
    return LAPTOPS.filter((p) => p.name.toLowerCase().includes(query));
  });

  protected readonly categories = LAPTOP_CATEGORIES;

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const urlTree = this.router.parseUrl(this.router.url);
        const search = urlTree.queryParams['search'] || '';
        this.searchQuery.set(search);
      });

    const urlTree = this.router.parseUrl(this.router.url);
    const search = urlTree.queryParams['search'] || '';
    this.searchQuery.set(search);
  }
}

