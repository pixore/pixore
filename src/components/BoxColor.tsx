import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Color, toString } from '../utils/Color';
import { getTransparentBackground, getBackgroundColor } from '../utils/css';

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

const Button = styled.button<ButtonPropTypes>`
  font-size: 0;
  display: inline-block;
  position: relative;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background-size: 30px;
  ${getTransparentBackground()}
  ${getSize}

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

type PropTypes = {
  val: Color;
  size?: Size;
} & Omit<React.HTMLProps<HTMLButtonElement>, 'size'>;

const BoxColor: React.FC<PropTypes> = (props) => {
  const { val, size = 30 } = props;
  return (
    <Button {...props} size={size} type="button">
      color {toString(val)}
    </Button>
  );
};

export { getSize };
export default BoxColor;
