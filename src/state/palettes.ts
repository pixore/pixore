import { Machine, Interpreter, assign, spawn } from 'xstate';
import {
  PaletteInterpreter,
  paletteMachine,
  defaultContext as paletteDefaultContext,
  Palette,
} from './palette';
import { Ref } from '../utils/state';
import { ItemMap, addItem } from '../utils/object';
import { createId } from '../utils';
import defaultPalette from '../default-palette.json';

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
        id,
        ...data,
      }),
    ) as PaletteInterpreter,
  });
};

export type NewPalette = Partial<Omit<Palette, 'id'>>;
type NewPaletteEvent = { type: 'CREATE_PALETTE' } & NewPalette;
type PalettesEvent = NewPaletteEvent;

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
        '': {
          target: 'init',
          actions: assign(() => {
            const id = createId();
            const palettes = addPalette({}, id, defaultPalette);
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
          actions: assign((context, data) => {
            const id = createId();
            const palettes = addPalette(context.palettes, id, data);
            return {
              palettes,
              paletteList: Object.keys(palettes),
              lastPaletteId: id,
            };
          }),
        },
      },
    },
  },
});

const createPalettesActions = (service: PalettesInterpreter) => ({
  createPalette(palette: NewPalette): string {
    const { context } = service.send({
      type: 'CREATE_PALETTE',
      ...palette,
    });

    return context.lastPaletteId;
  },
});

export { palettesMachine, createPalettesActions };
