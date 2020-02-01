import { Machine, Interpreter, spawn } from 'xstate';
import {
  ArtboardInterpreter,
  artboardMachine,
  defaultContext as artboardDefaultContext,
  Artboard,
} from './artboard';
import { Actions, A, action, ActionConfig } from '../utils/state';
import { ItemMap, addItem } from '../utils/object';
import { createId } from '../utils';

type ArtboardMap = ItemMap<ArtboardInterpreter>;

export interface Artboards {
  artboards: ArtboardMap;
  artboardList: string[];
  lastArtboardId?: string;
}

interface ArtboardsState {
  states: {
    setup: {};
    init: {};
  };
}

const config: ActionConfig<keyof Artboards> = {
  updateListProperties: [['artboards', 'artboardList']],
};

const addArtboard = (artboards: ArtboardMap, id: string, data: NewArtboard) => {
  return addItem(
    artboards,
    id,
    spawn(
      artboardMachine.withContext({
        ...artboardDefaultContext,
        ...data,
        id,
      }),
    ) as ArtboardInterpreter,
  );
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
  artboardList: [],
};

const createArtboard = action((context, { payload }) => {
  const id = createId();

  return {
    artboards: addArtboard(context.artboards, id, payload),
    lastArtboardId: id,
  };
}, config);

const artboardsMachine = Machine<Artboards, ArtboardsState, ArtboardsEvent>({
  id: 'artboards',
  initial: 'setup',
  context: defaultContext,
  states: {
    setup: {
      on: {
        CREATE_ARTBOARD: {
          target: 'init',
          actions: createArtboard,
        },
      },
    },
    init: {
      on: {
        CREATE_ARTBOARD: {
          actions: createArtboard,
        },
      },
    },
  },
});

export { artboardsMachine };
