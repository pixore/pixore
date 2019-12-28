import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Color from '../Color';
import { useArtboardActions, useArtboard } from '../../contexts/Artboard';

interface ButtonPropTypes {
  size: number;
  isHover: boolean;
  isSelectedAsPrimary: boolean;
  isSelectedAsSecondary: boolean;
}

const primaryDecorationSize = 10;
const secondaryDecorationSize = 7;

const getSize = ({ size }: ButtonPropTypes) => `${size}px`;

const getPrimaryDecoration = (isSelected: boolean) =>
  isSelected &&
  css`
    &::after {
      content: '';
      position: absolute;
      border: ${primaryDecorationSize}px solid transparent;
      border-right-color: white;
      transform: rotate(45deg);
      left: ${-primaryDecorationSize}px;
      top: ${-primaryDecorationSize}px;
    }
  `;

const getSecondaryDecoration = (isSelected: boolean, size: number) =>
  isSelected &&
  css`
    &::before {
      content: '';
      position: absolute;
      border: ${secondaryDecorationSize}px solid transparent;
      border-left-color: white;
      transform: rotate(45deg);
      left: ${size - secondaryDecorationSize - 1}px;
      top: ${size - secondaryDecorationSize - 1}px;
      z-index: 1; /* so it over the color */
    }
  `;

const getDecoration = ({
  isSelectedAsPrimary,
  isSelectedAsSecondary,
  size,
}: ButtonPropTypes) => css`
  ${getPrimaryDecoration(isSelectedAsPrimary)}
  ${getSecondaryDecoration(isSelectedAsSecondary, size)}
`;
const getTransform = ({ isHover }: ButtonPropTypes) =>
  isHover &&
  css`
    transform: scale(1.1);
    z-index: 2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    transform-origin: 50%;
  `;

const Container = styled.div`
  font-size: 0;
  display: inline-block;
  height: ${getSize};
  width: ${getSize};
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
  border: 0px;
  outline: 1px solid black;
  ${getTransform};
  ${getDecoration};
`;

interface PropTypes {
  value: string;
  size?: number;
}

const PaletteColor: React.FC<PropTypes> = (props) => {
  const { changePrimaryColor, changeSecondaryColor } = useArtboardActions();
  const { primaryColor, secondaryColor } = useArtboard();
  const [isHover, setIsHover] = React.useState(false);
  const { value, size = 30 } = props;

  return (
    <Container
      isSelectedAsPrimary={primaryColor === value}
      isSelectedAsSecondary={secondaryColor === value}
      isHover={isHover}
      size={size}
    >
      <Color
        size={size}
        value={value}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => changePrimaryColor(value)}
        onContextMenu={(event) => {
          event.preventDefault();
          changeSecondaryColor(value);
        }}
      />
    </Container>
  );
};

export default PaletteColor;
