import Arr from '@pixore/subdivide/dist/utils/Arr';
import {
  Palette,
  PaletteActions,
  actionType,
  Action,
  UpdateColorPayload,
} from './types';
import { PalettesActions } from '../Palettes/types';
import { Color, isEqual } from '../../utils/Color';

const reducer = (state: Palette, action: Action): Palette => {
  const { type, payload, palettesActions } = action;

  switch (type) {
    case actionType.CHANGE_PALETTE:
      if (palettesActions && state) {
        palettesActions.updatePalette(state);
      }
      return payload as Palette;
    case actionType.ADD_COLOR: {
      const color = payload as Color;
      if (state.colors.includes(color)) {
        // avoid duplicates;
        return state;
      }

      if (color.alpha === 0) {
        // avoid adding transparent colors
        return state;
      }

      return {
        ...state,
        colors: state.colors.concat(payload as Color),
      };
    }
    case actionType.REMOVE_COLOR:
      const colors = {
        ...state.colors,
      };

      Arr.omitItem(colors, payload as Color);
      return {
        ...state,
        colors,
      };
    case actionType.UPDATE_COLOR:
      const { newColor, color } = payload as UpdateColorPayload;
      let colorRef: Color;
      if (!state.colors.includes(color)) {
        colorRef = state.colors.find((current) => isEqual(color, current));
        if (!colorRef) {
          return state;
        }
      } else {
        colorRef = color;
      }

      return {
        ...state,
        colors: Arr.replaceItem(state.colors, colorRef, [newColor]),
      };
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;

const createActions = (
  dispatch: Dispatch,
  palettesActions: PalettesActions,
): PaletteActions => ({
  changePalette(palette: Palette) {
    dispatch({
      type: actionType.CHANGE_PALETTE,
      payload: palette,
      palettesActions,
    });
  },
  addColor(color: Color) {
    dispatch({
      type: actionType.ADD_COLOR,
      payload: color,
    });
  },
  removeColor(color: Color) {
    dispatch({
      type: actionType.REMOVE_COLOR,
      payload: color,
    });
  },
  updateColor(color: Color, newColor: Color) {
    dispatch({
      type: actionType.ADD_COLOR,
      payload: {
        color,
        newColor,
      },
    });
  },
});

export { reducer, createActions };
