import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as StoreProvider } from 'react-redux';
import Rollbar from 'rollbar';
import i18next from 'i18next';
import setupProfanityFilter from './services/profanityFilter.js';
import resources from './locales/index.js';
import App from './App.js';
import store from './store/index.js';
import { channelsApi } from './store/api/channelsApi';
import { messagesApi } from './store/api/messagesApi';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: process.env.REACT_APP_ENV,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: !!process.env.REACT_APP_ROLLBAR_TOKEN,
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

const rollbar = new Rollbar({
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: process.env.NODE_ENV,
});

const initSocketListeners = (socket) => {
  const listenerNewChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        if (!draft.find((ch) => ch.id === payload.id)) {
          draft.push(payload);
        }
      }),
    );
  };

  const listenerRemoveChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const index = draft.findIndex((channel) => channel.id === payload.id);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      }),
    );
  };

  const listenerRenameChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const channel = draft.find((ch) => ch.id === payload.id);
        if (channel) {
          channel.name = payload.name;
        }
      }),
    );
  };

  const listenerNewMessage = (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(payload);
      }),
    );
  };

  socket.on('newChannel', listenerNewChannel);
  socket.on('removeChannel', listenerRemoveChannel);
  socket.on('renameChannel', listenerRenameChannel);
  socket.on('newMessage', listenerNewMessage);

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });
};

const init = async (socket) => {
  try {
    const i18nextInstance = i18next.createInstance();
    await i18nextInstance
      .use(initReactI18next)
      .init({
        resources,
        lng: 'ru',
      });
    initSocketListeners(socket, store);
    setupProfanityFilter();

    const vdom = (
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <StoreProvider store={store}>
            <I18nextProvider i18n={i18nextInstance}>
              <App />
            </I18nextProvider>
          </StoreProvider>
        </ErrorBoundary>
      </RollbarProvider>
    );

    return vdom;
  } catch (error) {
    rollbar.error('Initialization error:', error);
    throw error;
  }
};

export default init;
