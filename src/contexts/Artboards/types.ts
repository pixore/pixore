import { Artboard } from '../Artboard';

export enum actionType {
  ADD_ARTBOARD,
}

export type Payload = Artboard;

export interface Action {
  type: actionType;
  payload: Payload;
}

export interface ArtboardsState {
  [key: string]: Artboard;
}

export interface ArtboardsActions {
  addArtboard: (artboard: Artboard) => void;
}
