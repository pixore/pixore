import { SpriteActions, Sprite, Action, actionType } from './types';

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
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;
const createActions = (dispatch: Dispatch): SpriteActions => ({
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
  addLayerInSprite(id: string) {
    dispatch({
      type: actionType.ADD_LAYER,
      payload: id,
    });
  },
});

export { createActions, reducer };
