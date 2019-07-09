import { FramesState, FramesActions, Action, actionType } from './types';

const reducer = (state: FramesState, action: Action): FramesState => {
  const { type, payload } = action;
  switch (type) {
    case actionType.ADD_FRAME:
      const { id } = payload;
      return {
        ...state,
        [id]: payload,
      };
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
});

export { createActions, reducer };
