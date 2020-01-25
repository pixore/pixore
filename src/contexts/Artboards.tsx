import React from 'react';
import { interpret } from 'xstate';
import {
  defaultContext,
  artboardsMachine,
  createArtboardsActions,
} from '../state/artboards';
import { useStateContext } from '../hooks/useStateContext';
import { useAppState } from './App';

const defaultActions = createArtboardsActions(interpret(artboardsMachine));
const ArtboardsContext = React.createContext(defaultContext);
const ArtboardsActionsContext = React.createContext(defaultActions);

const useArtboardsActions = () => React.useContext(ArtboardsActionsContext);
const useArtboards = () => React.useContext(ArtboardsContext);
const useArtboardService = () => {
  const { artboards, currentArtboard } = useArtboards();
  return artboards[currentArtboard].ref;
};
const useCurrentArtboard = () => useArtboardService().state.context;

const Provider: React.FC = (props) => {
  const { artboards: service } = useAppState();
  const { children } = props;
  const actions = React.useMemo(() => createArtboardsActions(service), [
    service,
  ]);

  const state = useStateContext(service);

  return (
    <ArtboardsActionsContext.Provider value={actions}>
      <ArtboardsContext.Provider value={state}>
        {children}
      </ArtboardsContext.Provider>
    </ArtboardsActionsContext.Provider>
  );
};

export {
  Provider,
  useArtboards,
  useArtboardsActions,
  useCurrentArtboard,
  useArtboardService,
};
