import { Machine, Interpreter, assign, interpret, spawn } from 'xstate';
import { defaultContext as artboardDefaultContext } from './artboard';
import defaultPalette from '../default-palette.json';
import { defaultContext as spriteDefaultContext } from './sprite';
import { ArtboardsInterpreter, artboardsMachine } from './artboards';
import { SpritesInterpreter, spritesMachine } from './sprites';
import { ModifiersInterpreter, modifiersMachine } from './modifiers';
import { PalettesInterpreter, palettesMachine } from './palettes';
import { WindowsInterpreter, windowsMachine } from './windows';
import { Color } from '../utils/Color';
import { ActionEvent, Actions, ctx } from '../utils/state';
import { createAppActions } from './actions';
import { undo, redu } from './history';
import { User } from '../types';

export interface App {
  artboards: ArtboardsInterpreter;
  sprites: SpritesInterpreter;
  modifiers: ModifiersInterpreter;
  palettes: PalettesInterpreter;
  windows: WindowsInterpreter;
  undoActions: ActionEvent[];
  reduActions: ActionEvent[];
  currentArtboardId: string;
  user?: User;
}

interface AppState {
  states: {
    setup: {};
    init: {};
  };
}

type AppEvent =
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'PUSH_ACTION'; payload: ActionEvent }
  | { type: 'UNDO' }
  | { type: 'REDU' };

export type AppInterpreter = Interpreter<App, AppState, AppEvent>;

export const defaultContext: App = {
  artboards: interpret(artboardsMachine),
  sprites: interpret(spritesMachine),
  modifiers: interpret(modifiersMachine),
  palettes: interpret(palettesMachine),
  windows: interpret(windowsMachine),
  undoActions: [],
  reduActions: [],
  currentArtboardId: 'no',
};

const getFirstNonTransparentColor = (colors: Color[]) => {
  return colors.find((color) => color.alpha !== 0);
};

const appMachine = Machine<App, AppState, AppEvent>({
  id: 'app',
  initial: 'setup',
  context: defaultContext,
  states: {
    setup: {
      on: {
        '': {
          target: 'init',
          actions: assign((context) => {
            const artboards = spawn(artboardsMachine);
            const sprites = spawn(spritesMachine);
            const modifiers = spawn(modifiersMachine);
            const palettes = spawn(palettesMachine);
            const windows = spawn(windowsMachine);

            const {
              context: { lastSpriteId: spriteId, sprites: spriteMap },
            } = sprites.send({
              type: Actions.CREATE_SPRITE,
              payload: spriteDefaultContext,
            });
            const {
              context: { lastPaletteId: paletteId, palettes: paletteMap },
            } = palettes.send({
              type: Actions.CREATE_PALETTE,
              payload: defaultPalette,
            });

            const palette = ctx(paletteMap[paletteId].ref);

            const primaryColor = getFirstNonTransparentColor(palette.colors);

            const sprite = ctx(spriteMap[spriteId].ref);
            const layerId = sprite.layerList[0];
            const frameId = sprite.frameList[0];

            const {
              context: { lastArtboardId },
            } = artboards.send({
              type: Actions.CREATE_ARTBOARD,
              payload: {
                ...artboardDefaultContext,
                paletteId,
                layerId,
                frameId,
                spriteId,
                primaryColor,
              },
            });

            return {
              ...context,
              artboards,
              sprites,
              modifiers,
              palettes,
              windows,
              currentArtboardId: lastArtboardId,
            };
          }),
        },
      },
    },
    init: {
      on: {
        UPDATE_USER: {
          actions: assign((context, event) => ({
            user: event.payload,
          })),
        },
        PUSH_ACTION: {
          actions: assign((context, { payload }) => {
            const { undoActions } = context;
            return {
              undoActions: undoActions.concat(payload),
              reduActions: [],
            };
          }),
        },
        UNDO: {
          actions: assign(undo),
        },
        REDU: {
          actions: assign(redu),
        },
      },
    },
  },
});

export const actions = createAppActions(interpret(appMachine));

export { appMachine };
