import { Machine, Interpreter, spawn } from 'xstate';
import {
  SpriteInterpreter,
  spriteMachine,
  defaultContext as spriteDefaultContext,
  Sprite,
} from './sprite';
import { Ref, Actions, A, ActionConfig, action } from '../utils/state';
import { ItemMap, addItem } from '../utils/object';
import { createId } from '../utils';

type SpriteRef = Ref<SpriteInterpreter>;
type SpriteMap = ItemMap<SpriteRef>;

export interface Sprites {
  sprites: SpriteMap;
  spriteList: string[];
  lastSpriteId?: string;
}

interface SpritesState {
  states: {
    setup: {};
    init: {};
  };
}

const addSprite = (sprites: SpriteMap, id: string, data: NewSprite) => {
  return addItem(sprites, id, {
    id,
    ref: spawn(
      spriteMachine.withContext({
        ...spriteDefaultContext,
        ...data,
        id,
      }),
    ) as SpriteInterpreter,
  });
};

const config: ActionConfig<keyof Sprites> = {
  updateListProperties: [['sprites', 'spriteList']],
};

export type NewSprite = Partial<Omit<Sprite, 'id'>>;
type SpritesEvent =
  | A<Actions.CREATE_SPRITE, NewSprite>
  | A<Actions.PUSH_ACTION>;

export type SpritesInterpreter = Interpreter<
  Sprites,
  SpritesState,
  SpritesEvent
>;

export const defaultContext: Sprites = {
  sprites: {},
  spriteList: [],
};

const createSprite = action((context, { payload }) => {
  const id = createId();
  const sprites = addSprite(context.sprites, id, payload);
  return {
    sprites,
    lastSpriteId: id,
  };
}, config);

const spritesMachine = Machine<Sprites, SpritesState, SpritesEvent>({
  id: 'sprites',
  initial: 'setup',
  context: defaultContext,
  states: {
    setup: {
      on: {
        CREATE_SPRITE: {
          target: 'init',
          actions: createSprite,
        },
      },
    },
    init: {
      on: {
        CREATE_SPRITE: {
          actions: createSprite,
        },
      },
    },
  },
});

export { spritesMachine };
