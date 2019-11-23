import { Artboard, ArtboardsActions } from '../contexts/Artboard';
import { Sprite, SpriteActions } from '../contexts/Sprite';
import Vector from '../utils/vector';

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
  artboardActions: ArtboardsActions;
  spriteActions: SpriteActions;
  clickType?: number;
}

export type ContextRef = React.MutableRefObject<Context>;

export type Tool = (contextRef: ContextRef) => () => void;

export interface Tools {
  [key: string]: Tool;
}
