import React from 'react';
import { AppProps } from 'next/app';
import * as User from '../contexts/User';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const value = User.useFetchUser();
  console.log('value', value);

  return (
    <User.Provider value={value}>
      <Component {...pageProps} />;
    </User.Provider>
  );
};

export default App;
