import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import BoxColor from '../BoxColor';
import { useArtboardActions, useArtboard } from '../../contexts/Artboard';
import { Color, isEqual } from '../../utils/Color';

interface SelectMarksPropTypes {
  isSelectedAsPrimary: boolean;
  isSelectedAsSecondary: boolean;
}

const primaryDecorationSize = 8;
const secondaryDecorationSize = 5;
const boderSize = 1;

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

const getSecondaryDecoration = (isSelected: boolean) =>
  isSelected &&
  css`
    &::before {
      content: '';
      position: absolute;
      border: ${secondaryDecorationSize}px solid transparent;
      border-left-color: white;
      transform: rotate(45deg);
      right: ${-secondaryDecorationSize}px;
      bottom: ${-secondaryDecorationSize}px;
    }
  `;

const getDecoration = ({
  isSelectedAsPrimary,
  isSelectedAsSecondary,
}: SelectMarksPropTypes) => css`
  ${getPrimaryDecoration(isSelectedAsPrimary)}
  ${getSecondaryDecoration(isSelectedAsSecondary)}
`;

const Container = styled.div`
  font-size: 0;
  position: relative;
  overflow: hidden;
  outline: ${boderSize}px solid black;
  &:hover {
    transform: scale(1.1);
    z-index: 1;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    transform-origin: 50%;
  }
`;

const SelectMarks = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  ${getDecoration};
`;

interface PropTypes {
  val: Color;
}

const PaletteColor: React.FC<PropTypes> = (props) => {
  const { changePrimaryColor, changeSecondaryColor } = useArtboardActions();
  const { primaryColor, secondaryColor } = useArtboard();
  const { val } = props;

  return (
    <Container>
      <BoxColor
        size="100%"
        val={val}
        onClick={() => changePrimaryColor(val)}
        onContextMenu={(event) => {
          event.preventDefault();
          changeSecondaryColor(val);
        }}
      />
      <SelectMarks
        isSelectedAsPrimary={isEqual(primaryColor, val)}
        isSelectedAsSecondary={isEqual(secondaryColor, val)}
      />
    </Container>
  );
};

export default PaletteColor;
