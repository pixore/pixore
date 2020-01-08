import { actionType, Action, PalettesActions, PalettesState } from './types';
import { Palette } from '../Palette/types';

const reducer = (state: PalettesState, action: Action): PalettesState => {
  const { type, payload } = action;
  switch (type) {
    case actionType.ADD_PALETTE:
    case actionType.UPDATE_PALETTE:
      const { id } = payload as Palette;
      return {
        ...state,
        [id]: payload as Palette,
      };
    case actionType.REMOVE_PALETTE:
      const newState = {
        ...state,
      };

      Reflect.deleteProperty(newState, payload as string);
      return newState;
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;
const createActions = (dispatch: Dispatch): PalettesActions => ({
  addPalette(palette: Palette) {
    dispatch({
      type: actionType.ADD_PALETTE,
      payload: palette,
    });
  },
  removePalette(id: string) {
    dispatch({
      type: actionType.REMOVE_PALETTE,
      payload: id,
    });
  },
  updatePalette(palette: Palette) {
    dispatch({
      type: actionType.UPDATE_PALETTE,
      payload: palette,
    });
  },
});

export { createActions, reducer };
