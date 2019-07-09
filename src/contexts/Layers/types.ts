interface Layer {
  id: string;
  name: string;
}

enum actionType {
  ADD_LAYER,
}

type Payload = Layer;

interface Action {
  type: actionType;
  payload: Payload;
}

interface LayersActions {
  addLayer: (layer: Layer) => void;
}

interface LayersState {
  [key: string]: Layer;
}

export { Layer, Action, actionType, LayersActions, LayersState, Payload };
