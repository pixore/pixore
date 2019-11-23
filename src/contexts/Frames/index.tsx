import React from 'react';
import invariant from 'invariant';
import { FramesState, FramesActions } from './types';
import { reducer, createActions } from './reducer';

const defaultValueState = {};

const defaultValueActions = {
  addFrame(_frame) {
    invariant(false, 'Context not implemented');
  },
};

const FramesContext = React.createContext<FramesState>(defaultValueState);
const FramesActionsContext = React.createContext<FramesActions>(
  defaultValueActions,
);

const useFramesActions = () => React.useContext(FramesActionsContext);
const useFrames = () => React.useContext(FramesContext);
const useFrame = (id: string) => {
  const layers = useFrames();
  return layers[id];
};

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, defaultValueState);
  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);
  const { children } = props;

  return (
    <FramesActionsContext.Provider value={actions}>
      <FramesContext.Provider value={state}>{children}</FramesContext.Provider>
    </FramesActionsContext.Provider>
  );
};

export * from './types';
export { Provider, useFrames, useFramesActions, useFrame };
