import { Machine, Interpreter, assign, spawn, sendParent } from 'xstate';
import {
  PaletteInterpreter,
  paletteMachine,
  defaultContext as paletteDefaultContext,
  Palette,
} from './palette';
import { Ref, Actions, A } from '../utils/state';
import { ItemMap, addItem } from '../utils/object';
import { createId } from '../utils';

type PaletteRef = Ref<PaletteInterpreter>;
type PaletteMap = ItemMap<PaletteRef>;

export interface Palettes {
  palettes: PaletteMap;
  paletteList: string[];
  lastPaletteId?: string;
}

interface PalettesState {
  states: {
    setup: {};
    init: {};
  };
}

const addPalette = (artboards: PaletteMap, id: string, data: NewPalette) => {
  return addItem(artboards, id, {
    id,
    ref: spawn(
      paletteMachine.withContext({
        ...paletteDefaultContext,
        ...data,
        id,
      }),
    ) as PaletteInterpreter,
  });
};

export type NewPalette = Partial<Omit<Palette, 'id'>>;
type PalettesEvent =
  | A<Actions.CREATE_PALETTE, NewPalette>
  | A<Actions.PUSH_ACTION, NewPalette>;

export type PalettesInterpreter = Interpreter<
  Palettes,
  PalettesState,
  PalettesEvent
>;

export const defaultContext: Palettes = {
  palettes: {},
  paletteList: [],
};

const palettesMachine = Machine<Palettes, PalettesState, PalettesEvent>({
  id: 'palettes',
  initial: 'setup',
  context: defaultContext,
  states: {
    setup: {
      on: {
        CREATE_PALETTE: {
          target: 'init',
          actions: assign((context, { payload }) => {
            const id = createId();
            const palettes = addPalette({}, id, payload);

            return {
              palettes,
              paletteList: Object.keys(palettes),
              lastPaletteId: id,
            };
          }),
        },
      },
    },
    init: {
      on: {
        CREATE_PALETTE: {
          actions: assign((context, { payload }) => {
            const id = createId();
            const palettes = addPalette(context.palettes, id, payload);
            return {
              palettes,
              paletteList: Object.keys(palettes),
              lastPaletteId: id,
            };
          }),
        },
        PUSH_ACTION: {
          actions: sendParent((context, event) => event),
        },
      },
    },
  },
});

export { palettesMachine };
