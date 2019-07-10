import { Sprite } from '../Sprite';
import { Artboard, ArtboardsActions, actionType, Action, Stats } from './types';

const { floor } = Math;

interface Size {
  width: number;
  height: number;
}

export function getScaleAndPosition(stats: DOMRect, size: Size) {
  const { top, left } = stats;

  const scale =
    stats.height > stats.width
      ? floor(stats.width / size.width)
      : floor(stats.height / size.height);

  const width = size.width * scale;
  const height = size.height * scale;

  const marginTop = (stats.height - height) / 2;
  const marginLeft = (stats.width - width) / 2;

  return {
    scale,
    x: left + marginLeft,
    y: top + marginTop,
  };
}

const reducer = (state: Artboard, action: Action): Artboard => {
  const { type, payload } = action;

  switch (type) {
    case actionType.CHANGE_POSITION:
    case actionType.CENTER:
      return {
        ...state,
        ...(payload as Artboard),
      };
    case actionType.CHANGE_ARTBOARD:
      return payload as Artboard;
    case actionType.CHANGE_LAYER:
      return {
        ...state,
        layer: payload as string,
      };
    case actionType.CHANGE_FRAME:
      return {
        ...state,
        frame: payload as string,
      };
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;

const createActions = (dispatch: Dispatch): ArtboardsActions => {
  return {
    changeArtboard(artboard: Artboard) {
      dispatch({
        type: actionType.CHANGE_ARTBOARD,
        payload: artboard,
      });
    },
    changePosition(payload) {
      dispatch({
        type: actionType.CHANGE_POSITION,
        payload,
      });
    },
    center(stats: DOMRect, sprite: Sprite) {
      const { scale, x, y } = getScaleAndPosition(stats, sprite);

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
    changeLayer(layer) {
      dispatch({
        type: actionType.CHANGE_LAYER,
        payload: layer,
      });
    },
    changeFrame(frame) {
      dispatch({
        type: actionType.CHANGE_FRAME,
        payload: frame,
      });
    },
  };
};

export { reducer, createActions };
