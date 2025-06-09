import { rootExternalDependencies, viteConfig } from '@sjoerdvanbommel-packages/config';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv, mergeConfig } from 'vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

loadEnv(process.env.NODE_ENV!, process.cwd(), '');

export default mergeConfig(
  viteConfig(3000, { isRoot: true }),
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
