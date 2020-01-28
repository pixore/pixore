import React from 'react';
import curry from 'lodash.curry';
import { interpret } from 'xstate';
import { useArtboardService } from './Artboards';
import { useStateContext } from '../hooks/useStateContext';
import { defaultContext } from '../state/artboard';
import { AppActions, createAppActions } from '../state/actions';
import { appMachine } from '../state/app';
import { useActions } from './App';

const createArtboardActions = (actions: AppActions, artboardId: string) => ({
  changeLayer: curry(actions.selectLayer)(artboardId),
  changeFrame: curry(actions.selectFrame)(artboardId),
  changePrimaryColor: curry(actions.changePrimaryColor)(artboardId),
  changeSecondaryColor: curry(actions.changeSecondaryColor)(artboardId),
  changeTool: curry(actions.changeTool)(artboardId),
});

export type ArtboardActions = ReturnType<typeof createArtboardActions>;

const defaultValueActions = createArtboardActions(
  createAppActions(interpret(appMachine)),
  'no',
);
const ArtboardStateContext = React.createContext(defaultContext);
const ArtboardActionsContext = React.createContext(defaultValueActions);

const useArtboardActions = () => React.useContext(ArtboardActionsContext);
const useArtboard = () => React.useContext(ArtboardStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const service = useArtboardService();
  const appActions = useActions();
  const state = useStateContext(service);
  const { id } = state;
  const actions = React.useMemo(() => createArtboardActions(appActions, id), [
    appActions,
    id,
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

export { Provider, useArtboard, useArtboardActions };
