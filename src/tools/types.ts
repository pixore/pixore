import { Artboard, ArtboardsActions } from '../contexts/Artboard';
import { Sprite, SpriteActions } from '../contexts/Sprite';
import Vector from '../utils/vector';

// SOURCE: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#Return_value
enum Click {
  LEFT = 0,
  RIGHT = 2,
}

interface ListenerContext {
  artboard: Artboard;
  sprite: Sprite;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  lastDrag?: Vector;
  artboardActions: ArtboardsActions;
  spriteActions: SpriteActions;
}

type ListenerContextRef = React.MutableRefObject<ListenerContext>;

type Tool = (listenerContextRef: ListenerContextRef) => () => void;

interface Tools {
  [key: string]: Tool;
}

export { Tools, ListenerContextRef, ListenerContext, Tool, Click };
