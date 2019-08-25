import React from 'react';

import { useSprite } from '../contexts/Sprite';
import { useSpritesActions, useSprites } from '../contexts/Sprites';
import { useSpriteActions } from '../contexts/Sprite';
import { useArtboards, useArtboardsActions } from '../contexts/Artboards';
import { useArtboard } from '../contexts/Artboard';

interface PropTypes {
  children: React.ReactNode;
}

const Bootstrap: React.FC<PropTypes> = (props) => {
  const { children } = props;
  const { addNewLayerToSprite, addNewFrameToSprite } = useSpriteActions();
  const { addSprite } = useSpritesActions();
  const { addArtboard } = useArtboardsActions();

  const sprite = useSprite();
  const sprites = useSprites();
  const artboards = useArtboards();
  const artboard = useArtboard();

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
      name: 'First Layer',
    });

    return null;
  }

  if (sprite.frames.length === 0) {
    addNewFrameToSprite();

    return null;
  }

  if (!artboard) {
    const { id, frames, layers } = sprite;
    const artboardIds = Object.keys(artboards);
    if (artboardIds.length === 0) {
      addArtboard({
        id,
        scale: 1,
        tool: 'pen',
        primaryColor: '#000000',
        secondaryColor: 'transparent',
        frame: frames[0],
        layer: layers[0],
        y: 0,
        x: 0,
      });
    }

    return null;
  }

  return <>{children}</>;
};

export default Bootstrap;
