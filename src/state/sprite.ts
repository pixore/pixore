import { Machine, assign, Interpreter } from 'xstate';
import { Frame, Layer } from '../types';
import { ItemMap, addItem, removeItem, isLastItem } from '../utils/object';
import { createId } from '../utils';
import { Actions, A, action, ActionConfig } from '../utils/state';

interface SpriteState {
  states: {
    setup: {};
    painting: {};
  };
}

type FrameMap = ItemMap<Frame>;
type LayerMap = ItemMap<Layer>;

export interface Sprite {
  id: string;
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
}

type SpriteEvent =
  | A<Actions.PAINT_SPRITE>
  | A<Actions.RENAME, { name: string }>
  | A<Actions.CREATE_FRAME>
  | A<Actions.CREATE_LAYER, { name: string }>
  | A<Actions.DELETE_LAYER, { id: string }>
  | A<Actions.DELETE_FRAME, { id: string }>
  | A<Actions.RESTORE_FRAME, { id: string }>
  | A<Actions.RESTORE_LAYER, { id: string; name: string }>;

export type SpriteInterpreter = Interpreter<Sprite, SpriteState, SpriteEvent>;

const addLayer = (layers: LayerMap, id: string, name: string) => {
  return addItem(layers, id, {
    id,
    name,
  });
};

const addFrame = (frames: FrameMap, id: string) => {
  return addItem(frames, id, { id });
};

export const defaultContext: Sprite = {
  id: 'no',
  frames: {},
  layers: {},
  frameList: [],
  layerList: [],
  version: 0,
  width: 30,
  height: 30,
  name: 'New sprite',
};

const config: ActionConfig<keyof Sprite> = {
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
        RENAME: {
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
