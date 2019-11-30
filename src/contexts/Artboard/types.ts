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
  changePrimaryColor: (color: string) => void;
  changeSecondaryColor: (color: string) => void;
  changeTool: (tool: string) => void;
}

export interface Artboard {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  layer: string;
  frame: string;
  tool: string;
}

type Payload = Artboard | string;

export interface Action {
  type: actionType;
  payload: Payload;
}
