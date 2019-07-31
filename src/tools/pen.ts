import { clean, getContext } from '../utils';
import { calculatePosition, validCord } from '../utils/canvas';
import { Key } from '../contexts/Modifiers';
import { manageEvents as $ } from '../utils/dom/events';
import { getModifierState } from '../utils/keyboard';
import Vector from '../utils/vector';
import { createOnMouseMovePreview } from './utils';
import { ListenerContextRef } from './types';

type Context = ListenerContextRef & {
  current: {
    lastPosition?: Vector;
  };
};

const addEventListener = (listenerContextRef: Context) => {
  const $window = $(window);
  const saveLastDrag = (lastDrag: Vector) => {
    listenerContextRef.current.lastDrag = lastDrag;
  };

  const onMouseMovePreview = createOnMouseMovePreview(listenerContextRef);

  const paint = (cord: Vector) => {
    const { x, y } = cord;
    const {
      artboard,
      sprite,
      context: previewContext,
    } = listenerContextRef.current;
    const { primaryColor, frame, layer } = artboard;
    const layerContext = getContext(frame, layer, sprite);

    previewContext.fillStyle = primaryColor;
    previewContext.fillRect(
      x * artboard.scale + artboard.x,
      y * artboard.scale + artboard.y,
      artboard.scale,
      artboard.scale,
    );
    layerContext.fillStyle = primaryColor;
    layerContext.fillRect(x, y, 1, 1);
  };

  const onMouseMovePanning = (event: MouseEvent) => {
    const {
      artboard,
      canvas,
      artboardActions,
      lastDrag,
    } = listenerContextRef.current;

    const { changePosition } = artboardActions;
    const { clientX, clientY } = event;
    const currentDrag: Vector = { x: clientX, y: clientY };

    const dragDiff = lastDrag
      ? Vector.getDelta(currentDrag, lastDrag)
      : { x: 0, y: 0 };

    event.preventDefault();
    clean(canvas);

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
      .off('mouseup', onMouseUpPanning)
      .on('mousemove', onMouseMovePreview);
  };

  const onMouseMovePainting = (event: MouseEvent) => {
    const {
      artboard,
      sprite,
      spriteActions,
      lastPosition,
    } = listenerContextRef.current;
    const { createNewVersion } = spriteActions;
    const cord = calculatePosition(artboard, event.clientX, event.clientY);
    const delta = Vector.getAbsoluteDelta(lastPosition, cord);
    const importantDiff = delta.x > 1 || delta.y > 1;

    if (validCord(sprite, cord) && validCord(sprite, lastPosition)) {
      if (importantDiff) {
        Vector.lineBetween(lastPosition, cord, paint);
      } else {
        paint(cord);
        createNewVersion();
      }
    }

    listenerContextRef.current.lastPosition = cord;
  };

  const onMouseUpPainting = () => {
    $window
      .off('mouseup', onMouseUpPainting)
      .off('mousemove', onMouseMovePainting)
      .on('mousemove', onMouseMovePreview);
  };

  const onMouseDown = (event: MouseEvent) => {
    const { canvas, artboard } = listenerContextRef.current;
    const { clientX, clientY } = event;
    const isPanning = getModifierState(Key.Spacebar);

    saveLastDrag({ x: clientX, y: clientY });
    $window.off('mousemove', onMouseMovePreview);
    clean(canvas);
    const cord = calculatePosition(artboard, event.clientX, event.clientY);

    if (isPanning) {
      $window
        .on('mousemove', onMouseMovePanning)
        .on('mouseup', onMouseUpPanning);
    } else {
      listenerContextRef.current.lastPosition = cord;
      $window
        .on('mousemove', onMouseMovePainting)
        .on('mouseup', onMouseUpPainting);
    }
  };

  $window.on('mousedown', onMouseDown).on('mousemove', onMouseMovePreview);
  return () =>
    $window
      .off('mousedown', onMouseDown)
      .off('mousemove', onMouseMovePreview)
      .off('mousemove', onMouseMovePainting)
      .off('mousemove', onMouseMovePanning)
      .off('mouseup', onMouseUpPanning)
      .off('mouseup', onMouseUpPainting);
};

const name = 'pen';

export { name, addEventListener };
