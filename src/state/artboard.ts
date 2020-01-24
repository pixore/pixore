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
  | { type: 'CHANGE_FRAME'; frameId: string }
  | { type: 'CHANGE_LAYER'; layerId: string }
  | { type: 'CHANGE_PRIMARY_COLOR'; color: Color }
  | { type: 'CHANGE_SECONDARY_COLOR'; color: Color }
  | { type: 'CHANGE_TOOL'; tool: string }
  | { type: 'CHANGE_PALETTE'; paletteId: string };

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
          actions: assign((context, { frameId }) => ({
            frameId,
          })),
        },
        CHANGE_LAYER: {
          actions: assign((context, { layerId }) => ({
            layerId,
          })),
        },
        CHANGE_TOOL: {
          actions: assign((context, { tool }) => ({
            tool,
          })),
        },
        CHANGE_PRIMARY_COLOR: {
          actions: assign((context, { color }) => ({
            primaryColor: color,
          })),
        },
        CHANGE_SECONDARY_COLOR: {
          actions: assign((context, { color }) => ({
            secondaryColor: color,
          })),
        },
        CHANGE_PALETTE: {
          actions: assign((context, { paletteId }) => ({
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
      layerId,
    });
  },
  changeFrame(frameId: string) {
    service.send({
      type: 'CHANGE_FRAME',
      frameId,
    });
  },
  changePrimaryColor(color: Color) {
    service.send({
      type: 'CHANGE_PRIMARY_COLOR',
      color,
    });
  },
  changeSecondaryColor(color: Color) {
    service.send({
      type: 'CHANGE_SECONDARY_COLOR',
      color,
    });
  },
  changeTool(tool: string) {
    service.send({
      type: 'CHANGE_TOOL',
      tool,
    });
  },
  changePalette(paletteId: string) {
    service.send({
      type: 'CHANGE_PALETTE',
      paletteId,
    });
  },
});

export type ArtboardActions = ReturnType<typeof createArtboardActions>;

export { artboardMachine, createArtboardActions };
