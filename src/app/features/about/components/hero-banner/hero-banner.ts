import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-hero-banner',
  imports: [],
  templateUrl: './hero-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroBanner {}
