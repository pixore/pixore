import React from 'react';

import { useCanvas2DContext } from '../../hooks/useCanvas';
import CanvasLayer from '../CanvasLayer';
import { clean, getTransparentPattern } from '../../utils';
import { useSprite } from '../../contexts/Sprite';
import { useArtboard } from '../../contexts/Artboard';

interface PropTypes {
  width: number;
  height: number;
  style: React.CSSProperties;
  scale: number;
  y: number;
  x: number;
}

const Background: React.FC<PropTypes> = (props) => {
  const { scale, x, y } = props;
  const sprite = useSprite();
  const artboard = useArtboard();
  const { onRef: setRef, context } = useCanvas2DContext();

  React.useEffect(() => {
    if (context) {
      const pattern = context.createPattern(getTransparentPattern(), 'repeat');
      clean(context.canvas);
      context.fillStyle = pattern;
      context.fillRect(x, y, sprite.width * scale, sprite.height * scale);
    }
  }, [context, sprite, artboard, scale, y, x]);

  return <CanvasLayer ref={setRef} {...props} />;
};

export default Background;
