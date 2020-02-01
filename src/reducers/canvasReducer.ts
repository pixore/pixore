import { getScaleAndPosition } from '../utils';
import { Size, Canvas, Dispatch } from '../types';
import { Sprite } from '../state/sprite';

export interface CanvasUpdate {
  x?: number;
  y?: number;
  scale?: number;
}

export enum actionType {
  CENTER,
  UPDATE,
}

export interface Stats {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface CanvasActions {
  center: (stats: Stats, sprite: Sprite) => void;
  update: (payload: Canvas) => void;
}

type Payload = CanvasUpdate;

export interface Action {
  type: actionType;
  payload: Payload;
}

const reducer = (state: Canvas, action: Action): Canvas => {
  const { type, payload } = action;

  switch (type) {
    case actionType.UPDATE:
    case actionType.CENTER:
      return {
        ...state,
        ...(payload as Canvas),
      };
  }
};

const createActions = (dispatch: Dispatch<Action>): CanvasActions => ({
  update(data: CanvasUpdate) {
    dispatch({
      type: actionType.UPDATE,
      payload: data,
    });
  },
  center(stats: DOMRect, size: Size) {
    const { scale, x, y } = getScaleAndPosition(stats, size);

    const payload = {
      scale,
      x,
      y,
    };

    dispatch({
      type: actionType.CENTER,
      payload,
    });
  },
});

export { createActions, reducer };
