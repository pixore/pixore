import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/core';
import { getStringTransparentPattern } from '../utils';
import { Color, toString } from './Color';

let transparentBackground: SerializedStyles;

const getTransparentBackground = () => {
  if (transparentBackground || typeof document === 'undefined') {
    return transparentBackground;
  }

  const transparent = getStringTransparentPattern();
  return css`
    background-image: url(${transparent});
  `;
};

interface GetBackgroundColorArgs {
  val: Color;
}

const getBackgroundColor = <T extends GetBackgroundColorArgs>({ val }: T) => {
  return css`
    background: ${toString(val)};
  `;
};

const ColoredDiv = styled.div`
  position: relative;
  background-size: 30px;
  ${getTransparentBackground()}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${getBackgroundColor}
  }
`;

export {
  getTransparentBackground,
  transparentBackground,
  ColoredDiv,
  getBackgroundColor,
};
