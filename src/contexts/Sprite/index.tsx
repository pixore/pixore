import React from 'react';
import invariant from 'invariant';
import { Sprite, SpriteActions } from './types';
import { reducer, createActions } from './reducer';
import { useSprites } from '../Sprites';

const defaultValueState = undefined;

const defaultValueActions = {
  changeName(name) {
    invariant(false, 'Context not implemented');
  },
  changeSprite(sprite) {
    invariant(false, 'Context not implemented');
  },
};

const SpriteStateContext = React.createContext<Sprite>(defaultValueState);
const SpriteActionsContext = React.createContext<SpriteActions>(
  defaultValueActions,
);

const useSpriteActions = () => React.useContext(SpriteActionsContext);
const useSprite = () => React.useContext(SpriteStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const sprites = useSprites();
  const [state, dispatch] = React.useReducer(reducer, defaultValueState);
  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);
  const { children } = props;
  const { changeSprite } = actions;

  const spriteIds = React.useMemo(() => Object.keys(sprites), [sprites]);
  if (!state && spriteIds.length !== 0) {
    const sprite = sprites[spriteIds[0]];
    changeSprite(sprite);
  }
  return (
    <SpriteActionsContext.Provider value={actions}>
      <SpriteStateContext.Provider value={state}>
        {children}
      </SpriteStateContext.Provider>
    </SpriteActionsContext.Provider>
  );
};

export * from './types';
export { Provider, useSprite, useSpriteActions };
