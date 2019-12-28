import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { isTransparent, getStringTransparentPattern } from '../utils';

interface ButtonPropTypes {
  size: number;
  value: string;
}

const getSize = ({ size }: ButtonPropTypes) => `${size}px`;
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

const Button = styled.button`
  font-size: 0;
  display: inline-block;
  height: ${getSize};
  width: ${getSize};
  position: relative;
  margin: 0;
  padding: 0;
  border: 0px;
  outline: 1px solid black;
  ${getBackground};
`;

type PropTypes = {
  value: string;
  size?: number;
} & React.HTMLProps<HTMLButtonElement>;

const Color: React.FC<PropTypes> = (props) => {
  const { value, size = 30 } = props;

  return (
    <Button {...props} size={size} type="button">
      color {value}
    </Button>
  );
};

export default Color;
