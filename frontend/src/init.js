import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as StoreProvider } from 'react-redux';
import React from 'react';
import setupProfanityFilter from './services/profanityFilter.js';
import ru from './locales/index.js';
import App from './App.js';
import store from './store/index.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
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

const initSocket = (socket) => {
  window.socket = socket;

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });
};

const init = async (socket) => {
  await i18n
    .use(initReactI18next)
    .init({
      resources: ru,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      plurals: {
        ru: {
          numbers: [0, 1, 2, 5],
          plurals: (n) => {
            const lastTwo = n % 100;
            const last = n % 10;
            if (lastTwo >= 11 && lastTwo <= 19) return 'many';
            if (last === 1) return 'one';
            if (last >= 2 && last <= 4) return 'few';
            return 'many';
          },
        },
      },
    });

  initSocket(socket);
  setupProfanityFilter();

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <App socket={socket} />
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};

export { init, rollbarConfig };
