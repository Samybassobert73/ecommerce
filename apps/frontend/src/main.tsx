import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { CART_FEATURE_KEY, cartReducer } from './features/cart/cart.slice';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { USER_FEATURE_KEY, userReducer } from './features/user/user.slice';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: 'http://localhost:3004/graphql',
  cache: new InMemoryCache(),
});

const store = configureStore({
  reducer: { [USER_FEATURE_KEY]: userReducer, [CART_FEATURE_KEY]: cartReducer },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
  // Optional Redux store enhancers
  // enhancers: [],
});

root.render(
  <Provider store={store}>
    <QueryClientProvider client={new QueryClient()}>
      <ApolloProvider client={client}>
        <StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StrictMode>
      </ApolloProvider>
    </QueryClientProvider>
  </Provider>
);
