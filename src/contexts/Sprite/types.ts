import { Sprite } from '../../types';

export enum actionType {
  CHANGE_NAME,
  CHANGE_SPRITE,
  ADD_LAYER,
  ADD_FRAME,
  CREATE_NEW_VERSION,
  REMOVE_LAYER,
  REMOVE_FRAME,
}

export type Payload = Sprite | string;

export interface Action {
  type: actionType;
  payload?: Payload;
}

export interface SpriteActions {
  changeName: (name: string) => void;
  changeSprite: (sprite: Sprite) => void;
  addNewLayerToSprite: (newLayer: { name: string; spriteId: string }) => string;
  addNewFrameToSprite: (spriteId: string) => string;
  removeLayerFromSprite: (layerId: string) => void;
  removeFrameFromSprite: (frameId: string) => void;
  createNewVersion: () => void;
}
