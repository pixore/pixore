import { Artboard, ArtboardsActions, actionType, Action } from './types';
import Color from '../../utils/Color';

const reducer = (state: Artboard, action: Action): Artboard => {
  const { type, payload } = action;

  switch (type) {
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
        primaryColor: payload as Color,
      };
    case actionType.CHANGE_SECONDARY_COLOR:
      return {
        ...state,
        secondaryColor: payload as Color,
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
