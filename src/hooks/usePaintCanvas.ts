import React from 'react';
import { Canvas2DContext } from './useCanvas';
import { paintBackground, paintMask } from '../utils/paint';
import { Sprite } from '../types';
import { Artboard } from '../contexts/Artboard';

type UsePaintCanvas = ({
  background,
  mask,
  sprite,
  artboard,
}: {
  background: Canvas2DContext;
  mask: Canvas2DContext;
  sprite: Sprite;
  artboard: Artboard;
}) => void;

const usePaintCanvas: UsePaintCanvas = ({
  background,
  mask,
  sprite,
  artboard,
}) => {
  React.useEffect(() => {
    if (background.context) {
      paintBackground(background.context, sprite, artboard);
    }
  }, [background.context, sprite, artboard]);

  React.useEffect(() => {
    if (mask.context) {
      paintMask(mask.context, sprite, artboard);
    }
  }, [mask.context, sprite, artboard]);
};

export default usePaintCanvas;
