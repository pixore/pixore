import { Sprite } from '../Sprite';

export enum actionType {
  ADD_SPRITE,
}

export type Payload = Sprite;

export interface Action {
  type: actionType;
  payload: Payload;
}

export interface SpritesActions {
  addSprite: (sprite: Sprite) => void;
}

export interface SpritesState {
  [key: string]: Sprite;
}
