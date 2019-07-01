import { SpritesContext, Sprite } from '../contexts/SpritesContext';

enum actionType {
  CREATE_SPRITE,
}

type Payload = Sprite;

interface Action {
  type: actionType;
  payload: Payload;
}

const reducer = (state: SpritesContext, action: Action): SpritesContext => {
  const { type, payload } = action;
  switch (type) {
    case actionType.CREATE_SPRITE:
      const { id } = payload;
      state[id] = payload;
      return state;
    default:
      return state;
  }
};

const actions = {
  createSprite(payload: Sprite): Action {
    return {
      type: actionType.CREATE_SPRITE,
      payload,
    };
  },
};

export { reducer, actions };
