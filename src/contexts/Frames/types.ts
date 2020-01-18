export interface Frame {
  id: string;
  spriteId: string;
}

export enum actionType {
  ADD_FRAME,
  REMOVE_FRAME,
}

export type Payload = Frame | string;

export interface Action {
  type: actionType;
  payload: Payload;
}

export interface FramesActions {
  addFrame: (frame: Frame) => void;
  removeFrame: (id: string) => void;
}

export interface FramesState {
  [key: string]: Frame;
}
