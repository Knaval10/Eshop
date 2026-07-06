import { vi } from 'vitest';

vi.mock('maplibre-gl', () => {
  class MockMap {
    on = () => {};
    remove = () => {};
    addControl = () => {};
    getSource = () => null;
    addSource = () => {};
    addLayer = () => {};
    easeTo = () => {};
  }
  return {
    default: {
      Map: MockMap,
      NavigationControl: class {},
      Popup: class {
        setLngLat() { return this; }
        setHTML() { return this; }
        addTo() { return this; }
      },
      Marker: class {
        setLngLat() { return this; }
        addTo() { return this; }
      },
    },
    Map: MockMap,
    NavigationControl: class {},
    Popup: class {
      setLngLat() { return this; }
      setHTML() { return this; }
      addTo() { return this; }
    },
    Marker: class {
      setLngLat() { return this; }
      addTo() { return this; }
    },
    AttributionControl: class {},
    FullscreenControl: class {},
    GeolocateControl: class {},
    ScaleControl: class {},
    TerrainControl: class {},
    GlobeControl: class {},
  };
});

