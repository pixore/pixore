import { Color } from '../../utils/Color';
import { PalettesActions } from '../Palettes/types';

export enum actionType {
  CHANGE_PALETTE,
  ADD_COLOR,
  REMOVE_COLOR,
  UPDATE_COLOR,
}

export interface PaletteActions {
  changePalette: (palette: Palette) => void;
  addColor: (color: Color) => void;
  removeColor: (color: Color) => void;
  updateColor: (color: Color, newColor: Color) => void;
}

export interface Palette {
  id: string;
  name: string;
  colors: Color[];
}

export interface UpdateColorPayload {
  color: Color;
  newColor: Color;
}

export type Payload = UpdateColorPayload | Palette | string | Color;

export interface Action {
  type: actionType;
  payload: Payload;
  palettesActions?: PalettesActions;
}
