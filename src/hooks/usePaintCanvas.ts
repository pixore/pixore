import React from 'react';

import { paintBackground, paintMain, paintMask } from '../utils/paint';

const usePaintCanvas = ({ background, main, mask, sprite, artboard }) => {
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
};

export default usePaintCanvas;
