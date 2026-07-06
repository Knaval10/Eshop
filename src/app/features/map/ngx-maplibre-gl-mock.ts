import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mgl-map',
  template: '<ng-content></ng-content>',
  standalone: true
})
export class MapComponent {
  @Input() mapStyle: any;
  @Input() attributionControl: any;
  @Input() maplibreLogo: any;
  @Input() zoom: any;
  @Input() center: any;
  @Output() mapLoad = new EventEmitter<any>();
}
