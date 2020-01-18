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
  const { addNewLayerToSprite, addNewFrameToSprite } = useSpriteActions();
  const { addSprite } = useSpritesActions();
  const { addArtboard } = useArtboardsActions();

  const sprite = useSprite();
  const sprites = useSprites();
  const artboards = useArtboards();
  const artboard = useArtboard();
  const palettes = usePalettes();
  const palette = usePalette();

  if (!sprite) {
    const spriteIds = Object.keys(sprites);
    if (spriteIds.length === 0) {
      addSprite({
        id: '1',
        name: 'New Sprite',
        width: 20,
        height: 20,
        layers: [],
        frames: [],
      });
    }

    return null;
  }

  if (sprite.layers.length === 0) {
    addNewLayerToSprite({
      name: 'Layer 1',
      spriteId: sprite.id,
    });

    return null;
  }

  if (sprite.frames.length === 0) {
    addNewFrameToSprite(sprite.id);

    return null;
  }

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
    const { id, frames, layers } = sprite;
    const artboardIds = Object.keys(artboards);
    if (artboardIds.length === 0) {
      addArtboard({
        id,
        tool: 'pen',
        primaryColor: getFirstNonTransparentColor(palette.colors),
        secondaryColor: transparent(),
        frame: frames[0],
        layer: layers[0],
      });
    }

    return null;
  }

  return <>{children}</>;
};

export default Bootstrap;
