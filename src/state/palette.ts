import { Machine, Interpreter, assign } from 'xstate';
import Arr from '@pixore/subdivide/dist/utils/Arr';
import { Color, isEqual } from '../utils/Color';

export interface Palette {
  id: string;
  name: string;
  colors: Color[];
}

interface PaletteState {
  states: {
    init: {};
  };
}

type PaletteEvent =
  | { type: 'ADD_COLOR'; color: Color }
  | { type: 'REMOVE_COLOR'; color: Color }
  | { type: 'CHANGE_COLOR'; color: Color; newColor: Color };

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
          actions: assign(({ colors }, { color }) => ({
            colors: colors.concat(color),
          })),
        },
        REMOVE_COLOR: {
          actions: assign(({ colors }, { color }) => ({
            colors: colors.filter((current) => !isEqual(color, current)),
          })),
        },
        CHANGE_COLOR: {
          actions: assign(({ colors }, { color, newColor }) => ({
            colors: Arr.replaceItem(colors, color, [newColor]),
          })),
        },
      },
    },
  },
});

const createPaletteActions = (service: PaletteInterpreter) => ({
  addColor(color: Color) {
    service.send({
      type: 'ADD_COLOR',
      color,
    });
  },
  removeColor(color: Color) {
    service.send({
      type: 'REMOVE_COLOR',
      color,
    });
  },
  changeColor(color: Color, newColor: Color) {
    service.send({
      type: 'CHANGE_COLOR',
      color,
      newColor,
    });
  },
});

export type PaletteActions = ReturnType<typeof createPaletteActions>;

export { paletteMachine, createPaletteActions };
