import { EventObject, Interpreter, sendParent, assign } from 'xstate';
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
  NEW_VERSION = 'NEW_VERSION',
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

interface CreateFrameEventData {
  frameId: string;
  spriteId: string;
}

type DeleteFrameEventData = CreateFrameEventData;

interface CreateLayerEventData {
  layerId: string;
  spriteId: string;
}

type DeleteLayerEventData = CreateFrameEventData;

export type EventData =
  | CreateFrameEventData
  | DeleteFrameEventData
  | CreateLayerEventData
  | DeleteLayerEventData;

export type ActionEvent =
  | AE<Actions.CREATE_FRAME, CreateFrameEventData>
  | AE<Actions.DELETE_FRAME, DeleteFrameEventData>
  | AE<Actions.CREATE_LAYER, CreateLayerEventData>
  | AE<Actions.DELETE_LAYER, DeleteLayerEventData>;

interface ActionUpdate<C, E> {
  (context: C, event: E): void | Partial<C>;
}

export type DependantKeys<K> = [K, K];

export interface ActionConfig<K> {
  updateListProperties: DependantKeys<K>[];
}

const defaultConfig = {
  updateListProperties: [],
};

const action = <P, C, E extends EventActionObject<P>>(
  actionUpdate: ActionUpdate<C, E>,
  config: ActionConfig<keyof C> = defaultConfig,
) => {
  const { updateListProperties = [] } = config;
  return assign<C, E>((context, event) => {
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
  });
};

export { ctx, action };
