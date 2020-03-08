import { Machine, Interpreter, assign } from 'xstate';
import { Color, transparent, black } from '../utils/Color';
import { Actions, A } from '../utils/state';
import { Sprite } from './sprite';

export interface Artboard {
  id: string;
  primaryColor: Color;
  secondaryColor: Color;
  layerId: string;
  frameId: string;
  spriteId: string;
  tool: string;
  paletteId: string;
}

interface ArtboardState {
  states: {
    init: {};
  };
}

type ArtboardEvent =
  | A<Actions.CHANGE_SPRITE, Sprite>
  | A<Actions.SELECT_FRAME, { frameId: string }>
  | A<Actions.SELECT_LAYER, { layerId: string }>
  | A<Actions.CHANGE_PRIMARY_COLOR, Color>
  | A<Actions.CHANGE_SECONDARY_COLOR, Color>
  | A<Actions.CHANGE_TOOL, { tool: string }>
  | A<Actions.CHANGE_PALETTE, { paletteId: string }>;

export type ArtboardInterpreter = Interpreter<
  Artboard,
  ArtboardState,
  ArtboardEvent
>;

export const defaultContext: Artboard = {
  id: 'no',
  tool: 'pen',
  primaryColor: black(),
  secondaryColor: transparent(),
  spriteId: 'no',
  frameId: 'no',
  layerId: 'no',
  paletteId: 'no',
};

const artboardMachine = Machine<Artboard, ArtboardState, ArtboardEvent>({
  id: 'artboard',
  initial: 'init',
  context: defaultContext,
  states: {
    init: {
      on: {
        CHANGE_SPRITE: {
          actions: assign((context, { payload: sprite }) => {
            const { spriteId, frameList, layerList } = sprite;
            return {
              spriteId,
              frameId: frameList[0],
              layerId: layerList[0],
            };
          }),
        },
        SELECT_FRAME: {
          actions: assign((context, { payload: { frameId } }) => ({
            frameId,
          })),
        },
        SELECT_LAYER: {
          actions: assign((context, { payload: { layerId } }) => ({
            layerId,
          })),
        },
        CHANGE_TOOL: {
          actions: assign((context, { payload: { tool } }) => ({
            tool,
          })),
        },
        CHANGE_PRIMARY_COLOR: {
          actions: assign((context, { payload: color }) => ({
            primaryColor: color,
          })),
        },
        CHANGE_SECONDARY_COLOR: {
          actions: assign((context, { payload: color }) => ({
            secondaryColor: color,
          })),
        },
        CHANGE_PALETTE: {
          actions: assign((context, { payload: { paletteId } }) => ({
            paletteId,
          })),
        },
      },
    },
  },
});

export { artboardMachine };
