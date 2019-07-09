interface Frame {
  id: string;
}

enum actionType {
  ADD_FRAME,
}

type Payload = Frame;

interface Action {
  type: actionType;
  payload: Payload;
}

interface FramesActions {
  addFrame: (frame: Frame) => void;
}

interface FramesState {
  [key: string]: Frame;
}

export { Frame, Action, actionType, FramesActions, FramesState, Payload };
