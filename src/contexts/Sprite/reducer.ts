import { SpriteActions, Sprite, Action, actionType } from './types';
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
    case actionType.ADD_FRAME:
      const { frames } = state;
      return {
        ...state,
        frames: frames.concat(payload as string),
      };
    case actionType.CREATE_NEW_VERSION:
      const { version = 0 } = state;

      return {
        ...state,
        version: version + 1,
      };
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
  addNewLayerToSprite({ name }) {
    const { addLayer } = layersActions;
    const id = getNewId();
    addLayer({
      id,
      name,
    });

    dispatch({
      type: actionType.ADD_LAYER,
      payload: id,
    });

    return id;
  },
  addNewFrameToSprite() {
    const { addFrame } = framesActions;
    const id = getNewId();
    addFrame({
      id,
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
});

export { createActions, reducer };
