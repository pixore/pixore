import { Artboard, ArtboardsActions } from '../contexts/Artboard';
import { Sprite, SpriteActions } from '../contexts/Sprite';
import Vector from '../utils/vector';

// SOURCE: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#Return_value
enum Click {
  LEFT = 0,
  RIGHT = 2,
}

interface Context {
  artboard: Artboard;
  sprite: Sprite;
  mainContext: CanvasRenderingContext2D;
  previewContext: CanvasRenderingContext2D;
  lastDrag?: Vector;
  artboardActions: ArtboardsActions;
  spriteActions: SpriteActions;
}

type ContextRef = React.MutableRefObject<Context>;

type Tool = (contextRef: ContextRef) => () => void;

interface Tools {
  [key: string]: Tool;
}

export { Tools, ContextRef, Context, Tool, Click };
