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
}

const Background: React.FC<PropTypes> = (props) => {
  const sprite = useSprite();
  const artboard = useArtboard();
  const { onRef: setRef, context } = useCanvas2DContext();

  React.useEffect(() => {
    if (context) {
      const pattern = context.createPattern(getTransparentPattern(), 'repeat');
      clean(context.canvas);
      context.fillStyle = pattern;
      context.fillRect(
        artboard.x,
        artboard.y,
        sprite.width * artboard.scale,
        sprite.height * artboard.scale,
      );
    }
  }, [context, sprite, artboard]);

  return <CanvasLayer ref={setRef} {...props} />;
};

export default Background;
