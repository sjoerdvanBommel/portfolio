import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';
import singleSpaReact from 'single-spa-react';

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: App,
  errorBoundary() {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>;
  },
});
