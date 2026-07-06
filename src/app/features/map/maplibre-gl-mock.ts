export class Map {
  on() {}
  remove() {}
  addControl() {}
}
export class NavigationControl {}
export class Marker {
  setLngLat() { return this; }
  addTo() { return this; }
}
export class Popup {
  setHTML() { return this; }
}
export class AttributionControl {}
export class FullscreenControl {}
export class GeolocateControl {}
export class ScaleControl {}
export class TerrainControl {}
export class GlobeControl {}

const defaultExport = {
  Map,
  NavigationControl,
  Marker,
  Popup,
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  ScaleControl,
  TerrainControl,
  GlobeControl,
};

export default defaultExport;
