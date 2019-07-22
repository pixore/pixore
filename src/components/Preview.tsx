import React from 'react';
import CanvasLayer from './CanvasLayer';
import { useCanvas2DContext } from '../hooks/useCanvas';
import { useArtboard } from '../contexts/Artboard';
import { paintPreview } from '../utils/paint';
import { clean } from '../utils';
import { useSprite } from '../contexts/Sprite';
import { calculatePosition, validCord } from '../utils/canvas';

const noop = () => {
  console.log('noop');
};
interface PropTypes {
  width: number;
  height: number;
  style: React.CSSProperties;
}

const useMouseMove = (isMouseDown, canvas, context) => {
  const artboard = useArtboard();
  const sprite = useSprite();

  if (!context) {
    return noop;
  }

  if (isMouseDown) {
    const onMouseMove = () => {
      console.log('paiting');
    };

    return onMouseMove;
  }

  const onMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    event.preventDefault();
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

  const onMouseDown = () => {
    setIsMouseDown(true);
  };
  const onMouseUp = () => {
    setIsMouseDown(false);
  };

  const onMouseMove = useMouseMove(isMouseDown, canvas, context);

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
      ref={setRef}
      width={width}
      height={height}
    />
  );
};

export default Preview;
