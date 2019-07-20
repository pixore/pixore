/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import { useSprite } from '../contexts/Sprite';
import { useArtboard, useArtboardActions } from '../contexts/Artboard';
import useCanvas from '../hooks/useCanvas';
import usePaintCanvas from '../hooks/usePaintCanvas';

const baseStyles = css`
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

const maskStyles = css`
  ${baseStyles}
  pointer-events: none;
`;

const Canvas: React.FC = () => {
  const sprite = useSprite();
  const [stats, setStats] = React.useState<ClientRect>();
  const artboard = useArtboard();
  const { center, changePosition } = useArtboardActions();
  const elementRef = React.useRef<HTMLDivElement>();
  const { main, background, mask, preview } = useCanvas();
  const { current: element } = elementRef;
  const { innerWidth: width, innerHeight: height } = window;

  usePaintCanvas({
    main,
    background,
    mask,
    preview,
    sprite,
    artboard,
  });

  React.useEffect(() => {
    if (element) {
      const { current: element } = elementRef;
      const stats = element.parentElement.getBoundingClientRect();

      center(stats, sprite);
      setStats(stats);
    }
  }, [element, sprite, center]);

  const style: React.CSSProperties = {
    width,
    height,
  };

  if (stats) {
    style.marginTop = -stats.top;
    style.marginLeft = -stats.left;
  }

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const { y, x } = artboard;
    const deltaY = event.deltaY;
    const scale = artboard.scale - deltaY / 120;

    if (scale < 1) {
      return;
    }

    const diffX = sprite.width * scale - artboard.scale * sprite.width;
    const diffY = sprite.height * scale - artboard.scale * sprite.height;

    changePosition({
      scale,
      y: y - Math.round(diffY / 2),
      x: x - Math.round(diffX / 2),
    });
  };

  return (
    <div ref={elementRef} style={style} onWheel={onWheel}>
      <canvas
        width={width}
        height={height}
        ref={background.onRef}
        style={style}
        css={baseStyles}
      />
      <canvas
        width={width}
        height={height}
        ref={main.onRef}
        style={style}
        css={baseStyles}
      />
      <canvas
        width={width}
        height={height}
        ref={preview.onRef}
        style={style}
        css={baseStyles}
      />
      <canvas
        width={width}
        height={height}
        ref={mask.onRef}
        style={style}
        css={maskStyles}
      />
    </div>
  );
};

export default Canvas;
