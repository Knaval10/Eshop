import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSection } from './components/hero-section/hero-section';
import { BrandBar } from './components/brand-bar/brand-bar';
import { FeaturedProduct } from './components/featured-product/featured-product';
import { ProductRow } from './components/product-row/product-row';
import { PromoBanners } from './components/promo-banners/promo-banners';
import { LaptopsSection } from './components/laptops-section/laptops-section';
import { NewsletterAppPromo } from './components/newsletter-app-promo/newsletter-app-promo';
import { HEADPHONES, TABLETS } from './data';

@Component({
  selector: 'app-home',
  imports: [
    HeroSection,
    BrandBar,
    FeaturedProduct,
    ProductRow,
    PromoBanners,
    LaptopsSection,
    NewsletterAppPromo,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly headphones = HEADPHONES;
  protected readonly tablets = TABLETS;
}
