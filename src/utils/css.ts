import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/core';
import { Color, toString } from './Color';

let transparentBackground: SerializedStyles;

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
  background-image: url('/transparent.png');

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

export { transparentBackground, ColoredDiv, getBackgroundColor };
