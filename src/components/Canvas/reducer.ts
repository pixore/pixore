import { getScaleAndPosition } from '../../utils';
import { CanvasActions, actionType, Action, CanvasUpdate } from './types';
import { Size, Canvas, Dispatch } from '../../types';

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
