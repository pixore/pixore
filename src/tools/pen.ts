import { calculatePosition, validCord } from '../utils/canvas';
import { Key } from '../state/modifiers';
import { manageEvents as $ } from '../utils/dom/events';
import { getModifierState } from '../utils/keyboard';
import Vector from '../utils/vector';
import { ContextRef } from './types';
import { PointUpdates } from '../actions/sprites';
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

  let points: PointUpdates = {};

  const onMouseMovePainting = (event: MouseEvent) => {
    const { sprite, lastPosition, canvas } = contextRef.current;
    const { clientX, clientY } = event;
    const cord = calculatePosition(canvas, clientX, clientY);
    const delta = Vector.getAbsoluteDelta(lastPosition, cord);
    const importantDiff = delta.x > 1 || delta.y > 1;

    if (importantDiff) {
      Vector.lineBetween(lastPosition, cord, (newCord) => {
        if (validCord(sprite, newCord)) {
          paint(contextRef, newCord, points);
        }
      });
    } else {
      if (validCord(sprite, cord)) {
        if (lastPosition.y !== cord.y || lastPosition.x !== cord.x) {
          paint(contextRef, cord, points);
        }
      }
    }

    contextRef.current.lastPosition = cord;
  };

  const onMouseUpPainting = () => {
    const { spriteActions, artboard } = contextRef.current;
    const { paintSprite } = spriteActions;
    const colums = Object.keys(points);

    if (colums.length > 0) {
      paintSprite(artboard.frameId, artboard.layerId, points);
    }

    points = {};
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
        paint(contextRef, cord, points);
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
