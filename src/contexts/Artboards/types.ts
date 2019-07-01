import { Sprite } from '../SpritesContext';

enum actionType {
  CENTER,
  CHANGE_SCALE,
}

interface ArtboardsState {
  [key: string]: Artboard;
}

type Stats = {
  width: number;
  height: number;
  top: number;
  left: number;
};

interface ArtboardsActions {
  center: (stats: Stats, sprite: Sprite) => void;
  changeScale: (id: string, scale: number) => void;
}

type CenterPayload = {
  id: string;
  scale: number;
  x: number;
  y: number;
};

type ChangeScalePayload = {
  id: string;
  scale: number;
};

type Payload = CenterPayload | ChangeScalePayload;

interface Action {
  type: actionType;
  payload: Payload;
}

interface Artboard {
  id: string;
  color?: string;
  scale: number;
  x: number;
  y: number;
}

export {
  Stats,
  Artboard,
  ArtboardsState,
  CenterPayload,
  ArtboardsActions,
  Action,
  actionType,
};
