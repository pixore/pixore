import React from 'react';
import { interpret } from 'xstate';
import { defaultContext } from '../state/sprites';
import { useStateContext } from '../hooks/useStateContext';
import { useAppState, useAppActions } from './App';
import { AppActions, createAppActions } from '../state/actions';
import { appMachine } from '../state/app';

const createSpritesActions = ({ createSprite }: AppActions) => ({
  createSprite,
});

const defaultActions = createSpritesActions(
  createAppActions(interpret(appMachine)),
);

const SpritesContext = React.createContext(defaultContext);
const SpritesActionsContext = React.createContext(defaultActions);

const useSpritesActions = () => React.useContext(SpritesActionsContext);
const useSprites = () => React.useContext(SpritesContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { sprites: service } = useAppState();
  const { children } = props;
  const appActions = useAppActions();
  const state = useStateContext(service);

  const actions = React.useMemo(() => createSpritesActions(appActions), [
    appActions,
  ]);

  return (
    <SpritesActionsContext.Provider value={actions}>
      <SpritesContext.Provider value={state}>
        {children}
      </SpritesContext.Provider>
    </SpritesActionsContext.Provider>
  );
};

export { Provider, useSpritesActions, useSprites };
