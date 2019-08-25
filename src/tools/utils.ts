import { ContextRef } from './types';
import { Key } from '../contexts/Modifiers';
import { getModifierState } from '../utils/keyboard';
import { manageEvents as $ } from '../utils/dom/events';
import Vector from '../utils/vector';
import { round2, clean } from '../utils';
import { calculatePosition } from '../utils/canvas';

type RemovePanning = () => void;
type RemovePreview = () => void;

const addPreview = (contextRef: ContextRef): RemovePreview => {
  const $window = $(window);

  const paint = (cord: Vector) => {
    const { x, y } = cord;
    const { artboard, previewContext } = contextRef.current;
    const { scale } = artboard;
    const previewX = round2(x * scale + artboard.x);
    const previewY = round2(y * scale + artboard.y);

    clean(previewContext.canvas);

    previewContext.strokeStyle = 'black';
    previewContext.strokeRect(previewX, previewY, scale, scale);
  };

  const onMouseMove = (event: MouseEvent) => {
    const { artboard } = contextRef.current;
    const { clientX, clientY } = event;
    const cord = calculatePosition(artboard, clientX, clientY);

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
    const { artboard, artboardActions, lastDrag } = contextRef.current;

    const { changePosition } = artboardActions;
    const { clientX, clientY } = event;
    const currentDrag: Vector = { x: clientX, y: clientY };

    const dragDiff = lastDrag
      ? Vector.getDelta(currentDrag, lastDrag)
      : { x: 0, y: 0 };

    event.preventDefault();

    changePosition({
      x: artboard.x + dragDiff.x,
      y: artboard.y + dragDiff.y,
      scale: artboard.scale,
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

export { addPanning, addPreview };
