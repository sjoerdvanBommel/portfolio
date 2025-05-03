import { singleSpaSvelte } from '@wjfe/single-spa-svelte';
import App from './App.svelte';

export const { bootstrap, mount, unmount, update } = singleSpaSvelte(App);
