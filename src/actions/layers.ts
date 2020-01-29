import { AppInterpreter, App } from '../state/app';
import {
  getArtboard,
  getSprite,
  Actions,
  AE,
  ctx,
  pushAction,
} from '../utils/state';

export interface SelectLayerEventData {
  artboardId: string;
  layerId: string;
  previousLayerId: string;
}

export interface CreateLayerEventData {
  layerId: string;
  name: string;
  spriteId: string;
}

export interface CreateAndSelectLayerEventData
  extends CreateLayerEventData,
    SelectLayerEventData {}

export type DeleteLayerEventData = CreateLayerEventData;

export type SelectLayerActionEvent = AE<
  Actions.SELECT_LAYER,
  SelectLayerEventData
>;
export type CreateLayerActionEvent = AE<
  Actions.CREATE_LAYER,
  CreateLayerEventData
>;

export type DeleteLayerEvent = AE<Actions.DELETE_LAYER, DeleteLayerEventData>;

export type CreateAndSelectLayerEvent = AE<
  Actions.CREATE_AND_SELECT_LAYER,
  CreateAndSelectLayerEventData
>;

export interface DeleteLayerAndSelectEventData {
  artboardId: string;
  layerId: string;
  spriteId: string;
  name: string;
  newSelectedLayerId: string;
}

export type DeleteLayerAndSelectEvent = AE<
  Actions.DELETE_LAYER_AND_SELECT,
  DeleteLayerAndSelectEventData
>;

const selectLayer = (
  service: AppInterpreter,
  artboardId: string,
  layerId: string,
) => {
  const artboard = getArtboard(service, artboardId);
  artboard.send({
    type: Actions.SELECT_LAYER,
    payload: { layerId },
  });
};

const undoSelectLayer = (appState: App, data: SelectLayerEventData) => {
  const { artboardId, previousLayerId } = data;
  const artboardService = ctx(appState.artboards).artboards[artboardId];

  artboardService.send({
    type: Actions.SELECT_LAYER,
    payload: { layerId: previousLayerId },
  });
};

const reduSelectLayer = (appState: App, data: SelectLayerEventData) => {
  const { artboardId, layerId } = data;
  const artboardService = ctx(appState.artboards).artboards[artboardId];

  artboardService.send({
    type: Actions.SELECT_LAYER,
    payload: { layerId },
  });
};

const createLayer = (
  service: AppInterpreter,
  spriteId: string,
  name: string,
) => {
  const sprite = getSprite(service, spriteId);
  const { context } = sprite.send({
    type: Actions.CREATE_LAYER,
    payload: { name },
  });

  return context.lastLayerId;
};

const undoCreateLayer = (appState: App, data: CreateLayerEventData) => {
  const { spriteId, layerId } = data;
  const spriteService = ctx(appState.sprites).sprites[spriteId].ref;

  spriteService.send({
    type: Actions.DELETE_LAYER,
    payload: { id: layerId },
  });
};

const reduCreateLayer = (appState: App, data: CreateLayerEventData) => {
  const { spriteId, layerId, name } = data;
  const spriteService = ctx(appState.sprites).sprites[spriteId].ref;

  spriteService.send({
    type: Actions.RESTORE_LAYER,
    payload: {
      id: layerId,
      name,
    },
  });
};

const deleteLayer = (
  service: AppInterpreter,
  spriteId: string,
  layerId: string,
) => {
  const sprite = getSprite(service, spriteId);
  sprite.send({
    type: Actions.DELETE_LAYER,
    payload: { id: layerId },
  });
};

const undoDeleteLayer = reduCreateLayer;
const reduDeleteLayer = undoCreateLayer;

const createAndSelectLayer = (
  service: AppInterpreter,
  artboardId: string,
  name: string,
) => {
  const { layerId: previousLayerId, spriteId } = ctx(
    getArtboard(service, artboardId),
  );
  const layerId = createLayer(service, spriteId, name);

  selectLayer(service, artboardId, layerId);

  pushAction(service, {
    type: Actions.CREATE_AND_SELECT_LAYER,
    data: {
      previousLayerId,
      name,
      layerId,
      spriteId,
      artboardId,
    },
  });

  return layerId;
};

const undoCreateAndSelectLayer = (
  appState: App,
  data: CreateAndSelectLayerEventData,
) => {
  undoCreateLayer(appState, data);
  undoSelectLayer(appState, data);
};

const reduCreateAndSelectLayer = (
  appState: App,
  data: CreateAndSelectLayerEventData,
) => {
  reduCreateLayer(appState, data);
  reduSelectLayer(appState, data);
};

const deleteLayerAndSelect = (
  service: AppInterpreter,
  artboardId: string,
  newSelectedLayerId: string,
) => {
  const { layerId, spriteId } = ctx(getArtboard(service, artboardId));
  const { layers } = ctx(getSprite(service, spriteId));
  const { name } = layers[layerId];

  deleteLayer(service, spriteId, layerId);
  selectLayer(service, artboardId, newSelectedLayerId);

  pushAction(service, {
    type: Actions.DELETE_LAYER_AND_SELECT,
    data: {
      spriteId,
      layerId,
      name,
      artboardId,
      newSelectedLayerId,
    },
  });
};

const undoDeleteLayerAndSelect = (
  appState: App,
  data: DeleteLayerAndSelectEventData,
) => {
  const { layerId } = data;
  undoDeleteLayer(appState, data);
  undoSelectLayer(appState, {
    ...data,
    previousLayerId: layerId,
  });
};

const reduDeleteLayerAndSelect = (
  appState: App,
  data: DeleteLayerAndSelectEventData,
) => {
  const { layerId } = data;
  reduDeleteLayer(appState, data);
  reduSelectLayer(appState, {
    ...data,
    previousLayerId: layerId,
  });
};

const createLayerEvent = {
  action(service: AppInterpreter, spriteId: string, name: string) {
    const layerId = createLayer(service, spriteId, name);
    pushAction(service, {
      type: Actions.CREATE_LAYER,
      data: {
        spriteId,
        name,
        layerId,
      },
    });

    return layerId;
  },
  undo: undoCreateLayer,
  redu: reduCreateLayer,
};

const selectLayerEvent = {
  action: selectLayer,
  undo: undoSelectLayer,
  redu: reduSelectLayer,
};

const createAndSelectLayerEvent = {
  action: createAndSelectLayer,
  undo: undoCreateAndSelectLayer,
  redu: reduCreateAndSelectLayer,
};

const deleteLayerEvent = {
  action(service: AppInterpreter, spriteId: string, layerId: string) {
    const { layers } = ctx(getSprite(service, spriteId));
    const { name } = layers[layerId];

    deleteLayer(service, spriteId, layerId);
    pushAction(service, {
      type: Actions.DELETE_LAYER,
      data: {
        name,
        spriteId,
        layerId,
      },
    });
  },
  undo: undoDeleteLayer,
  redu: reduDeleteLayer,
};

const deleteLayerAndSelectEvent = {
  action: deleteLayerAndSelect,
  undo: undoDeleteLayerAndSelect,
  redu: reduDeleteLayerAndSelect,
};

export {
  selectLayerEvent,
  createLayerEvent,
  createAndSelectLayerEvent,
  deleteLayerEvent,
  deleteLayerAndSelectEvent,
};
