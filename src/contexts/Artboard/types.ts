import { Sprite } from '../Sprite/types';

export enum actionType {
  CENTER,
  CHANGE_POSITION,
  CHANGE_ARTBOARD,
  CHANGE_FRAME,
  CHANGE_LAYER,
  CHANGE_PRIMARY_COLOR,
  CHANGE_SECONDARY_COLOR,
  CHANGE_TOOL,
}
export interface Stats {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface ChangePositionPayload {
  scale: number;
  x: number;
  y: number;
}

export interface ArtboardsActions {
  center: (stats: Stats, sprite: Sprite) => void;
  changePosition: (payload: ChangePositionPayload) => void;
  changeArtboard: (artboard: Artboard) => void;
  changeLayer: (layer: string) => void;
  changeFrame: (frame: string) => void;
  changePrimaryColor: (color: string) => void;
  changeSecondaryColor: (color: string) => void;
  changeTool: (tool: string) => void;
}

export interface Artboard {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  scale: number;
  layer: string;
  frame: string;
  tool: string;
  x: number;
  y: number;
}

type Payload = Artboard | ChangePositionPayload | string;

export interface Action {
  type: actionType;
  payload: Payload;
}
