import {
  Machine,
  Interpreter,
  assign,
  interpret,
  spawn,
  EventObject,
} from 'xstate';
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

export interface App {
  artboards: ArtboardsInterpreter;
  sprites: SpritesInterpreter;
  modifiers: ModifiersInterpreter;
  palettes: PalettesInterpreter;
  windows: WindowsInterpreter;
  undoActions: ActionEvent[];
  reduActions: ActionEvent[];
  currentArtboardId: string;
}

interface AppState {
  states: {
    setup: {};
    init: {};
  };
}

type AppEvent =
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
              context: { lastArtboardId, artboards: e },
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
        PUSH_ACTION: {
          actions: assign({
            undoActions: ({ undoActions }, { payload }) => {
              console.log('pushing', payload.type);

              return undoActions.concat(payload);
            },
          }),
        },
        UNDO: {
          actions: assign((context) => {
            const { undoActions, reduActions, sprites } = context;

            if (undoActions.length === 0) {
              return {};
            }

            const action = undoActions[undoActions.length - 1];
            console.log('undo', action);

            if (action.type === Actions.CREATE_FRAME) {
              const { spriteId, frameId } = action.data;
              const spriteService = ctx(sprites).sprites[spriteId].ref;
              spriteService.send({
                type: Actions.DELETE_FRAME,
                payload: { id: frameId },
              });
            }

            return {
              undoActions: undoActions.slice(0, undoActions.length - 1),
              reduActions: reduActions.concat(
                undoActions.slice(undoActions.length - 1),
              ),
            };
          }),
        },
        REDU: {
          actions: assign((context) => {
            const { undoActions, reduActions, sprites } = context;
            if (reduActions.length === 0) {
              return {};
            }

            const action = reduActions[reduActions.length - 1];

            if (action.type === Actions.CREATE_FRAME) {
              const { spriteId, frameId } = action.data;
              const spriteService = ctx(sprites).sprites[spriteId].ref;

              spriteService.send({
                type: Actions.RESTORE_FRAME,
                payload: {
                  id: frameId,
                },
              });
            }

            return {
              reduActions: reduActions.slice(0, reduActions.length - 1),
              undoActions: undoActions.concat(
                reduActions.slice(reduActions.length - 1),
              ),
            };
          }),
        },
      },
    },
  },
});

export const actions = createAppActions(interpret(appMachine));

export { appMachine };
