export interface Frame {
  id: string;
}

export enum actionType {
  ADD_FRAME,
}

export type Payload = Frame;

export interface Action {
  type: actionType;
  payload: Payload;
}

export interface FramesActions {
  addFrame: (frame: Frame) => void;
}

export interface FramesState {
  [key: string]: Frame;
}
