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
import {
  ArtboardsInterpreter,
  artboardsMachine,
  createArtboardsActions,
} from './artboards';
import {
  SpritesInterpreter,
  spritesMachine,
  createSpritesActions,
} from './sprites';
import {
  ModifiersInterpreter,
  modifiersMachine,
  createModifiersActions,
} from './modifiers';
import {
  PalettesInterpreter,
  palettesMachine,
  createPalettesActions,
} from './palettes';
import {
  WindowsInterpreter,
  windowsMachine,
  createWindowsActions,
} from './windows';
import { Color } from '../utils/Color';

export interface App {
  artboards: ArtboardsInterpreter;
  sprites: SpritesInterpreter;
  modifiers: ModifiersInterpreter;
  palettes: PalettesInterpreter;
  windows: WindowsInterpreter;
}

interface AppState {
  states: {
    setup: {};
    init: {};
  };
}

type AppEvent = {
  type: 'NOOP';
};

export type AppInterpreter = Interpreter<App, AppState, AppEvent>;

export const defaultContext: App = {
  artboards: interpret(artboardsMachine),
  sprites: interpret(spritesMachine),
  modifiers: interpret(modifiersMachine),
  palettes: interpret(palettesMachine),
  windows: interpret(windowsMachine),
};

const createActions = (context: App) => ({
  artboards: createArtboardsActions(context.artboards),
  sprites: createSpritesActions(context.sprites),
  modifiers: createModifiersActions(context.modifiers),
  palettes: createPalettesActions(context.palettes),
  windows: createWindowsActions(context.windows),
});

const getFirstNonTransparentColor = (colors: Color[]) => {
  return colors.find((color) => color.alpha !== 0);
};

const actions = createActions(defaultContext);
const ctx = <C, S, E extends EventObject>(service: Interpreter<C, S, E>) => {
  return service.state.context;
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
          actions: assign(() => {
            const context: App = {
              artboards: spawn(artboardsMachine),
              sprites: spawn(spritesMachine),
              modifiers: spawn(modifiersMachine),
              palettes: spawn(palettesMachine),
              windows: spawn(windowsMachine),
            };

            Object.assign(actions, createActions(context));

            const spriteId = actions.sprites.createSprite(spriteDefaultContext);
            const paletteId = actions.palettes.createPalette(defaultPalette);

            const palette = ctx(ctx(context.palettes).palettes[paletteId].ref);

            const primaryColor = getFirstNonTransparentColor(palette.colors);

            const sprite = ctx(ctx(context.sprites).sprites[spriteId].ref);
            const layerId = sprite.layerList[0];
            const frameId = sprite.frameList[0];

            actions.artboards.createArtboard({
              ...artboardDefaultContext,
              paletteId,
              layerId,
              frameId,
              primaryColor,
            });

            return context;
          }),
        },
      },
    },
    init: {},
  },
});

export { appMachine };
