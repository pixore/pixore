import {
  WindowsState,
  actionType,
  Action,
  WindowsActions,
  OpenPayload,
  WindowConfig,
} from './types';

let idCounter = 0;
const createId = () => {
  const id = `window-${idCounter}`;
  idCounter = idCounter + 1;

  return id;
};

const reducer = (state: WindowsState, action: Action): WindowsState => {
  const { type, payload } = action;

  switch (type) {
    case actionType.OPEN_WINDOW:
      const { state: windowState, id } = payload as OpenPayload;
      return {
        ...state,
        [id]: windowState,
      };
    case actionType.CLOSE_WINDOW:
      const newState = {
        ...state,
      };

      Reflect.deleteProperty(newState, payload as string);

      return newState;
    default:
      return state;
  }
};

const defaultConfig: WindowConfig = {
  dragable: true,
  resizable: true,
  backdrop: false,
};

type Dispatch = (action: Action) => void;
const createActions = (dispatch: Dispatch): WindowsActions => ({
  openWindow(name, args) {
    const { config, props, state } = args;
    const id = createId();

    dispatch({
      type: actionType.OPEN_WINDOW,
      payload: {
        id,
        state: {
          name,
          config: Object.assign(defaultConfig, config),
          props,
          state,
        },
      },
    });

    return id;
  },
  closeWindow(id) {
    dispatch({
      type: actionType.CLOSE_WINDOW,
      payload: id,
    });
  },
});

export { createActions, reducer };
