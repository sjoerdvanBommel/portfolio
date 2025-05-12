import { rootExternalDependencies, viteConfigMife } from '@sjoerdvanbommel-packages/config';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, mergeConfig } from 'vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

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
      tailwindcss(),
    ],

    build: {
      emptyOutDir: true,
      rollupOptions: {
        external: rootExternalDependencies,
      },
    },
  }),
);
