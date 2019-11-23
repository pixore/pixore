import { ArtboardsState, actionType, Action, ArtboardsActions } from './types';
import { Artboard } from '../Artboard';

const reducer = (state: ArtboardsState, action: Action): ArtboardsState => {
  const { type, payload } = action;
  const { id } = payload;
  switch (type) {
    case actionType.ADD_ARTBOARD:
      return {
        ...state,
        [id]: payload,
      };
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;
const createActions = (dispatch: Dispatch): ArtboardsActions => ({
  addArtboard(artboard: Artboard) {
    dispatch({
      type: actionType.ADD_ARTBOARD,
      payload: artboard,
    });
  },
});

export { createActions, reducer };
