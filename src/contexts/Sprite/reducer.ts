import { SpriteActions, Sprite, Action, actionType } from './types';

const reducer = (state: Sprite, action: Action): Sprite => {
  const { type, payload } = action;
  const { id } = state;
  switch (type) {
    case actionType.CHANGE_SPRITE:
      return payload as Sprite;
    case actionType.CHANGE_NAME:
      return {
        ...state,
        name: payload as string,
        id,
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
});

export { createActions, reducer };
