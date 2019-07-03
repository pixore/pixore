import { Sprite } from '../Sprite';
import { Artboard, ArtboardsActions, actionType, Action, Stats } from './types';

const { floor } = Math;

type Size = {
  width: number;
  height: number;
};

export function getPreviewSize(maxSize: Size, size: Size) {
  let width: number;
  let height: number;
  let scale: number;
  let marginTop = 0;
  let marginLeft = 0;

  if (maxSize.height > maxSize.width) {
    width = maxSize.width;
    scale = maxSize.width / size.width;
    height = size.height * scale;
    marginTop = (maxSize.height - height) / 2;
  } else {
    height = maxSize.height;
    scale = maxSize.height / size.height;
    width = size.width * scale;
    marginLeft = (maxSize.width - width) / 2;
  }
  return {
    maxWidth: maxSize.width,
    maxHeight: maxSize.height,
    width,
    height,
    marginTop,
    marginLeft,
    scale,
  };
}

const reducer = (state: Artboard, action: Action): Artboard => {
  const { type, payload } = action;

  switch (type) {
    case actionType.CHANGE_POSITION:
    case actionType.CENTER:
      return {
        ...state,
        ...payload,
      };
    case actionType.CHANGE_ARTBOARD:
      return payload as Artboard;
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
    center(stats: Stats, sprite: Sprite) {
      const { top, left } = stats;
      const { scale, marginLeft, marginTop } = getPreviewSize(stats, sprite);

      const payload = {
        scale: floor(scale),
        x: Number.parseInt(`${left + marginLeft}`),
        y: floor(top + marginTop),
      };

      dispatch({
        type: actionType.CENTER,
        payload,
      });
    },
  };
};

export { reducer, createActions };
