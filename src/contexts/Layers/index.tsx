import React from 'react';
import invariant from 'invariant';
import { LayersState, LayersActions } from './types';
import { reducer, createActions } from './reducer';

const defaultValueState = {};

const defaultValueActions = {
  addLayer(layer) {
    invariant(false, 'Context not implemented');
  },
};

const SpriteStateContext = React.createContext<LayersState>(defaultValueState);
const SpriteActionsContext = React.createContext<LayersActions>(
  defaultValueActions,
);

const useLayersActions = () => React.useContext(SpriteActionsContext);
const useLayers = () => React.useContext(SpriteStateContext);
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
    <SpriteActionsContext.Provider value={actions}>
      <SpriteStateContext.Provider value={state}>
        {children}
      </SpriteStateContext.Provider>
    </SpriteActionsContext.Provider>
  );
};

export * from './types';
export { Provider, useLayers, useLayersActions, useLayer };
