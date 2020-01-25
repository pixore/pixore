import { Machine, Interpreter, assign } from 'xstate';
import { Color, transparent, black } from '../utils/Color';

export interface Artboard {
  id: string;
  primaryColor: Color;
  secondaryColor: Color;
  layerId: string;
  frameId: string;
  tool: string;
  paletteId: string;
}

interface ArtboardState {
  states: {
    init: {};
  };
}

type ArtboardEvent =
  | { type: 'CHANGE_FRAME'; payload: { frameId: string } }
  | { type: 'CHANGE_LAYER'; payload: { layerId: string } }
  | { type: 'CHANGE_PRIMARY_COLOR'; payload: Color }
  | { type: 'CHANGE_SECONDARY_COLOR'; payload: Color }
  | { type: 'CHANGE_TOOL'; payload: { tool: string } }
  | { type: 'CHANGE_PALETTE'; payload: { paletteId: string } };

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
        CHANGE_FRAME: {
          actions: assign((context, { payload: { frameId } }) => ({
            frameId,
          })),
        },
        CHANGE_LAYER: {
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

const createArtboardActions = (service: ArtboardInterpreter) => ({
  changeLayer(layerId: string) {
    return service.send({
      type: 'CHANGE_LAYER',
      payload: { layerId },
    });
  },
  changeFrame(frameId: string) {
    service.send({
      type: 'CHANGE_FRAME',
      payload: { frameId },
    });
  },
  changePrimaryColor(color: Color) {
    service.send({
      type: 'CHANGE_PRIMARY_COLOR',
      payload: color,
    });
  },
  changeSecondaryColor(color: Color) {
    service.send({
      type: 'CHANGE_SECONDARY_COLOR',
      payload: color,
    });
  },
  changeTool(tool: string) {
    service.send({
      type: 'CHANGE_TOOL',
      payload: { tool },
    });
  },
  changePalette(paletteId: string) {
    service.send({
      type: 'CHANGE_PALETTE',
      payload: { paletteId },
    });
  },
});

export type ArtboardActions = ReturnType<typeof createArtboardActions>;

export { artboardMachine, createArtboardActions };
