import { ListenerContextRef } from './types';
import { clean } from '../utils';
import { calculatePosition, validCord } from '../utils/canvas';
import { paintPreview } from '../utils/paint';

const createOnMouseMovePreview = (listenerContextRef: ListenerContextRef) => (
  event: MouseEvent,
) => {
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

export { createOnMouseMovePreview };
