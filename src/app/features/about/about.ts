import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { HeroBanner } from './components/hero-banner/hero-banner';
import { StatsStrip } from './components/stats-strip/stats-strip';
import { CompanyStory } from './components/company-story/company-story';
import { FeatureCards } from './components/feature-cards/feature-cards';
import { MissionVision } from './components/mission-vision/mission-vision';
import { Timeline } from './components/timeline/timeline';
import { Leadership } from './components/leadership/leadership';
import { PromoFooter } from './components/promo-footer/promo-footer';

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
export class About {}
