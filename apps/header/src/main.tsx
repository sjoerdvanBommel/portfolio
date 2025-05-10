import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('single-spa:main')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
