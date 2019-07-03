import React from 'react';
import invariant from 'invariant';
import { reducer, createActions } from './reducer';
import { ArtboardsState, ArtboardsActions } from './types';

const defaultState = {};
const defaultActions = {
  addArtboard(artboard) {
    invariant(false, 'Context not implemented');
  },
};
const ArtboardsContext = React.createContext<ArtboardsState>(defaultState);
const ArtboardsActionsContext = React.createContext<ArtboardsActions>(
  defaultActions,
);

const useArtboardsActions = () => React.useContext(ArtboardsActionsContext);
const useArtboards = () => React.useContext(ArtboardsContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const [artboards, dispatch] = React.useReducer(reducer, defaultState);
  const { children } = props;
  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);

  return (
    <ArtboardsActionsContext.Provider value={actions}>
      <ArtboardsContext.Provider value={artboards}>
        {children}
      </ArtboardsContext.Provider>
    </ArtboardsActionsContext.Provider>
  );
};

export { Provider, useArtboards, useArtboardsActions };
