import { Sprite } from '../Sprite';

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

export { SpritesState, SpritesActions, actionType, Action };
