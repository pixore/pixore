import { clean } from '../utils';
import { calculatePosition, validCord } from '../utils/canvas';
import { Key } from '../contexts/Modifiers';
import { manageEvents as $ } from '../utils/dom/events';
import { getModifierState } from '../utils/keyboard';
import { paintPreview } from '../utils/paint';
import Vector from '../utils/vector';
import { ListenerContextRef } from './types';

const addEventListener = (listenerContextRef: ListenerContextRef) => {
  const $window = $(window);
  const saveLastDrag = (lastDrag: Vector) => {
    listenerContextRef.current.lastDrag = lastDrag;
  };

  const onMouseDownPanning = (event: MouseEvent) => {
    const {
      artboard,
      canvas,
      changePosition,
      lastDrag,
    } = listenerContextRef.current;
    event.preventDefault();
    const { clientX, clientY } = event;
    const currentDrag: Vector = { x: clientX, y: clientY };
    clean(canvas);
    const dragDiff = lastDrag
      ? Vector.getDiff(currentDrag, lastDrag)
      : { x: 0, y: 0 };

    changePosition({
      x: artboard.x + dragDiff.x,
      y: artboard.y + dragDiff.y,
      scale: artboard.scale,
    });

    saveLastDrag(currentDrag);
  };

  const onMouseDownPaiting = () => console.log('paiting');

  const onMouseMovePreview = (event: MouseEvent) => {
    const { artboard, sprite, context, canvas } = listenerContextRef.current;
    event.preventDefault();
    const { clientX, clientY } = event;
    clean(canvas);
    const cord = calculatePosition(artboard, clientX, clientY);

    if (validCord(sprite, cord)) {
      paintPreview(cord, context, artboard);
    } else {
      clean(canvas);
    }
  };

  const onMouseUp = () => {
    saveLastDrag(undefined);
    $window.off('mouseup', onMouseUp);
  };

  // TODO: I think this could be solved by using (and implementing) 'once' instead of 'on'
  const onMouseUpRemove = () => {
    $window
      .off('mousemove', onMouseDownPanning)
      .off('mousemove', onMouseDownPaiting)
      .off('mouseup', onMouseUpRemove);
  };

  const onMouseDown = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    saveLastDrag({ x: clientX, y: clientY });

    if (getModifierState(Key.Spacebar)) {
      $window.on('mousemove', onMouseDownPanning);
    } else {
      $window.on('mousemove', onMouseDownPaiting);
    }

    $window.on('mouseup', onMouseUp).on('mouseup', onMouseUpRemove);
  };

  $window.on('mousedown', onMouseDown).on('mousemove', onMouseMovePreview);

  return () =>
    $window
      .off('mousedown', onMouseDown)
      .off('mousemove', onMouseMovePreview)
      .off('mouseup', onMouseUp);
};

const name = 'pen';

export { name, addEventListener };
