import React from 'react';
import { usePalettesActions, usePalettes } from '../contexts/Palettes';
import defaultPalette from '../default-palette.json';
import { usePalette, usePaletteActions } from '../contexts/Palette';

interface PropTypes {
  children: React.ReactNode;
}

// const getFirstNonTransparentColor = (colors: Color[]) => {
//   return colors.find((color) => color.alpha !== 0);
// };

const Bootstrap: React.FC<PropTypes> = (props) => {
  const { children } = props;
  const { addPalette } = usePalettesActions();
  const { changePalette } = usePaletteActions();

  const palettes = usePalettes();
  const palette = usePalette();

  const paletteIds = Object.keys(palettes);

  if (paletteIds.length === 0) {
    addPalette(defaultPalette);
    return null;
  }

  if (!palette) {
    changePalette(palettes[paletteIds[0]]);
    return null;
  }
  return <>{children}</>;
};

export default Bootstrap;
