import { registerApplication, start } from 'single-spa';

[
  { name: 'header', activeWhen: () => true },
  {
    name: 'home',
    activeWhen: (location: Location) => location.pathname === '/',
  },
  { name: 'about', activeWhen: '/about' },
  { name: 'blog', activeWhen: '/blog' },
].forEach((module) => {
  registerApplication({
    name: module.name,
    app: ({ mountParcel }) =>
      import(/* @vite-ignore */ `@sjoerdvanbommel/${module.name}`).then((m) => {
        return {
          bootstrap: m.bootstrap,
          mount: (props) => m.mount({ ...props, name: module.name, mountParcel }),
          unmount: m.unmount,
        };
      }),
    activeWhen: module.activeWhen,
    customProps: {
      domElementGetter: () => document.getElementById(`${module.name}-app`),
    },
  });
});

start();
