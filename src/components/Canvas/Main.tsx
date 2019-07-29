import React from 'react';
import CanvasLayer from '../CanvasLayer';
import { useCanvas2DContext } from '../../hooks/useCanvas';
import { useSprite } from '../../contexts/Sprite';
import { useArtboard } from '../../contexts/Artboard';
import { PaintFunction } from '../../utils/paint';
import { imageSmoothingDisabled, clean, getContext } from '../../utils';

interface PropTypes {
  width: number;
  height: number;
  style: React.CSSProperties;
}

const paintMain: PaintFunction = (context, sprite, artboard) => {
  const { frame } = artboard;
  const { layers } = sprite;
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
};

const useMain = () => {
  const sprite = useSprite();
  const artboard = useArtboard();
  const { onRef: setRef, context } = useCanvas2DContext();

  React.useEffect(() => {
    if (context) {
      paintMain(context, sprite, artboard);
    }
  }, [context, sprite, artboard]);

  return {
    setRef,
  };
};

const Main: React.FC<PropTypes> = (props) => {
  const { setRef } = useMain();
  return <CanvasLayer ref={setRef} {...props} />;
};

export default Main;
