import React from 'react';

import { useCanvas2DContext } from '../../hooks/useCanvas';
import CanvasLayer from '../CanvasLayer';
import { useSprite } from '../../contexts/Sprite';
import { useArtboard } from '../../contexts/Artboard';
import { clean, round2 } from '../../utils';

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
    if (!context) {
      return;
    }
    const { scale } = artboard;
    let width = sprite.width * scale;
    let height = sprite.height * scale;
    clean(context.canvas);
    context.fillStyle = '#494949';
    context.fillRect(0, 0, context.canvas.width, context.canvas.width);
    context.clearRect(artboard.x, artboard.y, width, height);

    // for (let x = 0; x < sprite.width; x++) {
    //   const realX = round2(artboard.x + x * scale);

    //   context.moveTo(realX, artboard.y);
    //   context.lineTo(realX, artboard.y + height);
    // }

    // for (let y = 0; y < sprite.height; y++) {
    //   const realY = round2(artboard.y + y * scale);

    //   context.moveTo(artboard.x, realY);
    //   context.lineTo(artboard.x + width, realY);
    // }

    // context.strokeStyle = 'red';
    // context.stroke();
  }, [context, sprite, artboard]);

  return <CanvasLayer ref={setRef} {...props} />;
};

export default Background;
