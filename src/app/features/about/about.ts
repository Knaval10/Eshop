import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { HeroBanner } from './components/hero-banner/hero-banner';
import { StatsStrip } from './components/stats-strip/stats-strip';
import { CompanyStory } from './components/company-story/company-story';
import { FeatureCards } from './components/feature-cards/feature-cards';
import { MissionVision } from './components/mission-vision/mission-vision';
import { Timeline } from './components/timeline/timeline';
import { Leadership } from './components/leadership/leadership';
import { PromoFooter } from './components/promo-footer/promo-footer';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-about',
  imports: [
    Breadcrumb,
    HeroBanner,
    StatsStrip,
    CompanyStory,
    FeatureCards,
    MissionVision,
    Timeline,
    Leadership,
    PromoFooter,
  ],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About implements OnInit {
  private readonly productService = inject(ProductService);

  protected readonly stats = signal<any[]>([]);
  protected readonly team = signal<any[]>([]);

  ngOnInit(): void {
    this.productService.getAboutData().subscribe({
      next: (data) => {
        if (data) {
          if (data.stats) {
            this.stats.set([
              { value: data.stats.happyCustomers || '10K+', label: 'Happy Customers' },
              { value: data.stats.productsSold || '1M+', label: 'Products Sold' },
              { value: data.stats.countriesServed || '50+', label: 'Countries Served' },
            ]);
          }
          if (data.team && data.team.length > 0) {
            this.team.set(data.team.map((t: any) => ({
              name: t.name,
              role: t.role,
              image: t.imageUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop',
            })));
          }
        }
      },
    });
  }
}
