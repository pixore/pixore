import { Sprite } from '../Sprite/types';

enum actionType {
  CENTER,
  CHANGE_POSITION,
  CHANGE_ARTBOARD,
}
type Stats = {
  width: number;
  height: number;
  top: number;
  left: number;
};

type ChangePositionPayload = {
  scale: number;
  x: number;
  y: number;
};

interface ArtboardsActions {
  center: (stats: Stats, sprite: Sprite) => void;
  changePosition: (payload: ChangePositionPayload) => void;
  changeArtboard: (artboard: Artboard) => void;
}

interface Artboard {
  id: string;
  color?: string;
  scale: number;
  x: number;
  y: number;
}

type Payload = Artboard | ChangePositionPayload;

interface Action {
  type: actionType;
  payload: Payload;
}

export { Stats, Artboard, ArtboardsActions, Action, actionType };
