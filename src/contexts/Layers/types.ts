export interface Layer {
  id: string;
  name: string;
  spriteId: string;
}

export enum actionType {
  ADD_LAYER,
  REMOVE_LAYER,
}

export type Payload = Layer | string;

export interface Action {
  type: actionType;
  payload: Payload;
}

export interface LayersActions {
  addLayer: (layer: Layer) => void;
  removeLayer: (id: string) => void;
}

export interface LayersState {
  [key: string]: Layer;
}
