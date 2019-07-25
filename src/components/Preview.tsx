import React from 'react';
import CanvasLayer from './CanvasLayer';
import { useCanvas2DContext } from '../hooks/useCanvas';
import { useArtboard, useArtboardActions } from '../contexts/Artboard';
import { paintPreview } from '../utils/paint';
import { clean } from '../utils';
import { useSprite } from '../contexts/Sprite';
import { calculatePosition, validCord } from '../utils/canvas';
import { useModifier, Key } from '../contexts/Modifiers';

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

const useMouseMove = (
  isMouseDown: boolean,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  lastDragRef: React.MutableRefObject<Vector>,
) => {
  const isPanning = useModifier(Key.Spacebar);
  const artboard = useArtboard();
  const { changePosition } = useArtboardActions();
  const sprite = useSprite();

  if (!context) {
    return noop;
  }

  if (isPanning && isMouseDown) {
    const onMouseMove = (event: React.MouseEvent) => {
      event.preventDefault();
      const { clientX, clientY } = event;
      const currentDrag = { x: clientX, y: clientY };
      // const cord = calculatePosition(artboard, clientX, clientY);
      clean(canvas);
      const dragDiff = lastDragRef.current
        ? getDiff(currentDrag, lastDragRef.current)
        : { x: 0, y: 0 };

      changePosition({
        x: artboard.x + dragDiff.x,
        y: artboard.y + dragDiff.y,
        scale: artboard.scale,
      });
      lastDragRef.current = currentDrag;
    };

    return onMouseMove;
  }

  if (isMouseDown) {
    const onMouseMove = () => {
      console.log('paiting');
    };

    return onMouseMove;
  }

  const onMouseMove = (event: React.MouseEvent) => {
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

  return onMouseMove;
};

const usePreview = () => {
  const { onRef: setRef, context, canvas } = useCanvas2DContext();
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const lastDragRef = React.useRef<Vector>();

  const onMouseDown = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const currentDrag = { x: clientX, y: clientY };
    setIsMouseDown(true);
    lastDragRef.current = currentDrag;
  };
  const onMouseUp = () => {
    setIsMouseDown(false);
    lastDragRef.current = null;
  };

  const onMouseMove = useMouseMove(isMouseDown, canvas, context, lastDragRef);

  return {
    setRef,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
};

const Preview: React.FC<PropTypes> = (props) => {
  const { width, height, style } = props;
  const { setRef, onMouseDown, onMouseMove, onMouseUp } = usePreview();
  return (
    <CanvasLayer
      style={style}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onContextMenu={preventDefault}
      ref={setRef}
      width={width}
      height={height}
    />
  );
};

export default Preview;
