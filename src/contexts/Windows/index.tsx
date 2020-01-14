import React from 'react';
import invariant from 'invariant';
import { WindowsActions, WindowsState } from './types';
import { reducer, createActions } from './reducer';

const defaultState = {};
const defaultActions = {
  openWindow() {
    invariant(false, 'Context not implemented');
    return 'id';
  },
  closeWindow() {
    invariant(false, 'Context not implemented');
  },
};

const WindowsStateContext = React.createContext<WindowsState>(defaultState);
const WindowsActionsContext = React.createContext<WindowsActions>(
  defaultActions,
);

const useWindowsActions = () => React.useContext(WindowsActionsContext);
const useWindowsState = () => React.useContext(WindowsStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const [windows, dispatch] = React.useReducer(reducer, defaultState);
  const { children } = props;
  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);

  return (
    <WindowsActionsContext.Provider value={actions}>
      <WindowsStateContext.Provider value={windows}>
        {children}
      </WindowsStateContext.Provider>
    </WindowsActionsContext.Provider>
  );
};

export { Provider, useWindowsActions, useWindowsState };
