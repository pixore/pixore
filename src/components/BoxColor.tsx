import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { getStringTransparentPattern } from '../utils';
import Color from '../utils/Color';

type Value = number | string;

export type Size =
  | number
  | string
  | {
      height: Value;
      width: Value;
    };

const parseValue = (value: Value) => {
  return typeof value === 'number' ? `${value}px` : value;
};

interface ButtonPropTypes {
  val: Color;
  size: Size;
}

const getSize = ({ size }: ButtonPropTypes) => {
  if (typeof size === 'object') {
    return css`
      height: ${parseValue(size.height)};
      width: ${parseValue(size.width)};
    `;
  }

  return css`
    height: ${parseValue(size)};
    width: ${parseValue(size)};
  `;
};

const getBackground = ({ val }: ButtonPropTypes) => {
  if (Color.isTransparent(val)) {
    const transparent = getStringTransparentPattern();
    return css`
      background-size: 30px;
      background-image: url(${transparent});
    `;
  }

  return css`
    background: ${Color.toString(val)};
  `;
};

const Button = styled.button<ButtonPropTypes>`
  font-size: 0;
  display: inline-block;
  position: relative;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  ${getBackground};
  ${getSize}
`;

type PropTypes = {
  val: Color;
  size?: Size;
} & Omit<React.HTMLProps<HTMLButtonElement>, 'size'>;

const BoxColor: React.FC<PropTypes> = (props) => {
  const { val, size = 30 } = props;
  return (
    <Button {...props} size={size} type="button">
      color {Color.toString(val)}
    </Button>
  );
};

export { getSize };
export default BoxColor;
