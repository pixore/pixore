/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import { getTransparentPattern, clean } from '../utils';
import { Sprite, useSprite } from '../contexts/SpritesContext';
import {
  useArtboard,
  Artboard,
  useArtboardsActions,
} from '../contexts/Artboards';

const base = css`
  cursor: crosshair;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: -o-crisp-edges;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
  position: absolute;
  top: 0;
  left: 0;
`;

const mask = css`
  ${base}
  pointer-events: none;
`;

const useCanvas2DContext = () => {
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
  const [context, setContext] = React.useState<CanvasRenderingContext2D>();

  const onRef = React.useCallback((ref) => {
    setCanvas(ref);

    const context = ref.getContext('2d');
    setContext(context);
  }, []);

  return { context, onRef, canvas };
};

export const paintBackground = (
  context: CanvasRenderingContext2D,
  artboard: Artboard,
  sprite: Sprite,
) => {
  const pattern = context.createPattern(getTransparentPattern(), 'repeat');
  clean(context.canvas);
  context.fillStyle = pattern;
  context.fillRect(
    artboard.x,
    artboard.y,
    sprite.width * artboard.scale,
    sprite.height * artboard.scale,
  );
};

let out;
const Canvas: React.FC = () => {
  const sprite = useSprite();
  const [stats, setStats] = React.useState<ClientRect>();
  const artboard = useArtboard(sprite.id);
  const { center, changeScale } = useArtboardsActions();
  const elementRef = React.useRef<HTMLDivElement>();
  const { onRef: backgroundRef, context: background } = useCanvas2DContext();
  const { onRef: mainRef } = useCanvas2DContext();
  const { onRef: previewRef } = useCanvas2DContext();
  const { onRef: maskRef } = useCanvas2DContext();
  const { current: element } = elementRef;
  const { innerWidth: width, innerHeight: height } = window;
  const { id } = sprite;

  React.useEffect(() => {
    if (background && sprite && artboard) {
      console.log(artboard);

      paintBackground(background, artboard, sprite);
    }
  }, [background, sprite, artboard]);

  React.useEffect(() => {
    if (element) {
      const { current: element } = elementRef;
      const stats = element.getBoundingClientRect();
      center(stats, sprite);
      setStats(stats);
    }
  }, [element]);

  const style: React.CSSProperties = {
    width,
    height,
  };

  if (stats) {
    style.marginTop = -stats.top;
    style.marginLeft = -stats.left;
  }

  return (
    <div
      ref={elementRef}
      style={style}
      onWheel={(event) => {
        const deltaY = event.deltaY;
        if (out) {
          return;
        }
        out = setTimeout(() => {
          let diff = 1.06;
          let method = 'floor';
          out = undefined;
          if (deltaY > 0) {
            diff = 0.9;
            method = 'floor';
          } else if (deltaY < 0) {
            diff = 1.1;
            method = 'ceil';
          }
          changeScale(id, Math[method](artboard.scale * diff));
        }, 40);
      }}
    >
      <canvas
        width={width}
        height={height}
        ref={backgroundRef}
        style={style}
        css={base}
      />
      <canvas
        width={width}
        height={height}
        ref={mainRef}
        style={style}
        css={base}
      />
      <canvas
        width={width}
        height={height}
        ref={previewRef}
        style={style}
        css={base}
      />
      <canvas
        width={width}
        height={height}
        ref={maskRef}
        style={style}
        css={mask}
      />
    </div>
  );
};

export default Canvas;
