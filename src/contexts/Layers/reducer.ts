import { LayersState, LayersActions, Action, actionType } from './types';

const reducer = (state: LayersState, action: Action): LayersState => {
  const { type, payload } = action;
  switch (type) {
    case actionType.ADD_LAYER:
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
const createActions = (dispatch: Dispatch): LayersActions => ({
  addLayer({ id, name }) {
    dispatch({
      type: actionType.ADD_LAYER,
      payload: {
        id,
        name,
      },
    });
  },
});

export { createActions, reducer };
