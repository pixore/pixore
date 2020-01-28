import { Machine, Interpreter, assign, spawn } from 'xstate';
import {
  ArtboardInterpreter,
  artboardMachine,
  defaultContext as artboardDefaultContext,
  Artboard,
} from './artboard';
import { Ref, Actions, A } from '../utils/state';
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
        ...artboardDefaultContext,
        ...data,
        id,
      }),
    ) as ArtboardInterpreter,
  });
};

export type NewArtboard = Partial<Omit<Artboard, 'id'>>;

type ArtboardsEvent = A<Actions.CREATE_ARTBOARD, NewArtboard>;

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
        CREATE_ARTBOARD: {
          target: 'init',
          actions: assign((context, { payload }) => {
            const id = createId();
            const artboards = addArtboard({}, id, payload);
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
          actions: assign((context, { payload }) => {
            const id = createId();
            const artboards = addArtboard(context.artboards, id, payload);
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

export { artboardsMachine };
