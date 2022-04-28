import { css } from '@emotion/core';
import styled from '@emotion/styled';

const colorSize = 30;

interface FloatBoxPropsType {
  top: number;
  left: number;
}

const getPosition = ({ top, left }: FloatBoxPropsType) => css`
  top: ${top}px;
  left: ${left}px;
`;

const FloatBox = styled.div`
  display: inline-block;
  position: absolute;
  padding: 2px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.5);
  ${getPosition}
`;

const Colors = styled.div`
  position: relative;
  margin: 6px;
  width: ${colorSize * 1.5}px;
  height: ${colorSize * 1.5}px;
`;

const colorCommon = css`
  position: absolute;
  overflow: hidden;
  width: ${colorSize}px;
  height: ${colorSize}px;

  & button {
    position: absolute;
  }
`;

const SecondaryColor = styled.div`
  right: 0;
  bottom: 0;
  ${colorCommon}
`;
const PrimaryColor = styled.div`
  left: 0;
  top: 0;
  ${colorCommon}
`;

export { colorSize, Colors, SecondaryColor, PrimaryColor, FloatBox };
