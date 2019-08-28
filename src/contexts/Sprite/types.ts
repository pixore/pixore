export enum actionType {
  CHANGE_NAME,
  CHANGE_SPRITE,
  ADD_LAYER,
  ADD_FRAME,
  CREATE_NEW_VERSION,
}

export type Payload = Sprite | string;

export interface Action {
  type: actionType;
  payload?: Payload;
}

export interface Palette {
  id: string;
  name: string;
}

export interface Sprite {
  id: string;
  name: string;
  width: number;
  height: number;
  layers: string[];
  frames: string[];
  version?: number;
  palette?: Palette;
}

export interface SpriteActions {
  changeName: (name: string) => void;
  changeSprite: (sprite: Sprite) => void;
  addNewLayerToSprite: (newLayer: { name: string }) => string;
  addNewFrameToSprite: () => string;
  createNewVersion: () => void;
}
