import singleSpaVue from 'single-spa-vue';
import { createApp, h } from 'vue';
import App from './App.vue';

let mountParcel: () => void | undefined;

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    el: '#home-app',
    render() {
      return h(App, {
        mountParcel,
      });
    },
  },
});

export const bootstrap = (props: { mountParcel: () => void }) => {
  mountParcel = props.mountParcel;
  return vueLifecycles.bootstrap(props);
};
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
