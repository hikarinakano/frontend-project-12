import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ErrorBoundary } from '@rollbar/react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './locales/index.js';
import setupProfanityFilter from './services/profanityFilter.js';

const rollbarConfig = {
  accessToken: 'f7030b6c09544a6baa9243112f15213e',
  environment: 'testenv',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: true,
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: '1.0.0',
        guess_uncaught_frames: true,
      },
    },
  },
};

setupProfanityFilter();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider config={rollbarConfig}>
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  </Provider>
);
