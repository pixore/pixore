import { SpriteActions, Action, actionType } from './types';
import { Sprite } from '../../types';
import { getNewId } from '../../utils';
import { LayersActions } from '../Layers';
import { FramesActions } from '../Frames';

const reducer = (state: Sprite, action: Action): Sprite => {
  const { type, payload } = action;
  switch (type) {
    case actionType.CHANGE_SPRITE:
      return payload as Sprite;
    case actionType.CHANGE_NAME:
      const { id } = state;
      return {
        ...state,
        name: payload as string,
        id,
      };
    case actionType.ADD_LAYER:
      const { layers } = state;
      return {
        ...state,
        layers: layers.concat(payload as string),
      };
    case actionType.ADD_FRAME: {
      const { frames } = state;
      return {
        ...state,
        frames: frames.concat(payload as string),
      };
    }
    case actionType.CREATE_NEW_VERSION:
      const { version = 0 } = state;

      return {
        ...state,
        version: version + 1,
      };
    case actionType.REMOVE_FRAME: {
      const { frames } = state;
      return {
        ...state,
        frames: frames.filter((id) => id !== payload),
      };
    }
    case actionType.REMOVE_LAYER: {
      const { layers } = state;
      return {
        ...state,
        layers: layers.filter((id) => id !== payload),
      };
    }
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;
interface Deps {
  layersActions: LayersActions;
  framesActions: FramesActions;
}
const createActions = (
  dispatch: Dispatch,
  { layersActions, framesActions }: Deps,
): SpriteActions => ({
  changeName(name: string) {
    dispatch({
      type: actionType.CHANGE_NAME,
      payload: name,
    });
  },
  changeSprite(sprite: Sprite) {
    dispatch({
      type: actionType.CHANGE_SPRITE,
      payload: sprite,
    });
  },
  addNewLayerToSprite({ name, spriteId }) {
    const { addLayer } = layersActions;
    const id = getNewId();
    addLayer({
      id,
      name,
      spriteId,
    });

    dispatch({
      type: actionType.ADD_LAYER,
      payload: id,
    });

    return id;
  },
  addNewFrameToSprite(spriteId) {
    const { addFrame } = framesActions;
    const id = getNewId();
    addFrame({
      id,
      spriteId,
    });
    dispatch({
      type: actionType.ADD_FRAME,
      payload: id,
    });

    return id;
  },
  createNewVersion() {
    dispatch({
      type: actionType.CREATE_NEW_VERSION,
    });
  },
  removeFrameFromSprite(frameId) {
    const { removeFrame } = framesActions;
    dispatch({
      type: actionType.REMOVE_FRAME,
      payload: frameId,
    });
    removeFrame(frameId);
  },
  removeLayerFromSprite(layerId) {
    const { removeLayer } = layersActions;

    dispatch({
      type: actionType.REMOVE_LAYER,
      payload: layerId,
    });

    setTimeout(() => {
      removeLayer(layerId);
    }, 100);
  },
});

export { createActions, reducer };
