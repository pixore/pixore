import { Canvas, Sprite } from '../../types';

export interface CanvasUpdate {
  x?: number;
  y?: number;
  scale?: number;
}

export enum actionType {
  CENTER,
  UPDATE,
}

export interface Stats {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface CanvasActions {
  center: (stats: Stats, sprite: Sprite) => void;
  update: (payload: Canvas) => void;
}

type Payload = CanvasUpdate;

export interface Action {
  type: actionType;
  payload: Payload;
}
