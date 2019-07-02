import { Sprite } from '../Sprite/types';

enum actionType {
  ADD_SPRITE,
}

type Payload = Sprite;

interface Action {
  type: actionType;
  payload: Payload;
}

interface SpritesActions {
  addSprite: (sprite: Sprite) => void;
}

interface SpritesState {
  [key: string]: Sprite;
}

export { SpritesState, Sprite, SpritesActions, actionType, Action };
