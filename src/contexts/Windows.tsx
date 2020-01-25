import React from 'react';
import { interpret } from 'xstate';
import {
  defaultContext,
  createWindowsActions,
  windowsMachine,
} from '../state/windows';
import { useStateContext } from '../hooks/useStateContext';
import { useAppState } from './App';

const defaultActions = createWindowsActions(interpret(windowsMachine));

const WindowsStateContext = React.createContext(defaultContext);
const WindowsActionsContext = React.createContext(defaultActions);

const useWindowsActions = () => React.useContext(WindowsActionsContext);
const useWindowsState = () => React.useContext(WindowsStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { windows: service } = useAppState();
  const { children } = props;
  const actions = React.useMemo(() => createWindowsActions(service), [service]);
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
