import { ContextRef, Click } from './types';
import { getContext } from '../utils/contexts';
import { Key } from '../contexts/Modifiers';
import { getModifierState } from '../utils/keyboard';
import { manageEvents as $ } from '../utils/dom/events';
import Vector from '../utils/vector';
import { round2, isTransparent, clean } from '../utils';
import { calculatePosition } from '../utils/canvas';
import { Artboard } from '../contexts/Artboard';

type RemovePanning = () => void;
type RemovePreview = () => void;

const addPreview = (contextRef: ContextRef): RemovePreview => {
  const $window = $(window);

  const paint = (cord: Vector) => {
    const { x, y } = cord;
    const { previewContext, canvas } = contextRef.current;
    const { scale } = canvas;
    const previewX = round2(x * scale + canvas.x);
    const previewY = round2(y * scale + canvas.y);

    clean(previewContext.canvas);

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

const getColor = (artboard: Artboard, clickType: number): string => {
  const { primaryColor, secondaryColor } = artboard;

  return clickType === Click.LEFT ? primaryColor : secondaryColor;
};

const paint = (contextRef: ContextRef, cord: Vector) => {
  const {
    artboard,
    sprite,
    mainContext,
    clickType,
    canvas,
  } = contextRef.current;
  const { frame, layer } = artboard;
  const { scale } = canvas;
  const { x, y } = cord;

  const color = getColor(artboard, clickType);
  const layerContext = getContext(frame, layer, sprite);
  const previewX = round2(x * scale + canvas.x);
  const previewY = round2(y * scale + canvas.y);

  if (isTransparent(color)) {
    mainContext.clearRect(previewX, previewY, scale, scale);
    layerContext.clearRect(x, y, 1, 1);
  } else {
    mainContext.fillStyle = color;
    mainContext.fillRect(previewX, previewY, scale, scale);
    layerContext.fillStyle = color;
    layerContext.fillRect(x, y, 1, 1);
  }
};

export { addPanning, addPreview, getColor, paint };
