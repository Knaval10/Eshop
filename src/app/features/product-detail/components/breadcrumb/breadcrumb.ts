import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-detail-breadcrumb',
  imports: [],
  templateUrl: './breadcrumb.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumb {
  readonly productName = input.required<string>();
}
