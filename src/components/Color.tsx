import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { useArtboardActions, useArtboard } from '../contexts/Artboard';
import { isTransparent } from '../utils';

interface ButtonPropTypes {
  size: number;
  value: string;
  isHover: boolean;
  isSelected: boolean;
}

const getSize = ({ size }: ButtonPropTypes) => `${size}px`;
const getBackground = ({ value }: ButtonPropTypes) => {
  if (isTransparent(value)) {
    return 'linear-gradient(135deg, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%);';
  }

  return value;
};

const getDecoration = ({ isSelected, size }: ButtonPropTypes) =>
  isSelected
    ? css`
        &::after {
          content: '';
          position: absolute;
          border: 15px solid transparent;
          border-left-color: white;
          transform: rotate(45deg);
          left: ${size / 2};
          top: ${size / 2};
        }
      `
    : '';
const getTransform = ({ isHover }: ButtonPropTypes) =>
  isHover
    ? css`
        transform: scale(1.1);
        z-index: 2;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
        transform-origin: 50%;
      `
    : '';

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
  background: ${getBackground};
  ${getTransform};
  ${getDecoration};
`;

interface PropTypes {
  value: string;
  size?: number;
}

const Color: React.FC<PropTypes> = (props) => {
  const { changePrimaryColor, changeSecondaryColor } = useArtboardActions();
  const { primaryColor } = useArtboard();
  const [isHover, setIsHover] = React.useState(false);
  const { value, size = 30 } = props;

  return (
    <Button
      size={size}
      value={value}
      isSelected={primaryColor === value}
      isHover={isHover}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => changePrimaryColor(value)}
      onContextMenu={(event) => {
        event.preventDefault();
        changeSecondaryColor(value);
      }}
    >
      color {value}
    </Button>
  );
};

export default Color;
