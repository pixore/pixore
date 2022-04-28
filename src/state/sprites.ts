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
    setup: Record<string, unknown>;
    init: Record<string, unknown>;
  };
}

const addSprite = (sprites: SpriteMap, spriteId: string, data: NewSprite) => {
  return addItem(sprites, spriteId, {
    id: spriteId,
    ref: spawn(
      spriteMachine.withContext({
        ...spriteDefaultContext,
        ...data,
        spriteId,
      }),
    ) as SpriteInterpreter,
  });
};

const config: ActionConfig<Sprites> = {
  updateListProperties: [['sprites', 'spriteList']],
};

export type NewSprite = Partial<Omit<Sprite, 'id'>>;
type SpritesEvent =
  | A<Actions.ADD_SPRITE, Sprite>
  | A<Actions.CREATE_SPRITE, NewSprite>;

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
        ADD_SPRITE: {
          actions: action((context, { payload }) => {
            return {
              sprites: addSprite(context.sprites, payload.spriteId, payload),
            };
          }, config),
        },
        CREATE_SPRITE: {
          actions: createSprite,
        },
      },
    },
  },
});

export { spritesMachine };
