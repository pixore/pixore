import React from 'react';
import invariant from 'invariant';
import { Artboard, ArtboardsActions } from './types';
import { reducer, createActions } from './reducer';
import { useArtboards } from '../Artboards';

const defaultValueState = undefined;

const defaultValueActions = {
  center(payload) {
    invariant(false, 'Context not implemented');
  },
  changePosition(payload) {
    invariant(false, 'Context not implemented');
  },
  changeArtboard(artboard) {
    invariant(false, 'Context not implemented');
  },
};

const ArtboardStateContext = React.createContext<Artboard>(defaultValueState);
const ArtboardActionsContext = React.createContext<ArtboardsActions>(
  defaultValueActions,
);

const useArtboardActions = () => React.useContext(ArtboardActionsContext);
const useArtboard = () => React.useContext(ArtboardStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const artboards = useArtboards();
  const [state, dispatch] = React.useReducer(reducer, defaultValueState);
  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);
  const { changeArtboard } = actions;

  const artboardIds = React.useMemo(() => Object.keys(artboards), [artboards]);
  if (!state && artboardIds.length !== 0) {
    const artboard = artboards[artboardIds[0]];
    changeArtboard(artboard);
  }

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
export { Provider, useArtboard, useArtboardActions };
