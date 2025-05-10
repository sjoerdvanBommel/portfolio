import { defineConfig } from 'vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import { mergeConfig } from 'vite';
import { rootExternalDependencies, viteConfigMife } from '@sjoerdvanbommel-packages/config';

export default mergeConfig(
  viteConfigMife(3000, { isRoot: true }),
  defineConfig({
    publicDir: '../../public',

    plugins: [
      vitePluginSingleSpa({
        type: 'root',
        importMaps: {
          dev: 'src/importMap.dev.json',
          build: 'src/importMap.json',
        },
      }),
    ],

    build: {
      emptyOutDir: true,
      rollupOptions: {
        external: rootExternalDependencies,
      },
    },
  }),
);
