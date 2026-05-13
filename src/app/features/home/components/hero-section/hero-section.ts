import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { HERO_SLIDES, SIDEBAR_CATEGORIES } from '../../data';

@Component({
  selector: 'app-home-hero',
  templateUrl: './hero-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  protected readonly slides = HERO_SLIDES;
  protected readonly sidebarCategories = SIDEBAR_CATEGORIES;
  protected readonly currentSlide = signal(0);
  protected readonly currentHeroSlide = computed(() => this.slides[this.currentSlide()]);

  next() {
    this.currentSlide.update((i) => (i + 1) % this.slides.length);
  }
  prev() {
    this.currentSlide.update((i) => (i - 1 + this.slides.length) % this.slides.length);
  }
  goTo(i: number) {
    this.currentSlide.set(i);
  }
}
