import React from 'react';
import invariant from 'invariant';
import { Sprite } from '../../types';
import { SpriteActions } from './types';
import { reducer, createActions } from './reducer';
import { useSprites } from '../Sprites';
import { useLayersActions } from '../Layers';
import { useFramesActions } from '../Frames';

const defaultValueState = undefined;

const defaultValueActions = {
  changeName(_name) {
    invariant(false, 'Context not implemented');
  },
  changeSprite(_sprite) {
    invariant(false, 'Context not implemented');
  },
  addNewLayerToSprite(_newLayer) {
    invariant(false, 'Context not implemented');
    return '';
  },
  addNewFrameToSprite() {
    invariant(false, 'Context not implemented');
    return '';
  },
  createNewVersion() {
    invariant(false, 'Context not implemented');
  },
  removeFrameFromSprite(frameId) {
    invariant(false, 'Context not implemented');
  },
  removeLayerFromSprite(layerId) {
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
  const layersActions = useLayersActions();
  const framesActions = useFramesActions();
  const sprites = useSprites();
  const [state, dispatch] = React.useReducer(reducer, defaultValueState);
  const actions = React.useMemo(
    () => createActions(dispatch, { layersActions, framesActions }),
    [dispatch, layersActions, framesActions],
  );
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
