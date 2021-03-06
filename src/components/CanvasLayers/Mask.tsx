import React from 'react';
import styled from '@emotion/styled';
import { useCanvas2DContext } from '../../hooks/useCanvas';
import CanvasLayer from '../CanvasLayer';
import { useSprite } from '../../contexts/Sprite';
import { useArtboard } from '../../contexts/Artboard';
import { clean } from '../../utils';

interface PropTypes {
  width: number;
  height: number;
  scale: number;
  y: number;
  x: number;
  className?: string;
}

const Mask: React.FC<PropTypes> = (props) => {
  const { scale, x, y, width, height, className } = props;
  const sprite = useSprite();
  const artboard = useArtboard();
  const { onRef: setRef, context } = useCanvas2DContext();

  React.useEffect(() => {
    if (!context) {
      return;
    }
    const width = sprite.width * scale;
    const height = sprite.height * scale;
    clean(context);
    context.fillStyle = '#494949';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.clearRect(x, y, width, height);
  }, [context, sprite, artboard, scale, y, x, width, height]);

  return (
    <CanvasLayer
      className={className}
      data-id="mask"
      ref={setRef}
      width={width}
      height={height}
    />
  );
};

export default styled(Mask)`
  pointer-events: none;
`;
