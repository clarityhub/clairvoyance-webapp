import { createStore, compose } from 'redux';
import { reducers, middleware } from './reducers';
import { persistStore, createTransform } from 'redux-persist';

import TabRegistry from 'js/tabs/models/TabRegistry';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, /* preloadedState, */ composeEnhancers(middleware));

const tabTransform = createTransform(
  (inboundState, key) => {
    return JSON.stringify(
      inboundState.map((tab) => {
        return {
          ...tab,
          Type: tab.typeName,
        };
      })
    );
  },
  (outboundState, key) => {
    const obj = JSON.parse(outboundState).map((tab) => {
      return {
        ...tab,
        title: TabRegistry.get(tab.Type).title,
        Type: TabRegistry.get(tab.Type).Type,
      };
    });

    return obj;
  },
  {
    whitelist: ['tabs'],
  }
);

const authTransform = createTransform(
  (inboundState, key) => {
    return inboundState;
  },
  (outboundState, key) => {
    // Don't passthrough errors or the state
    const { error, state, ...rest } = outboundState;

    return rest;
  },
  {
    whitelist: ['auth', 'me'],
  }
);

// TODO move this into <App /> so that there is no flicker
const persistor = persistStore(store, {
  transforms: [authTransform, tabTransform],
  // Remember to opt in
  whitelist: [
    'auth',
    'tabs',
    'me',
  ],
});

export { store, persistor };
