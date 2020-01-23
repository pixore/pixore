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
  const { previewContext, sprite } = contextRef.current;
  const tempContext = document.createElement('canvas').getContext('2d');
  const $window = $(window);
  const $previewCanvas = $(previewContext.canvas);
  const removePanning = addPanning(contextRef);
  const removePreview = addPreview(contextRef);

  tempContext.canvas.width = sprite.width;
  tempContext.canvas.height = sprite.height;

  const onMouseMovePainting = (event: MouseEvent) => {
    const { sprite, lastPosition, canvas } = contextRef.current;
    const { clientX, clientY } = event;
    const cord = calculatePosition(canvas, clientX, clientY);
    const delta = Vector.getAbsoluteDelta(lastPosition, cord);
    const importantDiff = delta.x > 1 || delta.y > 1;

    if (validCord(sprite, cord) && validCord(sprite, lastPosition)) {
      if (importantDiff) {
        Vector.lineBetween(lastPosition, cord, (newCord) =>
          paint(contextRef, newCord, tempContext),
        );
      } else if (lastPosition.y !== cord.y || lastPosition.x !== cord.x) {
        paint(contextRef, cord, tempContext);
      }
    }

    contextRef.current.lastPosition = cord;
  };

  const onMouseUpPainting = () => {
    const { spriteActions } = contextRef.current;
    const { createVersion } = spriteActions;
    createVersion();
    $window
      .off('mouseup', onMouseUpPainting)
      .off('mousemove', onMouseMovePainting);
  };

  const onMouseDown = (event: MouseEvent) => {
    const { canvas, sprite } = contextRef.current;
    const { clientX, clientY } = event;
    const isPanning = getModifierState(Key.Spacebar);

    const cord = calculatePosition(canvas, clientX, clientY);

    if (!isPanning) {
      contextRef.current.lastPosition = cord;
      contextRef.current.clickType = event.button;

      if (validCord(sprite, cord)) {
        paint(contextRef, cord, tempContext);
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
