import {
  WindowsState,
  actionType,
  Action,
  WindowsActions,
  WindowState,
} from './types';

const reducer = (state: WindowsState, action: Action): WindowsState => {
  const { type, payload } = action;

  switch (type) {
    case actionType.OPEN_WINDOW:
      return state.concat(payload as WindowState);
    case actionType.CLOSE_WINDOW:
      return state.filter((item) => item.name !== payload);
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;
const createActions = (dispatch: Dispatch): WindowsActions => ({
  openWindow(name, state) {
    dispatch({
      type: actionType.OPEN_WINDOW,
      payload: { name, state },
    });
  },
  closeWindow(name) {
    dispatch({
      type: actionType.CLOSE_WINDOW,
      payload: name,
    });
  },
});

export { createActions, reducer };
