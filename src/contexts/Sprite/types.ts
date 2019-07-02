interface Frame {
  id: string;
}
enum actionType {
  CHANGE_NAME,
  CHANGE_SPRITE,
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

interface Layer {
  id: string;
  name: string;
}
interface Sprite {
  id: string;
  name: string;
  width: number;
  height: number;
  layers: Layer[];
  frames: Frame[];
  palette?: Palette;
  color: string;
}

interface SpriteActions {
  changeName: (name: string) => void;
  changeSprite: (sprite: Sprite) => void;
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
