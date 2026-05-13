import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STATS } from '../../data';

@Component({
  selector: 'app-about-stats-strip',
  imports: [],
  templateUrl: './stats-strip.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsStrip {
  protected readonly stats = STATS;
}
