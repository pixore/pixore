import { EventObject, Interpreter, assign } from 'xstate';
import { AppInterpreter } from '../state/app';
import {
  CreateAndSelectFrameEvent,
  CreateFrameActionEvent,
  SelectFrameActionEvent,
  DeleteFrameEvent,
  DeleteFrameAndSelectEvent,
} from '../actions/frames';
import {
  CreateAndSelectLayerEvent,
  CreateLayerActionEvent,
  SelectLayerActionEvent,
  DeleteLayerEvent,
  DeleteLayerAndSelectEvent,
} from '../actions/layers';
import { PaintSpriteEvent } from '../actions/sprites';

export interface Ref<T> {
  id: string;
  ref: T;
}

const ctx = <C, S, E extends EventObject>(service: Interpreter<C, S, E>) => {
  return service.state.context;
};

export enum Actions {
  PUSH_ACTION = 'PUSH_ACTION',
  RENAME = 'RENAME',
  PAINT_SPRITE = 'PAINT_SPRITE',
  CREATE_FRAME = 'CREATE_FRAME',
  CREATE_LAYER = 'CREATE_LAYER',
  DELETE_LAYER = 'DELETE_LAYER',
  DELETE_FRAME = 'DELETE_FRAME',
  CREATE_SPRITE = 'CREATE_SPRITE',
  CREATE_ARTBOARD = 'CREATE_ARTBOARD',
  CHANGE_SPRITE = 'CHANGE_SPRITE',
  SELECT_FRAME = 'SELECT_FRAME',
  SELECT_LAYER = 'SELECT_LAYER',
  CHANGE_PRIMARY_COLOR = 'CHANGE_PRIMARY_COLOR',
  CHANGE_SECONDARY_COLOR = 'CHANGE_SECONDARY_COLOR',
  CHANGE_TOOL = 'CHANGE_TOOL',
  CHANGE_PALETTE = 'CHANGE_PALETTE',
  CREATE_PALETTE = 'CREATE_PALETTE',
  ADD_COLOR = 'ADD_COLOR',
  REMOVE_COLOR = 'REMOVE_COLOR',
  CHANGE_COLOR = 'CHANGE_COLOR',
  OPEN_WINDOW = 'OPEN_WINDOW',
  CLOSE_WINDOW = 'CLOSE_WINDOW',
  RESTORE_FRAME = 'RESTORE_FRAME',
  RESTORE_LAYER = 'RESTORE_LAYER',
  CHANGE_MODIFIER_STATE = 'CHANGE_MODIFIER_STATE',
  CREATE_AND_SELECT_FRAME = 'CREATE_AND_SELECT_FRAME',
  CREATE_AND_SELECT_LAYER = 'CREATE_AND_SELECT_LAYER',
  DELETE_FRAME_AND_SELECT = 'DELETE_FRAME_AND_SELECT',
  DELETE_LAYER_AND_SELECT = 'DELETE_LAYER_AND_SELECT',
}

export interface EventActionObject<P> extends EventObject {
  payload?: P;
}

export interface A<T extends Actions, P = undefined>
  extends EventActionObject<P> {
  type: T;
}

export type AE<T, D> = {
  type: T;
  data: D;
};

export type ActionEvent =
  | CreateAndSelectFrameEvent
  | CreateFrameActionEvent
  | SelectFrameActionEvent
  | DeleteFrameEvent
  | DeleteFrameAndSelectEvent
  | CreateAndSelectLayerEvent
  | CreateLayerActionEvent
  | SelectLayerActionEvent
  | DeleteLayerEvent
  | DeleteLayerAndSelectEvent
  | PaintSpriteEvent;

interface ActionUpdate<C, E> {
  (context: C, event: E): void | Partial<C>;
}

export type DependantKeys<K> = [K, K];

interface Persist<C, E> {
  (context: C, event: E): unknown;
}

export interface ActionConfig<C> {
  updateListProperties?: DependantKeys<keyof C>[];
}

const noop = () => undefined;

const defaultConfig = {
  updateListProperties: [],
};

const action = <P, C, E extends EventActionObject<P>>(
  actionUpdate: ActionUpdate<C, E>,
  config: ActionConfig<C> = defaultConfig,
  persist: Persist<C, E> = noop,
) => {
  const { updateListProperties = [] } = config;
  return [
    assign<C, E>((context, event) => {
      const update = actionUpdate(context, event);

      if (!update) {
        return {};
      }

      return updateListProperties.reduce((acc, [key, keyToUpdate]) => {
        if (acc[key]) {
          Object.assign(acc, {
            [keyToUpdate]: Object.keys(acc[key]),
          });
        }

        return acc;
      }, update);
    }),
    assign<C, E>((context, event) => {
      persist(context, event);
      return context;
    }),
  ];
};

const getArtboard = (service: AppInterpreter, artboardId: string) => {
  const { artboards } = ctx(service);
  const artboard = ctx(artboards).artboards[artboardId];

  if (!artboard) {
    throw new Error(`Artboard not found, spriteId = '${artboardId}'`);
  }

  return artboard;
};

const getSprite = (service: AppInterpreter, spriteId: string) => {
  const { sprites } = ctx(service);
  const sprite = ctx(sprites).sprites[spriteId];

  if (!sprite) {
    throw new Error(`Sprite not found, spriteId = '${spriteId}'`);
  }

  return sprite.ref;
};

const pushAction = (service: AppInterpreter, payload: ActionEvent) => {
  service.send({
    type: Actions.PUSH_ACTION,
    payload,
  });
};

export { ctx, action, getArtboard, getSprite, pushAction };
