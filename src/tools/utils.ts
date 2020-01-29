import { ContextRef, Click } from './types';
import { getContext } from '../utils/contexts';
import { Key } from '../state/modifiers';
import { getModifierState } from '../utils/keyboard';
import { manageEvents as $ } from '../utils/dom/events';
import Vector from '../utils/vector';
import { round1, clean } from '../utils';
import { calculatePosition } from '../utils/canvas';
import { Artboard } from '../state/artboard';
import { isTransparent, toString, Color, create } from '../utils/Color';
import { PointUpdates } from '../actions/sprites';

type RemovePanning = () => void;
type RemovePreview = () => void;
type Context2D = CanvasRenderingContext2D;

const addPreview = (contextRef: ContextRef): RemovePreview => {
  const $window = $(window);

  const paint = (cord: Vector) => {
    const { x, y } = cord;
    const { previewContext, canvas } = contextRef.current;
    const { scale } = canvas;
    const previewX = round1(x * scale + canvas.x);
    const previewY = round1(y * scale + canvas.y);

    clean(previewContext);

    previewContext.strokeStyle = 'black';
    previewContext.strokeRect(previewX, previewY, scale, scale);
  };

  const onMouseMove = (event: MouseEvent) => {
    const { canvas } = contextRef.current;
    const { clientX, clientY } = event;
    const cord = calculatePosition(canvas, clientX, clientY);

    paint(cord);
  };

  $window.on('mousemove', onMouseMove);

  return () => {
    $window.off('mousemove', onMouseMove);
  };
};

const addPanning = (contextRef: ContextRef): RemovePanning => {
  const { previewContext } = contextRef.current;
  const $window = $(window);
  const $previewCanvas = $(previewContext.canvas);

  const saveLastDrag = (lastDrag: Vector) => {
    contextRef.current.lastDrag = lastDrag;
  };

  const onMouseMovePanning = (event: MouseEvent) => {
    const { lastDrag, canvas } = contextRef.current;

    const { clientX, clientY } = event;
    const currentDrag: Vector = { x: clientX, y: clientY };

    const dragDiff = lastDrag
      ? Vector.getDelta(currentDrag, lastDrag)
      : { x: 0, y: 0 };

    event.preventDefault();

    canvas.update({
      x: canvas.x + dragDiff.x,
      y: canvas.y + dragDiff.y,
      scale: canvas.scale,
    });

    saveLastDrag(currentDrag);
  };

  const onMouseUpPanning = () => {
    saveLastDrag(undefined);
    $window
      .off('mousemove', onMouseMovePanning)
      .off('mouseup', onMouseUpPanning);
  };

  const onMouseDown = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const isPanning = getModifierState(Key.Spacebar);

    saveLastDrag({ x: clientX, y: clientY });

    if (isPanning) {
      $window
        .on('mousemove', onMouseMovePanning)
        .on('mouseup', onMouseUpPanning);
    }
  };

  $previewCanvas.on('mousedown', onMouseDown);
  return () => {
    $previewCanvas.off('mousedown', onMouseDown);
    $window
      .off('mousemove', onMouseMovePanning)
      .off('mouseup', onMouseUpPanning);
  };
};

const getColor = (artboard: Artboard, clickType: number): Color => {
  const { primaryColor, secondaryColor } = artboard;

  return clickType === Click.LEFT ? primaryColor : secondaryColor;
};

const paintOrClear = (context: Context2D, cord: Vector, color: Color) => {
  const { x, y } = cord;
  if (isTransparent(color)) {
    context.clearRect(x, y, 1, 1);
  } else {
    context.fillStyle = toString(color);
    context.fillRect(x, y, 1, 1);
  }
};

const paint = (
  contextRef: ContextRef,
  cord: Vector,
  paintedPoints: PointUpdates,
) => {
  const {
    artboard,
    sprite,
    mainContext,
    clickType,
    canvas,
  } = contextRef.current;
  const { frameId, layerId } = artboard;
  const { scale, x, y } = canvas;
  const width = sprite.width * scale;
  const height = sprite.height * scale;

  const color = getColor(artboard, clickType);
  const layerContext = getContext(sprite, frameId, layerId);

  const [red, green, blue, alpha] = layerContext.getImageData(
    cord.x,
    cord.y,
    1,
    1,
  ).data;

  if (!paintedPoints[cord.x]) {
    paintedPoints[cord.x] = {};
  }

  if (!paintedPoints[cord.x][cord.y]) {
    paintedPoints[cord.x][cord.y] = {
      new: color,
      old: create(red, green, blue, (alpha / 255) * 100),
    };
  } else {
    paintedPoints[cord.x][cord.y].new = color;
  }

  paintOrClear(layerContext, cord, color);

  clean(mainContext);
  mainContext.drawImage(
    layerContext.canvas,
    0,
    0,
    sprite.width,
    sprite.height,
    x,
    y,
    width,
    height,
  );
};

export { addPanning, addPreview, getColor, paint, paintOrClear };
