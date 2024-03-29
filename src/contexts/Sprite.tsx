import React from 'react';
import { interpret } from 'xstate';
import curry from 'lodash.curry';
import { defaultContext } from '../state/sprite';
import { useSprites } from './Sprites';
import { appMachine } from '../state/app';
import { AppActions, createAppActions } from '../state/actions';
import { useStateContext } from '../hooks/useStateContext';
import { useAppActions } from './App';
import { useArtboard } from './Artboard';

const createSpriteActions = (actions: AppActions, spriteId: string) => ({
  changeName: curry(actions.renameSprite)(spriteId),
  createLayer: actions.createLayer(spriteId),
  createFrame: () => actions.createFrame(spriteId),
  deleteLayer: actions.deleteLayer(spriteId),
  deleteFrame: actions.deleteFrame(spriteId),
  paintSprite: actions.paintSprite(spriteId),
  renameSprite: actions.renameSprite(spriteId),
  saveSprite: () => actions.saveSprite(spriteId),
});

export type SpriteActions = ReturnType<typeof createSpriteActions>;

const defaultValueActions = createSpriteActions(
  createAppActions(interpret(appMachine)),
  'no',
);

const SpriteStateContext = React.createContext(defaultContext);
const SpriteActionsContext = React.createContext(defaultValueActions);

const useSpriteActions = () => React.useContext(SpriteActionsContext);
const useSprite = () => React.useContext(SpriteStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { children } = props;
  const { spriteId } = useArtboard();
  const { sprites } = useSprites();

  const appActions = useAppActions();
  const service = sprites[spriteId].ref;
  const state = useStateContext(service);

  const actions = React.useMemo(
    () => createSpriteActions(appActions, spriteId),
    [appActions, spriteId],
  );

  return (
    <SpriteActionsContext.Provider value={actions}>
      <SpriteStateContext.Provider value={state}>
        {children}
      </SpriteStateContext.Provider>
    </SpriteActionsContext.Provider>
  );
};

export { Provider, useSprite, useSpriteActions };
