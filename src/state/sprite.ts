import { Machine, assign, Interpreter } from 'xstate';

import { ItemMap, addItem, removeItem, isLastItem } from '../utils/object';
import { createId } from '../utils';

interface SpriteState {
  states: {
    setup: {};
    painting: {};
  };
}

interface FrameContext {
  id: string;
}

interface LayerContex {
  id: string;
  name: string;
}

type FrameMap = ItemMap<FrameContext>;
type LayerMap = ItemMap<LayerContex>;

export interface SpriteContext {
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
  | { type: 'RENAME'; name: string }
  | { type: 'CREATE_FRAME' }
  | { type: 'CREATE_LAYER'; name: string }
  | { type: 'DELETE_LAYER'; id: string }
  | { type: 'DELETE_FRAME'; id: string };

export type SpriteInterpreter = Interpreter<
  SpriteContext,
  SpriteState,
  SpriteEvent
>;

const addLayer = (layers: LayerMap, id: string, name: string) => {
  return addItem(layers, id, {
    id,
    name,
  });
};

const addFrame = (frames: FrameMap, id: string) => {
  return addItem(frames, id, { id });
};

export const defaultContext = {
  id: '1',
  frames: {},
  layers: {},
  frameList: [],
  layerList: [],
  version: 0,
  width: 30,
  height: 30,
  name: 'New sprite',
};

const spriteMachine = Machine<SpriteContext, SpriteState, SpriteEvent>({
  id: 'sprite',
  initial: 'setup',
  context: defaultContext,
  states: {
    setup: {
      on: {
        '': {
          target: 'painting',
          actions: assign((context) => {
            const id = createId();
            const layers = addLayer({}, id, 'Layer 1');
            const frames = addFrame({}, id);
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
            name: (context, { name }) => name,
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
          actions: assign((context, { name }) => {
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
          actions: assign((context, { id }) => {
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
          actions: assign((context, { id }) => {
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

export interface SpriteActions {
  changeName: (name: string) => void;
  createLayer: (name: string) => string;
  createFrame: () => string;
  deleteLayer: (layerId: string) => void;
  deleteFrame: (frameId: string) => void;
  createVersion: () => void;
}

const createSpriteActions = (service: SpriteInterpreter): SpriteActions => ({
  changeName(name: string) {
    service.send({
      type: 'RENAME',
      name,
    });
  },
  createLayer(name: string): string {
    const { context } = service.send({
      type: 'CREATE_LAYER',
      name,
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
      id,
    });
  },
  deleteFrame(id: string) {
    service.send({
      type: 'DELETE_FRAME',
      id,
    });
  },
  createVersion() {
    service.send({
      type: 'NEW_VERSION',
    });
  },
});

export { spriteMachine, createSpriteActions };
