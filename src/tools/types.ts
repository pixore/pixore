import { Artboard } from '../state/artboard';
import { ArtboardActions } from '../contexts/Artboard';
import { Sprite } from '../state/sprite';
import { SpriteActions } from '../contexts/Sprite';
import Vector from '../utils/vector';
import { CanvasStats, Canvas, Stats } from '../types';

export interface HookCanvas {
  scale: number;
  y: number;
  x: number;
  center: (stats: Stats, sprite: Sprite) => void;
  update: (payload: Canvas) => void;
  onWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
}

// SOURCE: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#Return_value
export enum Click {
  LEFT = 0,
  RIGHT = 2,
}

export interface Context {
  artboard: Artboard;
  sprite: Sprite;
  mainContext: CanvasRenderingContext2D;
  previewContext: CanvasRenderingContext2D;
  lastDrag?: Vector;
  artboardActions: ArtboardActions;
  spriteActions: SpriteActions;
  clickType?: number;
  canvas: CanvasStats & HookCanvas;
}

export type ContextRef = React.MutableRefObject<Context>;

export type Tool = (contextRef: ContextRef) => () => void;

export interface Tools {
  [key: string]: Tool;
}
