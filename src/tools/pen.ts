import { isTransparent, round2 } from '../utils';
import { getContext } from '../utils/contexts';
import { calculatePosition, validCord } from '../utils/canvas';
import { Key } from '../contexts/Modifiers';
import { manageEvents as $ } from '../utils/dom/events';
import { getModifierState } from '../utils/keyboard';
import Vector from '../utils/vector';
import { ContextRef, Click } from './types';
import { addPanning, addPreview } from './utils';

type Context = ContextRef & {
  current: {
    lastPosition?: Vector;
    clickType?: number;
  };
};

const addEventListener = (contextRef: Context) => {
  const { previewContext } = contextRef.current;
  const $window = $(window);
  const $previewCanvas = $(previewContext.canvas);
  const removePanning = addPanning(contextRef);
  const removePreview = addPreview(contextRef);

  const paint = (cord: Vector, color: string) => {
    const { x, y } = cord;
    const { artboard, sprite, mainContext } = contextRef.current;
    const { frame, layer, scale } = artboard;
    const layerContext = getContext(frame, layer, sprite);
    const previewX = round2(x * scale + artboard.x);
    const previewY = round2(y * scale + artboard.y);

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

  const onMouseMovePainting = (event: MouseEvent) => {
    const { artboard, sprite, lastPosition, clickType } = contextRef.current;
    const cord = calculatePosition(artboard, event.clientX, event.clientY);
    const delta = Vector.getAbsoluteDelta(lastPosition, cord);
    const importantDiff = delta.x > 1 || delta.y > 1;
    const { primaryColor, secondaryColor } = artboard;

    if (validCord(sprite, cord) && validCord(sprite, lastPosition)) {
      const color = clickType === Click.LEFT ? primaryColor : secondaryColor;
      if (importantDiff) {
        Vector.lineBetween(lastPosition, cord, (newCord) =>
          paint(newCord, color),
        );
      } else {
        paint(cord, color);
      }
    }

    contextRef.current.lastPosition = cord;
  };

  const onMouseUpPainting = () => {
    const { spriteActions } = contextRef.current;
    const { createNewVersion } = spriteActions;
    createNewVersion();
    $window
      .off('mouseup', onMouseUpPainting)
      .off('mousemove', onMouseMovePainting);
  };

  const onMouseDown = (event: MouseEvent) => {
    const { artboard } = contextRef.current;
    const { clientX, clientY } = event;
    const isPanning = getModifierState(Key.Spacebar);

    const cord = calculatePosition(artboard, clientX, clientY);

    if (!isPanning) {
      contextRef.current.lastPosition = cord;
      contextRef.current.clickType = event.button;

      $window
        .on('mousemove', onMouseMovePainting)
        .on('mouseup', onMouseUpPainting);
    }
  };

  $previewCanvas.on('mousedown', onMouseDown);
  return () => {
    removePanning();
    removePreview();

    $previewCanvas.off('mousedown', onMouseDown);
    $window
      .off('mousemove', onMouseMovePainting)
      .off('mouseup', onMouseUpPainting);
  };
};

const name = 'pen';

export { name, addEventListener };
