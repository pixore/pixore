import { Palette } from '../Palette';

export enum actionType {
  ADD_PALETTE,
  REMOVE_PALETTE,
  UPDATE_PALETTE,
}

export type Payload = Palette | string;

export interface Action {
  type: actionType;
  payload: Payload;
}

export interface PalettesState {
  [key: string]: Palette;
}

export interface PalettesActions {
  addPalette: (palette: Palette) => void;
  removePalette: (id: string) => void;
  updatePalette: (palette: Palette) => void;
}
