import { ChangeDetectionStrategy, Component, computed, signal, input } from '@angular/core';
import { HERO_SLIDES, SIDEBAR_CATEGORIES } from '../../data';

@Component({
  selector: 'app-home-hero',
  templateUrl: './hero-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  readonly slides = input<any[]>(HERO_SLIDES);
  protected readonly sidebarCategories = SIDEBAR_CATEGORIES;
  protected readonly currentSlide = signal(0);
  protected readonly currentHeroSlide = computed(() => {
    const list = this.slides() || [];
    if (list.length === 0) {
      return {
        bg: 'from-zinc-900 to-zinc-700',
        badge: '',
        title: '',
        subtitle: '',
        actionText: '',
      };
    }
    return list[this.currentSlide() % list.length];
  });

  next() {
    const len = this.slides().length;
    if (len === 0) return;
    this.currentSlide.update((i) => (i + 1) % len);
  }
  prev() {
    const len = this.slides().length;
    if (len === 0) return;
    this.currentSlide.update((i) => (i - 1 + len) % len);
  }
  goTo(i: number) {
    this.currentSlide.set(i);
  }
}
