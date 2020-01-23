import { Machine, Interpreter, assign, spawn } from 'xstate';
import {
  ArtboardInterpreter,
  artboardMachine,
  defaultContext as spriteDefaultContext,
  Artboard,
} from './artboard';
import { Ref } from '../utils/state';
import { ItemMap, addItem } from '../utils/object';
import { createId } from '../utils';

type ArtboardRef = Ref<ArtboardInterpreter>;
type ArtboardMap = ItemMap<ArtboardRef>;

export interface Artboards {
  artboards: ArtboardMap;
  spriteList: string[];
  currentArtboard: string;
  lastArtboardId?: string;
}

interface ArtboardsState {
  states: {
    setup: {};
    init: {};
  };
}

const addArtboard = (artboards: ArtboardMap, id: string, data: NewArtboard) => {
  return addItem(artboards, id, {
    id,
    ref: spawn(
      artboardMachine.withContext({
        ...spriteDefaultContext,
        id,
        ...data,
      }),
    ) as ArtboardInterpreter,
  });
};

export type NewArtboard = Partial<Omit<Artboard, 'id'>>;
type NewArtboardEvent = { type: 'CREATE_ARTBOARD' } & NewArtboard;
type ArtboardsEvent = NewArtboardEvent;

export type ArtboardsInterpreter = Interpreter<
  Artboards,
  ArtboardsState,
  ArtboardsEvent
>;

export const defaultContext: Artboards = {
  artboards: {},
  spriteList: [],
  currentArtboard: '',
};

const artboardsMachine = Machine<Artboards, ArtboardsState, ArtboardsEvent>({
  id: 'artboards',
  initial: 'setup',
  context: defaultContext,
  states: {
    setup: {
      on: {
        '': {
          target: 'init',
          actions: assign(() => {
            const id = createId();
            const artboards = addArtboard({}, id, {});
            return {
              artboards,
              spriteList: Object.keys(artboards),
              currentArtboard: id,
            };
          }),
        },
      },
    },
    init: {
      on: {
        CREATE_ARTBOARD: {
          actions: assign((context, data) => {
            const id = createId();
            const artboards = addArtboard(context.artboards, id, data);
            return {
              artboards,
              spriteList: Object.keys(artboards),
              lastArtboardId: id,
            };
          }),
        },
      },
    },
  },
});

const createArtboardsActions = (service: ArtboardsInterpreter) => ({
  createArtboard(artboard: NewArtboard): string {
    const { context } = service.send({
      type: 'CREATE_ARTBOARD',
      ...artboard,
    });

    return context.lastArtboardId;
  },
});

export { artboardsMachine, createArtboardsActions };
