import React from 'react';

import { useCanvas2DContext } from '../../hooks/useCanvas';
import CanvasLayer from '../CanvasLayer';
import { useSprite } from '../../contexts/Sprite';
import { useArtboard } from '../../contexts/Artboard';

interface PropTypes {
  width: number;
  height: number;
  style: React.CSSProperties;
}

const Background: React.FC<PropTypes> = (props) => {
  const sprite = useSprite();
  const artboard = useArtboard();
  const { onRef: setRef, context } = useCanvas2DContext();

  React.useEffect(() => {
    if (context) {
      let width = sprite.width * artboard.scale;
      let height = sprite.height * artboard.scale;
      context.fillStyle = '#494949';
      context.fillRect(0, 0, context.canvas.width, context.canvas.width);
      context.clearRect(artboard.x, artboard.y, width, height);
    }
  }, [context, sprite, artboard]);

  return <CanvasLayer ref={setRef} {...props} />;
};

export default Background;
