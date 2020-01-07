import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Color, toString } from '../../../utils/Color';
import {
  getTransparentBackground,
  getBackgroundColor,
} from '../../../utils/css';

const pickerSize = 20;
const margin = 10;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ValuesContainer = styled.div`
  flex: 4;
  margin: ${margin}px;
  margin-left: 0;
  display: flex;
  flex-direction: column;
`;

const RoundPicker = styled.div`
  position: absolute;
  border-radius: 50%;
  height: 8px;
  width: 8px;
  border: 2px solid white;
  box-shadow: 0 0 3px black;
  transform: translate(-5px, -5px);
  pointer-events: none;
`;

const barPicker = css`
  position: absolute;
  border-radius: 3px;
  border: 2px solid white;
  box-shadow: 0 0 3px black;
  pointer-events: none;
`;

const HueBarPicker = styled.div`
  ${barPicker}
  height: 8px;
  width: 100%;
  transform: scaleX(1.2) translate(0, -5px);
`;

const AlphaBarPicker = styled.div`
  ${barPicker}
  width: 8px;
  height: 100%;
  transform: scaleX(1.2) translate(-5px, 0);
`;

const ColorsContainer = styled.div`
  height: 50px;
  display: flex;
`;

const TopContainer = styled.div`
  flex: 1;
  display: flex;
`;

const BottomContainer = styled.div`
  height: 30px;
  text-align: center;
`;

const PickersContainer = styled.div`
  flex: 4;
  margin: ${margin}px;
  display: flex;
  flex-direction: column;
`;

const HSVPicker = styled.div`
  flex: 8;
  display: flex;
`;

const colorsCss = css`
  position: relative;
  flex: 1;
  background-size: 30px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const CurrentColor = styled.div`
  margin-right: ${margin / 2}px;
  ${colorsCss}
  ${getTransparentBackground()}

  &::before {
    ${getBackgroundColor}
  }
`;

const NewColor = styled.div`
  margin-left: ${margin / 2}px;
  ${getTransparentBackground()}
  ${colorsCss}

  &::before {
    ${getBackgroundColor}
  }
`;

const HuePicker = styled.div`
  width: ${pickerSize}px;
  position: relative;
  margin-bottom: ${margin}px;
  background: linear-gradient(
    to top,
    red 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    red 100%
  );
`;

interface AlphaPickerProps {
  val: Color;
}

const getAlphaColor = ({ val }: AlphaPickerProps) => {
  return css`
    background: linear-gradient(to left, ${toString(val)}, transparent);
  `;
};

const AlphaPicker = styled.div`
  height: ${pickerSize}px;
  position: relative;
  margin-right: ${pickerSize + margin}px;
  ${getTransparentBackground}
  background-size: 30px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${getAlphaColor}
  }
`;

const SaturationAndValuePicker = styled.div`
  background: white;
  position: relative;
  flex: 7;
  margin-bottom: ${margin}px;
  margin-right: ${margin}px;
`;

const layerCommonStyled = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BlackToTransparentLayer = styled.div`
  ${layerCommonStyled}
  background: linear-gradient(to bottom, transparent 0%, black 100%);
`;

const WhiteToTransparentLayer = styled.div`
  ${layerCommonStyled}
  background: linear-gradient(to right, white 0%, transparent 100%);
`;

interface LayerProps {
  color: string;
}

const getColor = ({ color }: LayerProps) => color;

const ColorLayer = styled.div`
  ${layerCommonStyled}
  background: ${getColor};
`;

const ColorRepresentations = styled.div`
  flex: 1;
  margin-top: 10px;
`;

export {
  NewColor,
  Container,
  HuePicker,
  HueBarPicker,
  AlphaBarPicker,
  HSVPicker,
  ColorLayer,
  RoundPicker,
  AlphaPicker,
  TopContainer,
  CurrentColor,
  ValuesContainer,
  ColorsContainer,
  BottomContainer,
  PickersContainer,
  ColorRepresentations,
  SaturationAndValuePicker,
  BlackToTransparentLayer,
  WhiteToTransparentLayer,
};
