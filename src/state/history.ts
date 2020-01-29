import { App } from './app';
import { Actions, ctx } from '../utils/state';

const undo = (context: App): Partial<App> => {
  const { undoActions, reduActions, sprites, artboards } = context;

  if (undoActions.length === 0) {
    return {};
  }

  const action = undoActions[undoActions.length - 1];

  if (
    action.type === Actions.CREATE_FRAME ||
    action.type === Actions.CREATE_AND_SELECT_FRAME
  ) {
    const { spriteId, frameId } = action.data;
    const spriteService = ctx(sprites).sprites[spriteId].ref;
    spriteService.send({
      type: Actions.DELETE_FRAME,
      payload: { id: frameId },
    });
  }

  if (action.type === Actions.CREATE_AND_SELECT_FRAME) {
    const { artboardId, previousFrameId } = action.data;
    const artboardService = ctx(artboards).artboards[artboardId];
    artboardService.send({
      type: Actions.SELECT_FRAME,
      payload: { frameId: previousFrameId },
    });
  }

  if (
    action.type === Actions.CREATE_LAYER ||
    action.type === Actions.CREATE_AND_SELECT_LAYER
  ) {
    const { spriteId, layerId } = action.data;
    const spriteService = ctx(sprites).sprites[spriteId].ref;
    spriteService.send({
      type: Actions.DELETE_LAYER,
      payload: { id: layerId },
    });
  }

  if (action.type === Actions.CREATE_AND_SELECT_LAYER) {
    const { artboardId, previousLayerId } = action.data;
    const artboardService = ctx(artboards).artboards[artboardId];
    artboardService.send({
      type: Actions.SELECT_LAYER,
      payload: { layerId: previousLayerId },
    });
  }

  return {
    undoActions: undoActions.slice(0, undoActions.length - 1),
    reduActions: reduActions.concat(undoActions.slice(undoActions.length - 1)),
  };
};

const redu = (context: App): Partial<App> => {
  const { undoActions, reduActions, sprites, artboards } = context;
  if (reduActions.length === 0) {
    return {};
  }

  const action = reduActions[reduActions.length - 1];

  if (
    action.type === Actions.CREATE_FRAME ||
    action.type === Actions.CREATE_AND_SELECT_FRAME
  ) {
    const { spriteId, frameId } = action.data;
    const spriteService = ctx(sprites).sprites[spriteId].ref;

    spriteService.send({
      type: Actions.RESTORE_FRAME,
      payload: {
        id: frameId,
      },
    });
  }

  if (action.type === Actions.CREATE_AND_SELECT_FRAME) {
    const { artboardId, frameId } = action.data;
    const artboardService = ctx(artboards).artboards[artboardId];
    artboardService.send({
      type: Actions.SELECT_FRAME,
      payload: { frameId },
    });
  }

  if (
    action.type === Actions.CREATE_LAYER ||
    action.type === Actions.CREATE_AND_SELECT_LAYER
  ) {
    const { spriteId, layerId, name } = action.data;
    const spriteService = ctx(sprites).sprites[spriteId].ref;

    spriteService.send({
      type: Actions.RESTORE_LAYER,
      payload: {
        id: layerId,
        name,
      },
    });
  }

  if (action.type === Actions.CREATE_AND_SELECT_LAYER) {
    const { artboardId, layerId } = action.data;
    const artboardService = ctx(artboards).artboards[artboardId];
    artboardService.send({
      type: Actions.SELECT_LAYER,
      payload: { layerId },
    });
  }

  return {
    reduActions: reduActions.slice(0, reduActions.length - 1),
    undoActions: undoActions.concat(reduActions.slice(reduActions.length - 1)),
  };
};

export { undo, redu };
