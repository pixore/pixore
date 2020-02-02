import { Machine, Interpreter, spawn } from 'xstate';
import {
  PaletteInterpreter,
  paletteMachine,
  defaultContext as paletteDefaultContext,
  Palette,
} from './palette';
import { Ref, Actions, A, action, ActionConfig } from '../utils/state';
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

const config: ActionConfig<Palettes> = {
  updateListProperties: [['palettes', 'paletteList']],
};

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

const createPalette = action((context, { payload }) => {
  const id = createId();

  return {
    palettes: addPalette(context.palettes, id, payload),
    lastPaletteId: id,
  };
}, config);

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
          actions: createPalette,
        },
      },
    },
    init: {
      on: {
        CREATE_PALETTE: {
          actions: createPalette,
        },
      },
    },
  },
});

export { palettesMachine };
