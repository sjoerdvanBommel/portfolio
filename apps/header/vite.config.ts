import dotenv from 'dotenv';
import { viteConfigMife } from '@sjoerdvanbommel-packages/config';
import { mergeConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

dotenv.config({ path: ['../../.env', '.env'] });

export default mergeConfig(
  viteConfigMife(3001, { isReact: true }),
  defineConfig({
    plugins: [react()],
  }),
);
