import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TEAM } from '../../data';

@Component({
  selector: 'app-about-leadership',
  imports: [],
  templateUrl: './leadership.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Leadership {
  readonly team = input<any[]>(TEAM);
}
