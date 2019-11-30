import React from 'react';

import { useCanvas2DContext } from '../../hooks/useCanvas';
import CanvasLayer from '../CanvasLayer';
import { clean, imageSmoothingDisabled } from '../../utils';
import { getContext } from '../../utils/contexts';
import { useSprite } from '../../contexts/Sprite';
import { useArtboard } from '../../contexts/Artboard';

interface PropTypes {
  width: number;
  height: number;
  layers: string[];
  scale: number;
  x: number;
  y: number;
}

const FrameLayers: React.FC<PropTypes> = (props, ref) => {
  const sprite = useSprite();
  const artboard = useArtboard();
  const { onRef: setRef, context, canvas } = useCanvas2DContext();
  const { layers, scale, y, x, width, height } = props;

  React.useEffect(() => {
    if (canvas) {
      ref && ref(canvas);
    }
  }, [canvas, ref]);

  React.useEffect(() => {
    if (context) {
      const { frame } = artboard;
      const width = sprite.width * scale;
      const height = sprite.height * scale;

      clean(context.canvas);
      imageSmoothingDisabled(context);

      layers.reduce<void>((_, layer) => {
        const layerContext = getContext(frame, layer, sprite);
        context.drawImage(
          layerContext.canvas,
          0,
          0,
          sprite.width,
          sprite.height,
          x,
          y,
          width,
          height,
        );
      }, undefined);
    }
  }, [context, sprite, artboard, layers, x, y, scale, width, height]);

  return <CanvasLayer ref={setRef} width={width} height={height} />;
};

export default React.forwardRef(FrameLayers);
