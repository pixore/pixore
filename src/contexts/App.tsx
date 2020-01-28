import React from 'react';
import trap from 'mousetrap';
import { interpret } from 'xstate';
import { defaultContext, appMachine } from '../state/app';
import { useStateContext } from '../hooks/useStateContext';
import { createAppActions } from '../state/actions';

const AppServiceContext = React.createContext(interpret(appMachine));
const AppStateContext = React.createContext(defaultContext);
const AppActionsContext = React.createContext(
  createAppActions(interpret(appMachine)),
);
const useAppState = () => React.useContext(AppStateContext);
const useActions = () => React.useContext(AppActionsContext);
const useAppService = () => React.useContext(AppServiceContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { children } = props;
  const [service] = React.useState(() => interpret(appMachine).start());
  const state = useStateContext(service);
  const actions = React.useMemo(() => createAppActions(service), [service]);

  React.useEffect(() => {
    trap.bind('command+z', actions.undo);
    trap.bind('command+shift+z', actions.redu);

    return () => trap.reset();
  });

  return (
    <AppServiceContext.Provider value={service}>
      <AppStateContext.Provider value={state}>
        <AppActionsContext.Provider value={actions}>
          {children}
        </AppActionsContext.Provider>
      </AppStateContext.Provider>
    </AppServiceContext.Provider>
  );
};

export { Provider, useAppState, useActions, useAppService };
