import { App } from './app';
import { Actions } from '../utils/state';
import {
  selectFrameEvent,
  createFrameEvent,
  createAndSelectFrameEvent,
  deleteFrameEvent,
  deleteFrameAndSelectEvent,
} from '../actions/frames';
import {
  selectLayerEvent,
  createLayerEvent,
  createAndSelectLayerEvent,
  deleteLayerEvent,
  deleteLayerAndSelectEvent,
} from '../actions/layers';
import { paintSpriteEvent } from '../actions/sprites';

const undo = (context: App): Partial<App> => {
  const { undoActions, reduActions } = context;

  if (undoActions.length === 0) {
    return {};
  }

  const action = undoActions[undoActions.length - 1];

  switch (action.type) {
    case Actions.SELECT_FRAME:
      selectFrameEvent.undo(context, action.data);
      break;
    case Actions.CREATE_FRAME:
      createFrameEvent.undo(context, action.data);
      break;
    case Actions.CREATE_AND_SELECT_FRAME:
      createAndSelectFrameEvent.undo(context, action.data);
      break;
    case Actions.DELETE_FRAME:
      deleteFrameEvent.undo(context, action.data);
      break;
    case Actions.SELECT_LAYER:
      selectLayerEvent.undo(context, action.data);
      break;
    case Actions.CREATE_LAYER:
      createLayerEvent.undo(context, action.data);
      break;
    case Actions.CREATE_AND_SELECT_LAYER:
      createAndSelectLayerEvent.undo(context, action.data);
      break;
    case Actions.DELETE_LAYER:
      deleteLayerEvent.undo(context, action.data);
      break;
    case Actions.PAINT_SPRITE:
      paintSpriteEvent.undo(context, action.data);
      break;
    case Actions.DELETE_FRAME_AND_SELECT:
      deleteFrameAndSelectEvent.undo(context, action.data);
      break;
    case Actions.DELETE_LAYER_AND_SELECT:
      deleteLayerAndSelectEvent.undo(context, action.data);
      break;
  }
  return {
    undoActions: undoActions.slice(0, undoActions.length - 1),
    reduActions: reduActions.concat(undoActions.slice(undoActions.length - 1)),
  };
};

const redu = (context: App): Partial<App> => {
  const { undoActions, reduActions } = context;
  if (reduActions.length === 0) {
    return {};
  }

  const action = reduActions[reduActions.length - 1];

  switch (action.type) {
    case Actions.SELECT_FRAME:
      selectFrameEvent.redu(context, action.data);
      break;
    case Actions.CREATE_FRAME:
      createFrameEvent.redu(context, action.data);
      break;
    case Actions.CREATE_AND_SELECT_FRAME:
      createAndSelectFrameEvent.redu(context, action.data);
      break;
    case Actions.DELETE_FRAME:
      deleteFrameEvent.redu(context, action.data);
      break;
    case Actions.SELECT_LAYER:
      selectLayerEvent.redu(context, action.data);
      break;
    case Actions.CREATE_LAYER:
      createLayerEvent.redu(context, action.data);
      break;
    case Actions.CREATE_AND_SELECT_LAYER:
      createAndSelectLayerEvent.redu(context, action.data);
      break;
    case Actions.DELETE_LAYER:
      deleteLayerEvent.redu(context, action.data);
      break;
    case Actions.PAINT_SPRITE:
      paintSpriteEvent.redu(context, action.data);
      break;
    case Actions.DELETE_FRAME_AND_SELECT:
      deleteFrameAndSelectEvent.redu(context, action.data);
      break;
    case Actions.DELETE_LAYER_AND_SELECT:
      deleteLayerAndSelectEvent.redu(context, action.data);
      break;
  }

  return {
    reduActions: reduActions.slice(0, reduActions.length - 1),
    undoActions: undoActions.concat(reduActions.slice(reduActions.length - 1)),
  };
};

export { undo, redu };
