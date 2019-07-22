import React, { useState } from 'react';

import { paintPreview } from '../utils/paint';
import { clean } from '../utils';
import { manageEvents as $ } from '../utils/dom/events';
import { calculatePosition, validCord } from '../utils/canvas';
import { useArtboard, Artboard } from '../contexts/Artboard';
import { getModifierState, Key } from '../utils/keyboard';
import { Canvas2DContext } from './useCanvas';
import { Sprite } from 'src/contexts/Sprite';

const usePaintPreview = (
  preview: Canvas2DContext,
  artboard: Artboard,
  sprite: Sprite,
) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { primaryColor } = useArtboard();
  const isSpacebarDown = getModifierState(Key.Spacebar);

  React.useEffect(() => {
    if (!preview.canvas) {
      return;
    }

    const $preview = $(preview.canvas);

    if (isMouseDown) {
      const onMouseUp = () => {
        setIsMouseDown(false);
      };

      $preview.on('mouseup', onMouseUp);

      return () => $preview.off('mouseup', onMouseUp);
    }

    const onMouseDown = () => {
      setIsMouseDown(true);
    };

    $preview.on('mousedown', onMouseDown);

    return () => $preview.off('mousedown', onMouseDown);
  }, [preview.canvas, isMouseDown]);

  React.useEffect(() => {
    if (!preview.canvas) {
      return;
    }

    const $preview = $(preview.canvas);

    if (isMouseDown) {
      if (isSpacebarDown) {
        const onMousePaning = () => {
          event.preventDefault();
          clean(preview.canvas);
          console.log('paning');
        };

        $preview.on('mousemove', onMousePaning);

        return () => $preview.off('mousemove', onMousePaning);
      }

      const onMousePainting = () => {
        event.preventDefault();
        console.log('paintinf');
      };

      $preview.on('mousemove', onMousePainting);

      return () => $preview.off('mousemove', onMousePainting);
    }

    const onMousePreview = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      event.preventDefault();
      clean(preview.canvas);
      const cord = calculatePosition(artboard, clientX, clientY);

      if (validCord(sprite, cord)) {
        paintPreview(cord, preview.context, artboard);
      } else {
        clean(preview.canvas);
      }
    };

    $preview.on('mousemove', onMousePreview);

    return () => $preview.off('mousemove', onMousePreview);
  }, [
    isSpacebarDown,
    preview.canvas,
    isMouseDown,
    primaryColor,
    sprite,
    preview.context,
    artboard,
  ]);
};

export default usePaintPreview;
