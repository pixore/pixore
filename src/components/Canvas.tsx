/** @jsx jsx */
import React, { Fragment } from 'react';
import { css } from '@emotion/core';

const base = css`
  cursor: crosshair;
  image-rendering: optimizeSpeed;
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

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { width, height } = props;
  const style = {
    width,
    height,
  };

  return (
    <Fragment>
      <canvas style={style} css={base} />
      <canvas style={style} css={base} />
      <canvas style={style} css={base} />
      <canvas style={style} css={mask} />
    </Fragment>
  );
};

export default Canvas;
