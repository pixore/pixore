import React from 'react';
import BoxColor from '../BoxColor';
import { useArtboard, useArtboardActions } from '../../contexts/Artboard';
import { useWindowsActions } from '../../contexts/Windows';
import { Windows } from '../../types';
import { useEmitter } from '../Editor';
import { Color } from '../../utils/Color';
import { usePaletteActions } from '../../contexts/Palettes';
import {
  FloatBox,
  Colors,
  SecondaryColor,
  PrimaryColor,
  colorSize,
} from './elements';

interface ColorPickerDone {
  color?: Color;
  addToPalette: boolean;
}

type UpdateColorCallback = (color: Color) => void;

const Tools: React.FC = () => {
  const emitter = useEmitter();
  const { paletteId } = useArtboard();
  const { addColor } = usePaletteActions(paletteId);
  const { primaryColor, secondaryColor } = useArtboard();
  const { changePrimaryColor, changeSecondaryColor } = useArtboardActions();
  const { openWindow } = useWindowsActions();
  const [, setColorPickerId] = React.useState();

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
    <FloatBox top={4} left={4}>
      <Colors>
        <SecondaryColor>
          <BoxColor
            onClick={onClickSecondary}
            size={colorSize}
            val={secondaryColor}
          />
        </SecondaryColor>
        <PrimaryColor>
          <BoxColor
            onClick={onClickPrimary}
            size={colorSize}
            val={primaryColor}
          />
        </PrimaryColor>
      </Colors>
    </FloatBox>
  );
};

export default Tools;
