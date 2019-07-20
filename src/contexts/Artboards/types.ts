import { Artboard } from '../Artboard';

enum actionType {
  ADD_ARTBOARD,
}

type Payload = Artboard;

interface Action {
  type: actionType;
  payload: Payload;
}

interface ArtboardsState {
  [key: string]: Artboard;
}

interface ArtboardsActions {
  addArtboard: (artboard: Artboard) => void;
}

export { ArtboardsState, Action, actionType, ArtboardsActions, Artboard };
