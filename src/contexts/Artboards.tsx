import React from 'react';
import { interpret } from 'xstate';
import { defaultContext } from '../state/artboards';
import { useStateContext } from '../hooks/useStateContext';
import { useAppState, useActions } from './App';
import { AppActions, createAppActions } from '../state/actions';
import { appMachine } from '../state/app';

const createArtboardsActions = ({ createArtboard }: AppActions) => ({
  createArtboard,
});

const defaultActions = createArtboardsActions(
  createAppActions(interpret(appMachine)),
);

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
  const appActions = useActions();
  const { children } = props;
  const actions = React.useMemo(() => createArtboardsActions(appActions), [
    appActions,
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
