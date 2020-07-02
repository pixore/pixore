import { AppInterpreter, App } from '../state/app';
import {
  getArtboard,
  getSprite,
  Actions,
  AE,
  ctx,
  pushAction,
} from '../utils/state';

export interface SelectFrameEventData {
  artboardId: string;
  frameId: string;
  previousFrameId: string;
}

export interface CreateFrameEventData {
  frameId: string;
  spriteId: string;
}

export interface CreateAndSelectFrameEventData
  extends CreateFrameEventData,
    SelectFrameEventData {}

export type DeleteFrameEventData = CreateFrameEventData;

export type SelectFrameActionEvent = AE<
  Actions.SELECT_FRAME,
  SelectFrameEventData
>;
export type CreateFrameActionEvent = AE<
  Actions.CREATE_FRAME,
  CreateFrameEventData
>;

export type DeleteFrameEvent = AE<Actions.DELETE_FRAME, DeleteFrameEventData>;

export type CreateAndSelectFrameEvent = AE<
  Actions.CREATE_AND_SELECT_FRAME,
  CreateAndSelectFrameEventData
>;

export interface DeleteFrameAndSelectEventData {
  artboardId: string;
  frameId: string;
  spriteId: string;
  newSelectedFrameId: string;
}

export type DeleteFrameAndSelectEvent = AE<
  Actions.DELETE_FRAME_AND_SELECT,
  DeleteFrameAndSelectEventData
>;

const selectFrame = (
  service: AppInterpreter,
  artboardId: string,
  frameId: string,
): void => {
  const artboard = getArtboard(service, artboardId);
  artboard.send({
    type: Actions.SELECT_FRAME,
    payload: { frameId },
  });
};

const undoSelectFrame = (appState: App, data: SelectFrameEventData): void => {
  const { artboardId, previousFrameId } = data;
  const artboardService = ctx(appState.artboards).artboards[artboardId];

  artboardService.send({
    type: Actions.SELECT_FRAME,
    payload: { frameId: previousFrameId },
  });
};

const reduSelectFrame = (appState: App, data: SelectFrameEventData): void => {
  const { artboardId, frameId } = data;
  const artboardService = ctx(appState.artboards).artboards[artboardId];

  artboardService.send({
    type: Actions.SELECT_FRAME,
    payload: { frameId },
  });
};

const createFrame = (service: AppInterpreter, spriteId: string) => {
  const sprite = getSprite(service, spriteId);
  const { context } = sprite.send({
    type: Actions.CREATE_FRAME,
  });

  return context.lastFrameId;
};

const undoCreateFrame = (appState: App, data: CreateFrameEventData): void => {
  const { spriteId, frameId } = data;
  const spriteService = ctx(appState.sprites).sprites[spriteId].ref;

  spriteService.send({
    type: Actions.DELETE_FRAME,
    payload: { id: frameId },
  });
};

const reduCreateFrame = (appState: App, data: CreateFrameEventData): void => {
  const { spriteId, frameId } = data;
  const spriteService = ctx(appState.sprites).sprites[spriteId].ref;

  spriteService.send({
    type: Actions.RESTORE_FRAME,
    payload: {
      id: frameId,
    },
  });
};

const deleteFrame = (
  service: AppInterpreter,
  spriteId: string,
  frameId: string,
) => {
  const sprite = getSprite(service, spriteId);
  sprite.send({
    type: Actions.DELETE_FRAME,
    payload: { id: frameId },
  });
};

const undoDeleteFrame = reduCreateFrame;
const reduDeleteFrame = undoCreateFrame;

const createAndSelectFrame = (
  service: AppInterpreter,
  artboardId: string,
): string => {
  const { frameId: previousFrameId, spriteId } = ctx(
    getArtboard(service, artboardId),
  );
  const frameId = createFrame(service, spriteId);

  selectFrame(service, artboardId, frameId);

  pushAction(service, {
    type: Actions.CREATE_AND_SELECT_FRAME,
    data: {
      previousFrameId,
      frameId,
      spriteId,
      artboardId,
    },
  });

  return frameId;
};

const undoCreateAndSelectFrame = (
  appState: App,
  data: CreateAndSelectFrameEventData,
) => {
  undoCreateFrame(appState, data);
  undoSelectFrame(appState, data);
};

const reduCreateAndSelectFrame = (
  appState: App,
  data: CreateAndSelectFrameEventData,
): void => {
  reduCreateFrame(appState, data);
  reduSelectFrame(appState, data);
};

const deleteFrameAndSelect = (
  service: AppInterpreter,
  artboardId: string,
  newSelectedFrameId: string,
): void => {
  const { frameId, spriteId } = ctx(getArtboard(service, artboardId));

  deleteFrame(service, spriteId, frameId);
  selectFrame(service, artboardId, newSelectedFrameId);

  pushAction(service, {
    type: Actions.DELETE_FRAME_AND_SELECT,
    data: {
      spriteId,
      frameId,
      artboardId,
      newSelectedFrameId,
    },
  });
};

const undoDeleteFrameAndSelect = (
  appState: App,
  data: DeleteFrameAndSelectEventData,
): void => {
  const { frameId } = data;
  undoDeleteFrame(appState, data);
  undoSelectFrame(appState, {
    ...data,
    previousFrameId: frameId,
  });
};

const reduDeleteFrameAndSelect = (
  appState: App,
  data: DeleteFrameAndSelectEventData,
): void => {
  const { frameId } = data;
  reduDeleteFrame(appState, data);
  reduSelectFrame(appState, {
    ...data,
    previousFrameId: frameId,
  });
};

const createFrameEvent = {
  action(service: AppInterpreter, spriteId: string): string {
    const frameId = createFrame(service, spriteId);
    pushAction(service, {
      type: Actions.CREATE_FRAME,
      data: {
        spriteId,
        frameId,
      },
    });

    return frameId;
  },
  undo: undoCreateFrame,
  redu: reduCreateFrame,
};

const selectFrameEvent = {
  action: selectFrame,
  undo: undoSelectFrame,
  redu: reduSelectFrame,
};

const createAndSelectFrameEvent = {
  action: createAndSelectFrame,
  undo: undoCreateAndSelectFrame,
  redu: reduCreateAndSelectFrame,
};

const deleteFrameEvent = {
  action(service: AppInterpreter, spriteId: string, frameId: string) {
    deleteFrame(service, spriteId, frameId);
    pushAction(service, {
      type: Actions.DELETE_FRAME,
      data: {
        spriteId,
        frameId,
      },
    });
  },
  undo: undoDeleteFrame,
  redu: reduDeleteFrame,
};

const deleteFrameAndSelectEvent = {
  action: deleteFrameAndSelect,
  undo: undoDeleteFrameAndSelect,
  redu: reduDeleteFrameAndSelect,
};

export {
  selectFrameEvent,
  createFrameEvent,
  createAndSelectFrameEvent,
  deleteFrameEvent,
  deleteFrameAndSelectEvent,
};
