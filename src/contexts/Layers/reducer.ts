import { LayersState, LayersActions, Action, actionType, Layer } from './types';
import { removeContextsByLayer } from '../../utils/contexts';

const reducer = (state: LayersState, action: Action): LayersState => {
  const { type, payload } = action;
  switch (type) {
    case actionType.ADD_LAYER: {
      const layer = payload as Layer;
      return {
        ...state,
        [layer.id]: layer,
      };
    }
    case actionType.REMOVE_LAYER: {
      const id = payload as string;
      const layer = state[id];

      if (!layer) {
        console.warn(`Trying to remove a unknown layer: ${id}`);

        return state;
      }

      const newState = {
        ...state,
      };

      removeContextsByLayer(layer.spriteId, id);

      Reflect.deleteProperty(newState, id);

      return newState;
    }
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;
const createActions = (dispatch: Dispatch): LayersActions => ({
  addLayer(layer) {
    dispatch({
      type: actionType.ADD_LAYER,
      payload: layer,
    });
  },
  removeLayer(id) {
    dispatch({
      type: actionType.REMOVE_LAYER,
      payload: id,
    });
  },
});

export { createActions, reducer };
