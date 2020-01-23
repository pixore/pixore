import React from 'react';
import { interpret } from 'xstate';
import invariant from 'invariant';
import {
  spritesMachine,
  createSpritesActions,
  SpritesActions,
  SpritesContext as SpritesContextMachine,
} from '../state/sprites';
import { useStateContext } from '../hooks/useStateContext';

const defaultState = {
  sprites: {},
  spriteList: [],
  currentSprite: '1',
};

const defaultActions = {
  createSprite(_sprite) {
    invariant(false, 'Context not implemented');
  },
};

const SpritesContext = React.createContext<SpritesContextMachine>(defaultState);
const SpritesActionsContext = React.createContext<SpritesActions>(
  defaultActions,
);

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
  const [service] = React.useState(() => interpret(spritesMachine).start());
  const state = useStateContext(service);

  const { children } = props;
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
