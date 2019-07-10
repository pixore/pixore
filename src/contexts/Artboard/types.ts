import { Sprite } from '../Sprite/types';

enum actionType {
  CENTER,
  CHANGE_POSITION,
  CHANGE_ARTBOARD,
  CHANGE_FRAME,
  CHANGE_LAYER,
}
interface Stats {
  width: number;
  height: number;
  top: number;
  left: number;
}

interface ChangePositionPayload {
  scale: number;
  x: number;
  y: number;
}

interface ArtboardsActions {
  center: (stats: Stats, sprite: Sprite) => void;
  changePosition: (payload: ChangePositionPayload) => void;
  changeArtboard: (artboard: Artboard) => void;
  changeLayer: (layer: string) => void;
  changeFrame: (frame: string) => void;
}

interface Artboard {
  id: string;
  color?: string;
  scale: number;
  layer: string;
  frame: string;
  x: number;
  y: number;
}

type Payload = Artboard | ChangePositionPayload | string;

interface Action {
  type: actionType;
  payload: Payload;
}

export { Stats, Artboard, ArtboardsActions, Action, actionType };
