import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TEAM } from '../../data';

@Component({
  selector: 'app-about-leadership',
  imports: [],
  templateUrl: './leadership.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Leadership {
  protected readonly team = TEAM;
}
