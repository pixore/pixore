import { Color } from '../../utils/Color';

export enum actionType {
  CHANGE_ARTBOARD,
  CHANGE_FRAME,
  CHANGE_LAYER,
  CHANGE_PRIMARY_COLOR,
  CHANGE_SECONDARY_COLOR,
  CHANGE_TOOL,
}
export interface Stats {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface ArtboardsActions {
  changeArtboard: (artboard: Artboard) => void;
  changeLayer: (layer: string) => void;
  changeFrame: (frame: string) => void;
  changePrimaryColor: (color: Color) => void;
  changeSecondaryColor: (color: Color) => void;
  changeTool: (tool: string) => void;
}

export interface Artboard {
  id: string;
  primaryColor: Color;
  secondaryColor: Color;
  layer: string;
  frame: string;
  tool: string;
}

export type Payload = Artboard | string | Color;

export interface Action {
  type: actionType;
  payload: Payload;
}
