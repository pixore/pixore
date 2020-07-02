import { Machine, Interpreter, assign } from 'xstate';
import Arr from '@pixore/subdivide/dist/utils/Arr';
import { Color, isEqual } from '../utils/Color';
import { Actions, A } from '../utils/state';

export interface Palette {
  id: string;
  name: string;
  colors: Color[];
}

interface PaletteState {
  states: {
    init: Record<string, unknown>;
  };
}

type PaletteEvent =
  | A<Actions.ADD_COLOR, Color>
  | A<Actions.REMOVE_COLOR, Color>
  | A<Actions.CHANGE_COLOR, { color: Color; newColor: Color }>;

export type PaletteInterpreter = Interpreter<
  Palette,
  PaletteState,
  PaletteEvent
>;

export const defaultContext: Palette = {
  id: 'no',
  name: 'no',
  colors: [],
};

const paletteMachine = Machine<Palette, PaletteState, PaletteEvent>({
  id: 'palette',
  initial: 'init',
  context: defaultContext,
  states: {
    init: {
      on: {
        ADD_COLOR: {
          actions: assign(({ colors }, { payload }) => ({
            colors: colors.concat(payload),
          })),
        },
        REMOVE_COLOR: {
          actions: assign(({ colors }, { payload }) => ({
            colors: colors.filter((current) => !isEqual(payload, current)),
          })),
        },
        CHANGE_COLOR: {
          actions: assign(({ colors }, { payload: { color, newColor } }) => ({
            colors: Arr.replaceItem(colors, color, [newColor]),
          })),
        },
      },
    },
  },
});

export { paletteMachine };
