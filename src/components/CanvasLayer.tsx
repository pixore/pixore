import React from 'react';
import styled from '@emotion/styled';
import { preventDefault } from '../utils';

const Canvas = styled.canvas`
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

interface PropTypes {
  width: number;
  height: number;
  style: React.CSSProperties;
}

const CanvasLayer: React.FC<PropTypes> = (props, ref) => (
  <Canvas ref={ref} onContextMenu={preventDefault} {...props} />
);

export default React.forwardRef(CanvasLayer);
