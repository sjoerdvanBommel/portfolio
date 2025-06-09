import { viteConfig } from '@sjoerdvanbommel-packages/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';
import { defineConfig, mergeConfig } from 'vite';

dotenv.config({ path: ['../../.env', '.env'] });

export default mergeConfig(
  viteConfig(3004),
  defineConfig({
    plugins: [svelte()],
  }),
);
