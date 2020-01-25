import { Machine, assign, Interpreter } from 'xstate';
import { Frame, Layer } from '../types';
import { ItemMap, addItem, removeItem, isLastItem } from '../utils/object';
import { createId } from '../utils';

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
  | { type: 'NEW_VERSION' }
  | { type: 'RENAME'; payload: { name: string } }
  | { type: 'CREATE_FRAME' }
  | { type: 'CREATE_LAYER'; payload: { name: string } }
  | { type: 'DELETE_LAYER'; payload: { id: string } }
  | { type: 'DELETE_FRAME'; payload: { id: string } };

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
        NEW_VERSION: {
          actions: assign({
            version: (context) => context.version + 1,
          }),
        },
        CREATE_FRAME: {
          actions: assign((context) => {
            const id = createId();
            const frames = addFrame(context.frames, id);
            return {
              frames,
              frameList: Object.keys(frames),
              lastFrameId: id,
            };
          }),
        },
        CREATE_LAYER: {
          actions: assign((context, { payload: { name } }) => {
            const id = createId();
            const layers = addLayer(context.layers, id, name);
            return {
              layers,
              layerList: Object.keys(layers),
              lastLayerId: id,
            };
          }),
        },
        DELETE_LAYER: {
          actions: assign((context, { payload: { id } }) => {
            if (isLastItem(context.layers)) {
              return context;
            }

            const layer = context.layers[id];
            if (layer) {
              const layers = removeItem(context.layers, id);

              return {
                layers,
                layerList: Object.keys(layers),
              };
            }

            return context;
          }),
        },
        DELETE_FRAME: {
          actions: assign((context, { payload: { id } }) => {
            if (isLastItem(context.frames)) {
              return context;
            }

            const frame = context.frames[id];
            if (frame) {
              const frames = removeItem(context.frames, id);
              return {
                frames,
                frameList: Object.keys(frames),
              };
            }

            return context;
          }),
        },
      },
    },
  },
});

const createSpriteActions = (service: SpriteInterpreter) => ({
  changeName(name: string) {
    service.send({
      type: 'RENAME',
      payload: { name },
    });
  },
  createLayer(name: string): string {
    const { context } = service.send({
      type: 'CREATE_LAYER',
      payload: { name },
    });
    return context.lastLayerId;
  },
  createFrame(): string {
    const { context } = service.send({
      type: 'CREATE_FRAME',
    });
    return context.lastFrameId;
  },
  deleteLayer(id: string) {
    service.send({
      type: 'DELETE_LAYER',
      payload: { id },
    });
  },
  deleteFrame(id: string) {
    service.send({
      type: 'DELETE_FRAME',
      payload: { id },
    });
  },
  createVersion() {
    service.send({
      type: 'NEW_VERSION',
    });
  },
});

export type SpriteActions = ReturnType<typeof createSpriteActions>;

export { spriteMachine, createSpriteActions };
