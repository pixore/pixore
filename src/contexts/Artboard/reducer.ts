import { Artboard, ArtboardsActions, actionType, Action } from './types';
import { round2 } from '../../utils';

interface Size {
  width: number;
  height: number;
}

export function getScaleAndPosition(stats: DOMRect, size: Size) {
  const { top, left } = stats;

  const scale =
    stats.height > stats.width
      ? round2(stats.width / size.width)
      : round2(stats.height / size.height);

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
    case actionType.CHANGE_PRIMARY_COLOR:
      return {
        ...state,
        primaryColor: payload as string,
      };
    case actionType.CHANGE_SECONDARY_COLOR:
      return {
        ...state,
        secondaryColor: payload as string,
      };
    case actionType.CHANGE_TOOL:
      return {
        ...state,
        tool: payload as string,
      };
    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;

const createActions = (dispatch: Dispatch): ArtboardsActions => ({
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
  changePrimaryColor(color) {
    dispatch({
      type: actionType.CHANGE_PRIMARY_COLOR,
      payload: color,
    });
  },
  changeSecondaryColor(color) {
    dispatch({
      type: actionType.CHANGE_SECONDARY_COLOR,
      payload: color,
    });
  },
  changeTool(tool) {
    dispatch({
      type: actionType.CHANGE_TOOL,
      payload: tool,
    });
  },
});

export { reducer, createActions };
