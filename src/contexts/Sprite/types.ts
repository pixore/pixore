import { Layer } from '../Layers/types';

interface Frame {
  id: string;
}
enum actionType {
  CHANGE_NAME,
  CHANGE_SPRITE,
  ADD_LAYER,
}

type Payload = Sprite | string;

interface Action {
  type: actionType;
  payload: Payload;
}

interface Palette {
  id: string;
  name: string;
}

interface Sprite {
  id: string;
  name: string;
  width: number;
  height: number;
  layers: string[];
  frames: string[];
  palette?: Palette;
}

interface SpriteActions {
  changeName: (name: string) => void;
  changeSprite: (sprite: Sprite) => void;
  addLayerInSprite: (id: string) => void;
}

export {
  Layer,
  Sprite,
  Palette,
  Frame,
  SpriteActions,
  Action,
  Payload,
  actionType,
};
