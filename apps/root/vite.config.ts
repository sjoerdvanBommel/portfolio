import { rootExternalDependencies, viteConfig } from '@sjoerdvanbommel-packages/config';
import { defineConfig, loadEnv, mergeConfig } from 'vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

loadEnv(process.env.NODE_ENV!, process.cwd(), '');

export default mergeConfig(
  viteConfig(3000, { isRoot: true }),
  defineConfig({
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
