import { Artboard } from '../contexts/Artboard';
import { Sprite } from '../contexts/Sprite';
import Vector from '../utils/vector';

interface ListenerContext {
  artboard: Artboard;
  sprite: Sprite;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  lastDrag?: Vector;
  changePosition: Function;
}

type ListenerContextRef = React.MutableRefObject<ListenerContext>;

type Tool = (listenerContextRef: ListenerContextRef) => () => void;

interface Tools {
  [key: string]: Tool;
}

export { Tools, ListenerContextRef, ListenerContext, Tool };
