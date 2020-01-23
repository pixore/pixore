import React from 'react';

import { useSprite } from '../contexts/Sprite';
import { useSpritesActions, useSprites } from '../contexts/Sprites';
import { useSpriteActions } from '../contexts/Sprite';
import { useArtboards, useArtboardsActions } from '../contexts/Artboards';
import { useArtboard } from '../contexts/Artboard';
import { transparent, Color } from '../utils/Color';
import { usePalettesActions, usePalettes } from '../contexts/Palettes';
import defaultPalette from '../default-palette.json';
import { usePalette, usePaletteActions } from '../contexts/Palette';

interface PropTypes {
  children: React.ReactNode;
}

const getFirstNonTransparentColor = (colors: Color[]) => {
  return colors.find((color) => color.alpha !== 0);
};

const Bootstrap: React.FC<PropTypes> = (props) => {
  const { children } = props;
  const { addPalette } = usePalettesActions();
  const { changePalette } = usePaletteActions();
  const { addArtboard } = useArtboardsActions();

  const sprite = useSprite();
  const artboards = useArtboards();
  const artboard = useArtboard();
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

  if (!artboard) {
    const { id, frameList, layerList } = sprite;
    const artboardIds = Object.keys(artboards);
    if (artboardIds.length === 0) {
      addArtboard({
        id,
        tool: 'pen',
        primaryColor: getFirstNonTransparentColor(palette.colors),
        secondaryColor: transparent(),
        frame: frameList[0],
        layer: layerList[0],
      });
    }

    return null;
  }

  return <>{children}</>;
};

export default Bootstrap;
