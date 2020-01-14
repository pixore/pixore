import React from 'react';
import invariant from 'invariant';
import { Artboard, ArtboardActions } from './types';
import { reducer, createActions } from './reducer';
import { useArtboards } from '../Artboards';

const defaultValueState = undefined;

const defaultValueActions = {
  center(_payload) {
    invariant(false, 'Context not implemented');
  },
  changePosition(_payload) {
    invariant(false, 'Context not implemented');
  },
  changeArtboard(_artboard) {
    invariant(false, 'Context not implemented');
  },
  changeLayer(_layer) {
    invariant(false, 'Context not implemented');
  },
  changeFrame(_frame) {
    invariant(false, 'Context not implemented');
  },
  changePrimaryColor(_color) {
    invariant(false, 'Context not implemented');
  },
  changeSecondaryColor(_color) {
    invariant(false, 'Context not implemented');
  },
  changeTool(_tool) {
    invariant(false, 'Context not implemented');
  },
};

const ArtboardStateContext = React.createContext<Artboard>(defaultValueState);
const ArtboardActionsContext = React.createContext<ArtboardActions>(
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
