import React from 'react';
import invariant from 'invariant';
import { Artboard, ArtboardsActions, Artboards } from './types';
import { reducer, createActions } from './reducer';

const defaultValueState = undefined;

const defaultValueActions = {
  center(payload) {
    invariant(false, 'Context not implemented');
  },
  changePosition(payload) {
    invariant(false, 'Context not implemented');
  },
  changeArtboard(id: string) {
    invariant(false, 'Context not implemented');
  },
};

const ArtboardStateContext = React.createContext<Artboard>(defaultValueState);
const ArtboardActionsContext = React.createContext<ArtboardsActions>(
  defaultValueActions,
);

const useArtboardsActions = () => React.useContext(ArtboardActionsContext);
const useArtboard = (id: string) => {
  const artboards = React.useContext(ArtboardStateContext);
  return artboards[id];
};

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const artboardsRef = React.useRef<Artboards>({});
  const [state, dispatch] = React.useReducer(reducer, defaultValueState);
  const actions = React.useMemo(() => createActions(dispatch, artboardsRef), [
    dispatch,
  ]);
  const { children } = props;
  return (
    <ArtboardActionsContext.Provider value={actions}>
      <ArtboardStateContext.Provider value={state}>
        {children}
      </ArtboardStateContext.Provider>
    </ArtboardActionsContext.Provider>
  );
};

export * from './types';
export { Provider, useArtboard, useArtboardsActions };
