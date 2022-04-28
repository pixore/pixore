import { Machine, assign, Interpreter } from 'xstate';
import { Frame, Layer, BaseSprite } from '../types';
import { addItem, removeItem, isLastItem } from '../utils/object';
import { createId } from '../utils';
import { Actions, A, action, ActionConfig } from '../utils/state';

interface SpriteState {
  states: {
    setup: Record<string, unknown>;
    painting: Record<string, unknown>;
  };
}

export type FrameMap = Record<string, Frame>;
export type LayerMap = Record<string, Layer>;

export interface Sprite extends BaseSprite {
  spriteId: string;
  frames: FrameMap;
  layers: LayerMap;
  frameList: string[];
  layerList: string[];
  version: number;
  name: string;
  width: number;
  height: number;
  lastFrameId?: string;
  lastLayerId?: string;
  local?: boolean;
}

type SpriteEvent =
  | A<Actions.PAINT_SPRITE>
  | A<Actions.RENAME_SPRITE, { name: string }>
  | A<Actions.CREATE_FRAME>
  | A<Actions.CREATE_LAYER, { name: string }>
  | A<Actions.DELETE_LAYER, { id: string }>
  | A<Actions.DELETE_FRAME, { id: string }>
  | A<Actions.RESTORE_FRAME, { id: string }>
  | A<Actions.RESTORE_LAYER, { id: string; name: string }>;

export type SpriteInterpreter = Interpreter<Sprite, SpriteState, SpriteEvent>;

const addLayer = (layers: LayerMap, layerId: string, name: string) => {
  return addItem(layers, layerId, {
    layerId,
    name,
  });
};

const addFrame = (frames: FrameMap, frameId: string) => {
  return addItem(frames, frameId, { frameId });
};

export const defaultContext: Sprite = {
  spriteId: 'no',
  frames: {},
  layers: {},
  frameList: [],
  layerList: [],
  version: 0,
  width: 30,
  height: 30,
  name: 'New sprite',
  local: true,
};

const config: ActionConfig<Sprite> = {
  updateListProperties: [
    ['frames', 'frameList'],
    ['layers', 'layerList'],
  ],
};

const spriteMachine = Machine<Sprite, SpriteState, SpriteEvent>({
  id: 'sprite',
  initial: 'setup',
  context: defaultContext,
  states: {
    setup: {
      on: {
        '': {
          target: 'painting',
          actions: assign((context) => {
            const frameId = createId();
            const layerId = createId();
            const layers = addLayer({}, layerId, 'Layer 1');
            const frames = addFrame({}, frameId);
            return {
              ...context,
              layers,
              layerList: Object.keys(layers),
              frames,
              frameList: Object.keys(frames),
            };
          }),
        },
      },
    },
    painting: {
      on: {
        RENAME_SPRITE: {
          actions: assign({
            name: (context, { payload: { name } }) => name,
          }),
        },
        PAINT_SPRITE: {
          actions: assign({
            version: (context) => context.version + 1,
          }),
        },
        CREATE_FRAME: {
          actions: action((context) => {
            const id = createId();
            return {
              frames: addFrame(context.frames, id),
              lastFrameId: id,
            };
          }, config),
        },
        CREATE_LAYER: {
          actions: action((context, { payload: { name } }) => {
            const id = createId();
            return {
              layers: addLayer(context.layers, id, name),
              lastLayerId: id,
            };
          }, config),
        },
        DELETE_LAYER: {
          actions: action((context, { payload: { id } }) => {
            if (isLastItem(context.layers) || !context.layers[id]) {
              return;
            }

            return {
              layers: removeItem(context.layers, id),
            };
          }, config),
        },
        DELETE_FRAME: {
          actions: action((context, { payload: { id } }) => {
            if (isLastItem(context.frames) || !context.frames[id]) {
              return;
            }

            return {
              frames: removeItem(context.frames, id),
            };
          }, config),
        },
        RESTORE_FRAME: {
          actions: action(
            (context, { payload: { id } }) => ({
              frames: addFrame(context.frames, id),
              lastFrameId: id,
            }),
            config,
          ),
        },
        RESTORE_LAYER: {
          actions: action(
            (context, { payload: { id, name } }) => ({
              layers: addLayer(context.layers, id, name),
              lastLayerId: id,
            }),
            config,
          ),
        },
      },
    },
  },
});

export { spriteMachine };
