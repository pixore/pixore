import React from 'react';
import CanvasLayer from './CanvasLayer';
import { useCanvas2DContext } from '../hooks/useCanvas';
import {
  useArtboard,
  useArtboardActions,
  Artboard,
} from '../contexts/Artboard';
import { paintPreview } from '../utils/paint';
import { clean } from '../utils';
import { useSprite, Sprite } from '../contexts/Sprite';
import { calculatePosition, validCord } from '../utils/canvas';
import { Key } from '../contexts/Modifiers';
import { manageEvents as $ } from '../utils/dom/events';
import { getModifierState } from '../utils/keyboard';

const noop = () => {
  console.log('noop');
};

const preventDefault = (event: React.MouseEvent) => event.preventDefault();

interface PropTypes {
  width: number;
  height: number;
  style: React.CSSProperties;
}

interface Vector {
  x: number;
  y: number;
}

const getDiff = (vec1: Vector, vec2: Vector): Vector => ({
  x: vec1.x - vec2.x,
  y: vec1.y - vec2.y,
});

interface ListenerContext {
  artboard: Artboard;
  sprite: Sprite;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  lastDrag?: Vector;
  changePosition: Function;
}

const addEventListener = (
  listenerContext: React.MutableRefObject<ListenerContext>,
) => {
  const $window = $(window);

  const onMouseDownPanning = (event: MouseEvent) => {
    const {
      artboard,
      canvas,
      changePosition,
      lastDrag,
    } = listenerContext.current;
    event.preventDefault();
    const { clientX, clientY } = event;
    const currentDrag = { x: clientX, y: clientY };
    clean(canvas);
    const dragDiff = lastDrag ? getDiff(currentDrag, lastDrag) : { x: 0, y: 0 };

    changePosition({
      x: artboard.x + dragDiff.x,
      y: artboard.y + dragDiff.y,
      scale: artboard.scale,
    });

    listenerContext.current.lastDrag = currentDrag;
  };

  const onMouseMovePreview = (event: MouseEvent) => {
    const { artboard, sprite, context, canvas } = listenerContext.current;
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
    listenerContext.current.lastDrag = null;
    $window.off('mouseup', onMouseUp);
  };

  const onMouseDown = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const currentDrag = { x: clientX, y: clientY };
    listenerContext.current.lastDrag = currentDrag;

    if (getModifierState(Key.Spacebar)) {
      $window.on('mousemove', onMouseDownPanning);
      $window.on('mouseup', () => {
        $window.off('mousemove', onMouseDownPanning);
      });
    }

    $window.on('mouseup', onMouseUp);
  };

  $window.on('mousedown', onMouseDown);
  $window.on('mousemove', onMouseMovePreview);

  return () => {
    $window.off('mousedown', onMouseDown);
    $window.off('mousemove', onMouseMovePreview);
    $window.off('mouseup', onMouseUp);
  };
};

const usePreview = () => {
  const { onRef: setRef, context, canvas } = useCanvas2DContext();
  const { changePosition } = useArtboardActions();
  const sprite = useSprite();
  const artboard = useArtboard();
  const listenerContextRef = React.useRef<ListenerContext>({
    context,
    canvas,
    sprite,
    artboard,
    changePosition,
  });

  listenerContextRef.current = {
    context,
    canvas,
    sprite,
    artboard,
    changePosition,
  };

  React.useEffect(() => {
    if (!canvas) {
      return;
    }

    addEventListener(listenerContextRef);
  }, [canvas]);

  return {
    setRef,
  };
};

const Preview: React.FC<PropTypes> = (props) => {
  const { width, height, style } = props;
  const { setRef } = usePreview();
  return (
    <CanvasLayer
      style={style}
      onContextMenu={preventDefault}
      ref={setRef}
      width={width}
      height={height}
    />
  );
};

export default Preview;
