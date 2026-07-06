import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    server: {
      deps: {
        inline: ['maplibre-gl', '@maplibre/ngx-maplibre-gl']
      }
    }
  },
  resolve: {
    alias: {
      'maplibre-gl': path.resolve(__dirname, 'src/app/features/map/maplibre-gl-mock.ts'),
      '@maplibre/ngx-maplibre-gl': path.resolve(__dirname, 'src/app/features/map/ngx-maplibre-gl-mock.ts')
    }
  }
});
