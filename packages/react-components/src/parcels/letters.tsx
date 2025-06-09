import React from 'react';
import ReactDOM from 'react-dom/client';
import type { AppProps } from 'single-spa';
import singleSpaReact from 'single-spa-react';
import { Letters } from '../components/index';

type LettersProps = {
  letters: string[];
};

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient: ReactDOM,
  rootComponent: (props: AppProps & LettersProps) => Letters({ letters: props.letters }),
  errorBoundary(err) {
    return <div>Error: {err.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
