import { Machine, Interpreter, assign } from 'xstate';
import { Color, transparent, black } from '../utils/Color';

export interface ArtboardContext {
  id: string;
  primaryColor: Color;
  secondaryColor: Color;
  layer: string;
  frame: string;
  tool: string;
}

interface ArtboardState {
  states: {
    init: {};
  };
}

type ArtboardEvent =
  | { type: 'CHANGE_FRAME'; frame: string }
  | { type: 'CHANGE_LAYER'; layer: string }
  | { type: 'CHANGE_PRIMARY_COLOR'; color: Color }
  | { type: 'CHANGE_SECONDARY_COLOR'; color: Color }
  | { type: 'CHANGE_TOOL'; tool: string };

export type ArtboardInterpreter = Interpreter<
  ArtboardContext,
  ArtboardState,
  ArtboardEvent
>;

export const defaultContext: ArtboardContext = {
  id: 'no',
  tool: 'pen',
  primaryColor: black(),
  secondaryColor: transparent(),
  frame: 'no',
  layer: 'no',
};

const artboardMachine = Machine<ArtboardContext, ArtboardState, ArtboardEvent>({
  id: 'artboard',
  initial: 'init',
  context: defaultContext,
  states: {
    init: {
      on: {
        CHANGE_FRAME: {
          actions: assign((context, { frame }) => ({
            frame,
          })),
        },
        CHANGE_LAYER: {
          actions: assign((context, { layer }) => ({
            layer,
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
      },
    },
  },
});

const createArtboardActions = (service: ArtboardInterpreter) => ({
  changeLayer(layer: string) {
    return service.send({
      type: 'CHANGE_LAYER',
      layer,
    });
  },
  changeFrame(frame: string) {
    service.send({
      type: 'CHANGE_FRAME',
      frame,
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
});

export { artboardMachine, createArtboardActions };
