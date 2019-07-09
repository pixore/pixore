import { Layer } from '../Layers';
import { Frame } from '../Frames';

enum actionType {
  CHANGE_NAME,
  CHANGE_SPRITE,
  ADD_LAYER,
  ADD_FRAME,
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
  addLayerToSprite: (id: string) => void;
  addFrameToSprite: (id: string) => void;
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
