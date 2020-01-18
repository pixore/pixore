import React from 'react';
import invariant from 'invariant';
import { LayersState, LayersActions } from './types';
import { reducer, createActions } from './reducer';

const defaultValueState = {};

const defaultValueActions = {
  addLayer(_layer) {
    invariant(false, 'Context not implemented');
  },
  removeLayer(_id) {
    invariant(false, 'Context not implemented');
  },
};

const LayersContext = React.createContext<LayersState>(defaultValueState);
const LayersActionsContext = React.createContext<LayersActions>(
  defaultValueActions,
);

const useLayersActions = () => React.useContext(LayersActionsContext);
const useLayers = () => React.useContext(LayersContext);
const useLayer = (id: string) => {
  const layers = useLayers();
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
    <LayersActionsContext.Provider value={actions}>
      <LayersContext.Provider value={state}>{children}</LayersContext.Provider>
    </LayersActionsContext.Provider>
  );
};

export * from './types';
export { Provider, useLayers, useLayersActions, useLayer };
