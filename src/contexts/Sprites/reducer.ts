import { SpritesState, actionType, Action, SpritesActions } from './types';
import { Sprite } from '../Sprite';

const reducer = (state: SpritesState, action: Action): SpritesState => {
  const { type, payload } = action;
  const { id } = payload;
  switch (type) {
    case actionType.ADD_SPRITE:
      return {
        ...state,
        [id]: payload,
      };
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;
const createActions = (dispatch: Dispatch): SpritesActions => ({
  addSprite(sprite: Sprite) {
    dispatch({
      type: actionType.ADD_SPRITE,
      payload: sprite,
    });
  },
});

export { createActions, reducer };
