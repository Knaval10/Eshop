import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FEATURES } from '../../data';

@Component({
  selector: 'app-about-feature-cards',
  imports: [],
  templateUrl: './feature-cards.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCards {
  protected readonly features = FEATURES;
}
