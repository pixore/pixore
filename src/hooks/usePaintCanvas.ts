import React from 'react';
import { Canvas2DContext } from './useCanvas';
import {
  paintBackground,
  paintMain,
  paintMask,
  paintPreview,
} from '../utils/paint';
import { clean } from '../utils';
import { Sprite } from 'src/contexts/Sprite';
import { Artboard } from '../contexts/Artboard';
import { manageEvents as $ } from '../utils/dom/events';
import { calculatePosition, validCord } from '../utils/canvas';
import { useArtboard } from '../contexts/Artboard';

type UsePaintCanvas = ({
  background,
  main,
  mask,
  preview,
  sprite,
  artboard,
}: {
  background: Canvas2DContext;
  main: Canvas2DContext;
  mask: Canvas2DContext;
  preview: Canvas2DContext;
  sprite: Sprite;
  artboard: Artboard;
}) => void;

const usePaintCanvas: UsePaintCanvas = ({
  background,
  main,
  mask,
  preview,
  sprite,
  artboard,
}) => {
  const { primaryColor } = useArtboard();
  React.useEffect(() => {
    if (background.context) {
      paintBackground(background.context, sprite, artboard);
    }
  }, [background.context, sprite, artboard]);

  React.useEffect(() => {
    if (main.context) {
      paintMain(main.context, sprite, artboard);
    }
  }, [main.context, sprite, artboard]);

  React.useEffect(() => {
    if (mask.context) {
      paintMask(mask.context, sprite, artboard);
    }
  }, [mask.context, sprite, artboard]);

  React.useEffect(() => {
    if (preview.canvas) {
      $(preview.canvas)
        .on(
          'mousedown',
          () => {
            console.log('mousedown');
          },
          'preview',
        )
        // this will get removed by the mousedown event
        // and added back again by the mouseup event
        .on(
          'mousemove',
          (event: MouseEvent) => {
            const { clientX, clientY } = event;
            event.preventDefault();
            clean(preview.canvas);
            const cord = calculatePosition(artboard, clientX, clientY);

            if (validCord(sprite, cord)) {
              paintPreview(cord, preview.context, artboard, primaryColor);
            } else {
              clean(preview.canvas);
            }
          },
          'preview',
        );

      return () =>
        $(preview.canvas)
          .off('mousedown', { nameSpace: 'preview' })
          .off('mousemove', { nameSpace: 'preview' });
    }
  }, [preview.canvas, artboard, preview.context, sprite]);
};

export default usePaintCanvas;
