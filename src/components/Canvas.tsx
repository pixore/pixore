/** @jsx jsx */
import React, { Fragment } from 'react';
import { css, jsx } from '@emotion/core';

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

interface CanvasProps {
  width: number;
  height: number;
}

const useCanvas2DContext = (width, height) => {
  const [canvas, setCanvas] = React.useState();
  const [context, setContext] = React.useState();
  const onRef = React.useCallback((ref) => {
    ref.width = width;
    ref.height = height;
    setCanvas(ref);

    const context = ref.getContext('2d');
    setContext(context);
  }, []);

  return { context, onRef, canvas };
};

const Canvas: React.FC<CanvasProps> = (props) => {
  const { width, height } = props;
  const { onRef: backgroundRef } = useCanvas2DContext(width, height);
  const { onRef: mainRef } = useCanvas2DContext(width, height);
  const { onRef: previewRef } = useCanvas2DContext(width, height);
  const { onRef: maskRef } = useCanvas2DContext(width, height);

  const style = {
    width,
    height,
  };

  return (
    <Fragment>
      <canvas ref={backgroundRef} style={style} css={base} />
      <canvas ref={mainRef} style={style} css={base} />
      <canvas ref={previewRef} style={style} css={base} />
      <canvas ref={maskRef} style={style} css={mask} />
    </Fragment>
  );
};

export default Canvas;
