import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

const httpLink = createHttpLink ({
  uri: 'http://localhost:4000/'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache: cache
})



ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <PersistGate persistor={persistor}>
            <App client={client}/>
          </PersistGate>
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

