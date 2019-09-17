import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router/immutable';
// import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

import configureStore, { history } from './store/index';

// Import CSS reset and Global Styles
import './global-styles';

const { persistor, store } = configureStore();

const ReactApp = () => (
  <div>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </div>
);
export default ReactApp;
