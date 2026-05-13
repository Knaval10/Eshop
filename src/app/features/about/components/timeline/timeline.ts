import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TIMELINE_LEFT, TIMELINE_RIGHT } from '../../data';

@Component({
  selector: 'app-about-timeline',
  imports: [],
  templateUrl: './timeline.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Timeline {
  protected readonly timelineLeft = TIMELINE_LEFT;
  protected readonly timelineRight = TIMELINE_RIGHT;
}
