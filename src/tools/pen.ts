import { calculatePosition, validCord } from '../utils/canvas';
import { Key } from '../contexts/Modifiers';
import { manageEvents as $ } from '../utils/dom/events';
import { getModifierState } from '../utils/keyboard';
import Vector from '../utils/vector';
import { ContextRef } from './types';
import { addPanning, addPreview, paint } from './utils';

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

  const onMouseMovePainting = (event: MouseEvent) => {
    const { artboard, sprite, lastPosition } = contextRef.current;
    const cord = calculatePosition(artboard, event.clientX, event.clientY);
    const delta = Vector.getAbsoluteDelta(lastPosition, cord);
    const importantDiff = delta.x > 1 || delta.y > 1;

    if (validCord(sprite, cord) && validCord(sprite, lastPosition)) {
      if (importantDiff) {
        Vector.lineBetween(lastPosition, cord, (newCord) =>
          paint(contextRef, newCord),
        );
      } else {
        paint(contextRef, cord);
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
    const { artboard, sprite } = contextRef.current;
    const { clientX, clientY } = event;
    const isPanning = getModifierState(Key.Spacebar);

    const cord = calculatePosition(artboard, clientX, clientY);

    if (!isPanning) {
      contextRef.current.lastPosition = cord;
      contextRef.current.clickType = event.button;

      if (validCord(sprite, cord)) {
        paint(contextRef, cord);
      }

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
