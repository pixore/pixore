import React from 'react';
import { interpret } from 'xstate';
import { defaultContext } from '../state/windows';
import { useStateContext } from '../hooks/useStateContext';
import { useAppState, useActions } from './App';
import { AppActions, createAppActions } from '../state/actions';
import { appMachine } from '../state/app';

const createWindowsActions = ({ openWindow, closeWindow }: AppActions) => ({
  openWindow,
  closeWindow,
});

const defaultActions = createWindowsActions(
  createAppActions(interpret(appMachine)),
);

const WindowsStateContext = React.createContext(defaultContext);
const WindowsActionsContext = React.createContext(defaultActions);

const useWindowsActions = () => React.useContext(WindowsActionsContext);
const useWindowsState = () => React.useContext(WindowsStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { windows: service } = useAppState();
  const appActions = useActions();
  const { children } = props;
  const actions = React.useMemo(() => createWindowsActions(appActions), [
    appActions,
  ]);
  const state = useStateContext(service);

  return (
    <WindowsActionsContext.Provider value={actions}>
      <WindowsStateContext.Provider value={state}>
        {children}
      </WindowsStateContext.Provider>
    </WindowsActionsContext.Provider>
  );
};

export { Provider, useWindowsActions, useWindowsState };
