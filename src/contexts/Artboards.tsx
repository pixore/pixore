import React from 'react';
import { interpret } from 'xstate';
import {
  defaultContext,
  artboardsMachine,
  createArtboardsActions,
} from '../state/artboards';
import { useStateContext } from '../hooks/useStateContext';

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

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { children } = props;
  const [service] = React.useState(() => interpret(artboardsMachine).start());
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
