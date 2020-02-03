import React from 'react';
import { AppProps } from 'next/app';
import { Provider, createClient } from 'urql';

const client = createClient({
  url: '/api/graphql',
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider value={client}>
      <Component {...pageProps} />;
    </Provider>
  );
};

export default App;
