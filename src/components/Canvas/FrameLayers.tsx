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
  style: React.CSSProperties;
  layers: string[];
}

const FrameLayers: React.FC<PropTypes> = (props, ref) => {
  const sprite = useSprite();
  const artboard = useArtboard();
  const { onRef: setRef, context, canvas } = useCanvas2DContext();
  const { layers } = props;

  React.useEffect(() => {
    if (canvas) {
      ref && ref(canvas);
    }
  }, [canvas, ref]);

  React.useEffect(() => {
    if (context) {
      const { frame } = artboard;
      const width = sprite.width * artboard.scale;
      const height = sprite.height * artboard.scale;

      clean(context.canvas);
      imageSmoothingDisabled(context);

      layers.reduceRight<void>((_, layer) => {
        const layerContext = getContext(frame, layer, sprite);
        context.drawImage(
          layerContext.canvas,
          0,
          0,
          sprite.width,
          sprite.height,
          artboard.x,
          artboard.y,
          width,
          height,
        );
      }, undefined);
    }
  }, [context, sprite, artboard, layers]);

  return <CanvasLayer ref={setRef} {...props} />;
};

export default React.forwardRef(FrameLayers);
