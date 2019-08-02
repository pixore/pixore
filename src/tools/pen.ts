import { clean, isTransparent } from '../utils';
import { getContext, getMainContext, mirrorContext } from '../utils/contexts';
import { calculatePosition, validCord } from '../utils/canvas';
import { Key } from '../contexts/Modifiers';
import { manageEvents as $ } from '../utils/dom/events';
import { getModifierState } from '../utils/keyboard';
import Vector from '../utils/vector';
import { createOnMouseMovePreview } from './utils';
import { ListenerContextRef, Click } from './types';

type Context = ListenerContextRef & {
  current: {
    lastPosition?: Vector;
    clickType?: number;
  };
};

const addEventListener = (listenerContextRef: Context) => {
  const $window = $(window);
  const saveLastDrag = (lastDrag: Vector) => {
    listenerContextRef.current.lastDrag = lastDrag;
  };

  const onMouseMovePreview = createOnMouseMovePreview(listenerContextRef);

  const paint = (cord: Vector, color: string) => {
    const { x, y } = cord;
    const {
      artboard,
      sprite,
      context: previewContext,
    } = listenerContextRef.current;
    const { frame, layer, scale } = artboard;
    const layerContext = getContext(frame, layer, sprite);
    const previewX = x * scale + artboard.x;
    const previewY = y * scale + artboard.y;
    if (isTransparent(color)) {
      previewContext.clearRect(
        previewX,
        previewY,
        artboard.scale,
        artboard.scale,
      );
      layerContext.clearRect(x, y, 1, 1);
    } else {
      previewContext.fillStyle = color;
      previewContext.fillRect(
        previewX,
        previewY,
        artboard.scale,
        artboard.scale,
      );
      layerContext.fillStyle = color;
      layerContext.fillRect(x, y, 1, 1);
    }
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
      lastPosition,
      clickType,
    } = listenerContextRef.current;
    const cord = calculatePosition(artboard, event.clientX, event.clientY);
    const delta = Vector.getAbsoluteDelta(lastPosition, cord);
    const importantDiff = delta.x > 1 || delta.y > 1;
    const { primaryColor, secondaryColor } = artboard;

    if (validCord(sprite, cord) && validCord(sprite, lastPosition)) {
      console.log(clickType, primaryColor, secondaryColor);

      const color = clickType === Click.LEFT ? primaryColor : secondaryColor;
      if (importantDiff) {
        Vector.lineBetween(lastPosition, cord, (newCord) =>
          paint(newCord, color),
        );
      } else {
        paint(cord, color);
      }
    }

    listenerContextRef.current.lastPosition = cord;
  };

  const onMouseUpPainting = () => {
    const { spriteActions } = listenerContextRef.current;
    const { createNewVersion } = spriteActions;
    createNewVersion();
    $window
      .off('mouseup', onMouseUpPainting)
      .off('mousemove', onMouseMovePainting)
      .on('mousemove', onMouseMovePreview);
  };

  const onMouseDown = (event: MouseEvent) => {
    const {
      canvas,
      artboard,
      context: previewContext,
    } = listenerContextRef.current;
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
      const mainContext = getMainContext();

      mirrorContext(mainContext, previewContext);
      clean(mainContext.canvas);

      listenerContextRef.current.lastPosition = cord;
      listenerContextRef.current.clickType = event.button;

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
