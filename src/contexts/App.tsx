import React from 'react';
import trap from 'mousetrap';
import { interpret } from 'xstate';
import { defaultContext, appMachine } from '../state/app';
import { useStateContext } from '../hooks/useStateContext';
import { createAppActions } from '../state/actions';
import { User } from '../types';

const fetchUser = async (): Promise<User | void> => {
  const res = await fetch('/api/me');

  return res.ok ? await res.json() : undefined;
};

const AppServiceContext = React.createContext(interpret(appMachine));
const AppStateContext = React.createContext(defaultContext);
const AppActionsContext = React.createContext(
  createAppActions(interpret(appMachine)),
);
const useAppState = () => React.useContext(AppStateContext);
const useAppActions = () => React.useContext(AppActionsContext);
const useAppService = () => React.useContext(AppServiceContext);

const useUser = () => React.useContext(AppStateContext).user;
const useFetchUser = () => {
  const { user } = useAppState();
  const { updateUser } = useAppActions();
  const [isLoading, seIsLoading] = React.useState(!user);

  React.useEffect(() => {
    if (user) {
      return;
    }

    let isMounted = true;

    fetchUser().then((currentUser) => {
      if (!isMounted) {
        return;
      }

      if (currentUser) {
        updateUser(currentUser);
      }

      seIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [user, updateUser]);

  return {
    user,
    isLoading,
  };
};

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

export {
  Provider,
  useAppState,
  useAppActions,
  useAppService,
  useUser,
  useFetchUser,
};
