import React from 'react';

import { useEditorContext } from '../contexts/EditorContext';

interface Frame {
  id: string;
}

interface Palette {
  id: string;
  name: string;
}

interface Layer {
  id: string;
  name: string;
}

export interface Sprite {
  id: string;
  name: string;
  width: number;
  height: number;
  layers: Layer[];
  frames: Frame[];
  palette?: Palette;
  color: string;
}

export const defaultState = {
  1: {
    id: '1',
    name: 'New Sprite',
    layers: [],
    frames: [],
    color: '#fff',
    width: 50,
    height: 50,
  },
};

export interface SpritesContext {
  [key: string]: Sprite;
}

const SpriteContext = React.createContext<SpritesContext>(defaultState);

export const { Provider } = SpriteContext;

export const useSpritesContext = () => React.useContext(SpriteContext);
export const useSprite = (id?: string): Sprite | undefined => {
  const { sprite } = useEditorContext();
  const sprites = useSpritesContext();

  if (id) {
    return sprites[id];
  }

  return sprites[sprite];
};
