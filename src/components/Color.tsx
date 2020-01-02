import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { isTransparent, getStringTransparentPattern } from '../utils';

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
  value: string;
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

const getBackground = ({ value }: ButtonPropTypes) => {
  if (isTransparent(value)) {
    const transparent = getStringTransparentPattern();
    return css`
      background-size: 30px;
      background-image: url(${transparent});
    `;
  }

  return css`
    background: ${value};
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
  value: string;
  size?: Size;
} & Omit<React.HTMLProps<HTMLButtonElement>, 'size'>;

const Color: React.FC<PropTypes> = (props) => {
  const { value, size = 30 } = props;

  return (
    <Button {...props} size={size} type="button">
      color {value}
    </Button>
  );
};

export { getSize };
export default Color;
