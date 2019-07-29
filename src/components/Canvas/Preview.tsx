import React from 'react';
import CanvasLayer from '../CanvasLayer';
import { useCanvas2DContext } from '../../hooks/useCanvas';
import { useArtboard, useArtboardActions } from '../../contexts/Artboard';
import { useSprite } from '../../contexts/Sprite';
import { getTool, ListenerContext } from '../../tools';

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
  const { tool: toolName } = artboard;

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

    const addEventListener = getTool(toolName);

    if (addEventListener) {
      return addEventListener(listenerContextRef);
    }
  }, [canvas, toolName]);

  return {
    setRef,
  };
};

interface PropTypes {
  width: number;
  height: number;
  style: React.CSSProperties;
}

const Preview: React.FC<PropTypes> = (props) => {
  const { setRef } = usePreview();
  return <CanvasLayer ref={setRef} {...props} />;
};

export default Preview;
