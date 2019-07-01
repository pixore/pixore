import { Sprite } from '../SpritesContext';
import {
  ArtboardsState,
  ArtboardsActions,
  actionType,
  Action,
  Stats,
} from './types';

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

const reducer = (state: ArtboardsState, action: Action): ArtboardsState => {
  const { type, payload } = action;
  const { id } = payload;
  const artboard = state[id];
  console.log(action);

  switch (type) {
    case actionType.CHANGE_SCALE:
    case actionType.CENTER:
      return {
        ...state,
        [id]: {
          ...artboard,
          ...payload,
        },
      };
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;

const createActions = (dispatch: Dispatch): ArtboardsActions => {
  return {
    changeScale(id: string, scale: number) {
      dispatch({
        type: actionType.CHANGE_SCALE,
        payload: {
          id,
          scale,
        },
      });
    },
    center(stats: Stats, sprite: Sprite) {
      const { top, left } = stats;
      const { id } = sprite;
      const { scale, marginLeft, marginTop } = getPreviewSize(stats, sprite);

      const payload = {
        id,
        scale: floor(scale),
        x: Number.parseInt(`${left + marginLeft}`),
        y: floor(top + marginTop),
      };

      console.log(payload, left, marginLeft);

      dispatch({
        type: actionType.CENTER,
        payload,
      });
    },
  };
};

export { reducer, createActions };
