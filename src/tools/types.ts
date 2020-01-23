import { ArtboardContext, ArtboardActions } from '../state/artboard';
import { SpriteActions, SpriteContext } from '../state/sprite';
import Vector from '../utils/vector';
import { Sprite, CanvasStats, HookCanvas } from '../types';

// SOURCE: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#Return_value
export enum Click {
  LEFT = 0,
  RIGHT = 2,
}

export interface Context {
  artboard: ArtboardContext;
  sprite: Sprite | SpriteContext;
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
