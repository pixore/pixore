import { FramesState, FramesActions, Action, actionType, Frame } from './types';
import { removeContextsByFrame } from '../../utils/contexts';

const reducer = (state: FramesState, action: Action): FramesState => {
  const { type, payload } = action;
  switch (type) {
    case actionType.ADD_FRAME: {
      const frame = payload as Frame;
      return {
        ...state,
        [frame.id]: frame,
      };
    }
    case actionType.REMOVE_FRAME: {
      const id = payload as string;
      const frame = state[id];

      if (!frame) {
        console.warn(`Trying to remove a unknown frame: ${id}`);
        return state;
      }

      const newState = {
        ...state,
      };

      removeContextsByFrame(frame.spriteId, id);

      Reflect.deleteProperty(newState, id);

      return newState;
    }
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;
const createActions = (dispatch: Dispatch): FramesActions => ({
  addFrame(frame) {
    dispatch({
      type: actionType.ADD_FRAME,
      payload: frame,
    });
  },
  removeFrame(id) {
    dispatch({
      type: actionType.REMOVE_FRAME,
      payload: id,
    });
  },
});

export { createActions, reducer };
