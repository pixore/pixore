import React from 'react';
import { interpret } from 'xstate';
import { defaultContext, appMachine } from '../state/app';
import { useStateContext } from '../hooks/useStateContext';

const AppStateContext = React.createContext(defaultContext);
const useAppState = () => React.useContext(AppStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { children } = props;
  const [service] = React.useState(() => interpret(appMachine).start());
  const state = useStateContext(service);

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

export { Provider, useAppState };
