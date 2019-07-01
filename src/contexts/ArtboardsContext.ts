import React from 'react';

export interface Artboard {
  id: string;
  color: string;
  scale: number;
  x: number;
  y: number;
}

export interface SpritesContext {
  [key: string]: Artboard;
}

const SpriteContext = React.createContext<SpritesContext>({});

export const { Provider } = SpriteContext;

export const useArtboardsContext = () => React.useContext(SpriteContext);
export const useArtboard = (id: string) => {
  const artboards = useArtboardsContext();
  return artboards[id];
};
