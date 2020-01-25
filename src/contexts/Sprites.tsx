import React from 'react';
import { interpret } from 'xstate';
import {
  spritesMachine,
  createSpritesActions,
  defaultContext,
} from '../state/sprites';
import { useStateContext } from '../hooks/useStateContext';
import { useAppState } from './App';

const defaultActions = createSpritesActions(interpret(spritesMachine));

const SpritesContext = React.createContext(defaultContext);
const SpritesActionsContext = React.createContext(defaultActions);

const useSpritesActions = () => React.useContext(SpritesActionsContext);
const useSprites = () => React.useContext(SpritesContext);
const useSpriteService = () => {
  const { sprites, currentSprite } = useSprites();
  return sprites[currentSprite].ref;
};

const useCurrentSprite = () => useSpriteService().state.context;

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { sprites: service } = useAppState();
  const { children } = props;
  const state = useStateContext(service);

  const actions = React.useMemo(() => createSpritesActions(service), [service]);

  return (
    <SpritesActionsContext.Provider value={actions}>
      <SpritesContext.Provider value={state}>
        {children}
      </SpritesContext.Provider>
    </SpritesActionsContext.Provider>
  );
};

export {
  Provider,
  useSpritesActions,
  useSprites,
  useCurrentSprite,
  useSpriteService,
};
