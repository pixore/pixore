import React from 'react';
import { AppProps } from 'next/app';
import { Provider, createClient } from 'urql';
import * as User from '../contexts/User';

const client = createClient({
  url: '/api/graphql',
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const value = User.useFetchUser();

  return (
    <Provider value={client}>
      <User.Provider value={value}>
        <Component {...pageProps} />;
      </User.Provider>
    </Provider>
  );
};

export default App;
