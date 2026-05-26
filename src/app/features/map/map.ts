import { Component } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import maplibregl, { NavigationControl, type Map as MapLibreMap, type MapLayerMouseEvent } from 'maplibre-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
})
export class Map {
  protected onMapLoad(map: MapLibreMap): void {
    // add navigation control
    map.addControl(new NavigationControl(), 'top-left');

    // add clustered GeoJSON source by fetching the file so we can be sure data loads
    if (!map.getSource('points')) {
      const tryFetch = async () => {
        const candidates = ['/points.geojson', 'points.geojson'];
        let lastErr: unknown = null;

        for (const url of candidates) {
          try {
            console.log('Fetching GeoJSON from', url);
            const res = await fetch(url);
            console.log('GeoJSON fetch status', res.status, res.headers.get('content-type'));
            if (!res.ok) {
              const body = await res.text();
              throw new Error(`Fetch failed ${res.status}: ${body.slice(0, 200)}`);
            }
            const contentType = res.headers.get('content-type') || '';
            if (!contentType.includes('json') && !contentType.includes('geojson')) {
              const text = await res.text();
              // probably an HTML page (index.html) was returned
              throw new Error(`Unexpected content-type ${contentType}: ${text.slice(0, 200)}`);
            }
            const geojson = await res.json();

            map.addSource('points', {
              type: 'geojson',
              data: geojson,
              cluster: true,
              clusterMaxZoom: 14,
              clusterRadius: 50,
            });

            console.log('Added points source', map.getSource('points'));

            // cluster circles
            map.addLayer({
              id: 'clusters',
              type: 'circle',
              source: 'points',
              filter: ['has', 'point_count'],
              paint: {
                'circle-color': [
                  'step',
                  ['get', 'point_count'],
                  '#51bbd6',
                  10,
                  '#f1f075',
                  30,
                  '#f28cb1',
                ],
                'circle-radius': [
                  'step',
                  ['get', 'point_count'],
                  15,
                  10,
                  20,
                  30,
                  25,
                ],
              },
            });

            // cluster count labels
            map.addLayer({
              id: 'cluster-count',
              type: 'symbol',
              source: 'points',
              filter: ['has', 'point_count'],
              layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                'text-size': 12,
              },
              paint: {
                'text-color': '#000',
              },
            });

            // unclustered points
            map.addLayer({
              id: 'unclustered-point',
              type: 'circle',
              source: 'points',
              filter: ['!', ['has', 'point_count']],
              paint: {
                'circle-color': '#11b4da',
                'circle-radius': 8,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff',
              },
            });

            // click to zoom into cluster
            map.on('click', 'clusters', (e: MapLayerMouseEvent) => {
              const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] }) as unknown as Array<{ properties?: Record<string, unknown>; geometry: { coordinates: [number, number] } }>;
              if (!features || features.length === 0) return;
              const clusterId = features[0].properties && (features[0].properties['cluster_id'] as number | undefined);
              if (clusterId == null) return;
              const source = map.getSource('points') as unknown as { getClusterExpansionZoom?: (id: number, cb: (err: unknown, zoom: number) => void) => void } | undefined;
              if (!source || typeof source.getClusterExpansionZoom !== 'function') return;
              source.getClusterExpansionZoom!(clusterId, (err: unknown, zoom: number) => {
                if (err) return console.error(err);
                const coords = features[0].geometry.coordinates;
                map.easeTo({ center: coords, zoom });
              });
            });

            // show popup for individual points
            map.on('click', 'unclustered-point', (e: MapLayerMouseEvent) => {
              const f = (e.features && e.features[0]) as { geometry: { coordinates: [number, number] }; properties?: Record<string, unknown> } | undefined;
              if (!f) return;
              const coords = f.geometry.coordinates.slice() as [number, number];
              const id = f.properties && (f.properties['id'] as string | number | undefined);
              console.log('Point clicked', { id, coords });
              new maplibregl.Popup()
                .setLngLat(coords)
                .setHTML(`<strong>Point ID: ${id}</strong><br/>Coordinates: ${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`)
                .addTo(map);
            });

            return;
          } catch (err) {
            console.warn('GeoJSON fetch attempt failed for', url, err);
            lastErr = err;
          }
        }

        console.error('All GeoJSON fetch attempts failed', lastErr);
      };

      void tryFetch();
    }
  }
}