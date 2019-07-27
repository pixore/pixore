import React from 'react';
import CanvasLayer from './CanvasLayer';
import { useCanvas2DContext } from '../hooks/useCanvas';
import { useArtboard, useArtboardActions } from '../contexts/Artboard';
import { useSprite } from '../contexts/Sprite';
import { addEventListener, ListenerContext } from '../tools';

const preventDefault = (event: React.MouseEvent) => event.preventDefault();

interface PropTypes {
  width: number;
  height: number;
  style: React.CSSProperties;
}

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
