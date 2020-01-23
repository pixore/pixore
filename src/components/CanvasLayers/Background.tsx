import React from 'react';
import { useCanvas2DContext } from '../../hooks/useCanvas';
import CanvasLayer from '../CanvasLayer';
import { clean, getTransparentPattern } from '../../utils';
import { useSprite } from '../../contexts/Sprite';
import { useArtboard } from '../../contexts/Artboard';

interface PropTypes {
  width: number;
  height: number;
  scale: number;
  y: number;
  x: number;
}

const Background: React.FC<PropTypes> = (props) => {
  const { scale, x, y, width, height } = props;
  const sprite = useSprite();
  const artboard = useArtboard();
  const { onRef: setRef, context } = useCanvas2DContext();

  React.useEffect(() => {
    if (context) {
      const pattern = context.createPattern(getTransparentPattern(), 'repeat');
      clean(context);
      context.fillStyle = pattern;
      context.fillRect(x, y, sprite.width * scale, sprite.height * scale);
    }
  }, [context, sprite, artboard, scale, y, x, width, height]);

  return <CanvasLayer ref={setRef} width={width} height={height} />;
};

export default Background;
