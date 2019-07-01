import { EditorContext } from '../contexts/EditorContext';

enum actionType {
  SELECT_SPRITE,
}

type Payload = string;

interface Action {
  type: actionType;
  payload: Payload;
}

const reducer = (state: EditorContext, action: Action): EditorContext => {
  const { type, payload } = action;
  switch (type) {
    case actionType.SELECT_SPRITE:
      state.sprite = payload;
      return state;
    default:
      return state;
  }
};

const actions = {
  selectSpr(payload: string): Action {
    return {
      type: actionType.SELECT_SPRITE,
      payload,
    };
  },
};

export { reducer, actions };
