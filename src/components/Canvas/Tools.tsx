import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import BoxColor from '../BoxColor';
import { useArtboard, useArtboardActions } from '../../contexts/Artboard';
import { useWindowsActions } from '../../contexts/Windows';
import { Windows } from '../../types';
import { useEmitter } from '../Editor';
import { Color } from '../../utils/Color';
import { usePaletteActions } from '../../contexts/Palette';

const Container = styled.div`
  display: inline-block;
  position: absolute;
  top: 4px;
  left: 4px;
  padding: 2px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.5);
`;

const size = 30;

const Colors = styled.div`
  position: relative;
  margin: 6px;
  width: ${size * 1.5}px;
  height: ${size * 1.5}px;
`;

const common = css`
  position: absolute;
  width: ${size}px;
  height: ${size}px;
`;

const SecondaryColor = styled.div`
  right: 0;
  bottom: 0;
  ${common}
`;
const PrimaryColor = styled.div`
  left: 0;
  top: 0;
  ${common}
`;

interface ColorPickerDone {
  color?: Color;
  addToPalette: boolean;
}

type UpdateColorCallback = (color: Color) => void;

const Tools: React.FC = () => {
  const emitter = useEmitter();
  const { addColor } = usePaletteActions();
  const { primaryColor, secondaryColor } = useArtboard();
  const { changePrimaryColor, changeSecondaryColor } = useArtboardActions();
  const { openWindow } = useWindowsActions();
  const [colorPickerId, setColorPickerId] = React.useState();

  const changeColor = (
    event: React.MouseEvent,
    color: Color,
    callback: UpdateColorCallback,
  ) => {
    const { clientX, clientY } = event;
    const id = openWindow(Windows.ColorPicker, {
      state: {
        top: clientY,
        left: clientX,
        height: 350,
        width: 550,
      },
      config: {
        backdrop: true,
      },
      props: {
        color,
      },
    });
    setColorPickerId(id);

    emitter.once(id, ({ color, addToPalette }: ColorPickerDone) => {
      setColorPickerId(null);
      if (!color) {
        return;
      }

      if (addToPalette) {
        addColor(color);
      }
      callback(color);
    });
  };

  const onClickSecondary = (event: React.MouseEvent) => {
    changeColor(event, secondaryColor, (color: Color) => {
      changeSecondaryColor(color);
    });
  };

  const onClickPrimary = (event: React.MouseEvent) => {
    changeColor(event, primaryColor, (color: Color) => {
      changePrimaryColor(color);
    });
  };

  return (
    <>
      <Container>
        <Colors>
          <SecondaryColor>
            <BoxColor
              onClick={onClickSecondary}
              size={size}
              val={secondaryColor}
            />
          </SecondaryColor>
          <PrimaryColor>
            <BoxColor onClick={onClickPrimary} size={size} val={primaryColor} />
          </PrimaryColor>
        </Colors>
      </Container>
    </>
  );
};

export default Tools;
