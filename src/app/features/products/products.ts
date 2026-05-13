import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { HeroBanners } from './components/hero-banners/hero-banners';
import { PopularCategories } from './components/popular-categories/popular-categories';
import { SidebarFilters } from './components/sidebar-filters/sidebar-filters';
import { BestSellerCarousel } from './components/best-seller-carousel/best-seller-carousel';
import { CatalogGrid } from './components/catalog-grid/catalog-grid';

@Component({
  selector: 'app-products',
  imports: [Breadcrumb, HeroBanners, PopularCategories, SidebarFilters, BestSellerCarousel, CatalogGrid],
  templateUrl: './products.html',
  styleUrl: './products.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products {}
