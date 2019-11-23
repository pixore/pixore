export interface Layer {
  id: string;
  name: string;
}

export enum actionType {
  ADD_LAYER,
}

export type Payload = Layer;

export interface Action {
  type: actionType;
  payload: Payload;
}

export interface LayersActions {
  addLayer: (layer: Layer) => void;
}

export interface LayersState {
  [key: string]: Layer;
}
