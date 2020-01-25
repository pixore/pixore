import { Machine, Interpreter, assign, spawn } from 'xstate';
import {
  SpriteInterpreter,
  spriteMachine,
  defaultContext as spriteDefaultContext,
  Sprite,
} from './sprite';
import { Ref } from '../utils/state';
import { ItemMap, addItem } from '../utils/object';
import { createId } from '../utils';

type SpriteRef = Ref<SpriteInterpreter>;
type SpriteMap = ItemMap<SpriteRef>;

export interface Sprites {
  sprites: SpriteMap;
  spriteList: string[];
  currentSprite: string;
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

export type NewSprite = Partial<Omit<Sprite, 'id'>>;
type SpritesEvent = { type: 'CREATE_SPRITE'; payload: NewSprite };

export type SpritesInterpreter = Interpreter<
  Sprites,
  SpritesState,
  SpritesEvent
>;

export const defaultContext: Sprites = {
  sprites: {},
  spriteList: [],
  currentSprite: '',
};

const spritesMachine = Machine<Sprites, SpritesState, SpritesEvent>({
  id: 'sprites',
  initial: 'setup',
  context: defaultContext,
  states: {
    setup: {
      on: {
        CREATE_SPRITE: {
          target: 'init',
          actions: assign((context, { payload }) => {
            const id = createId();
            const sprites = addSprite({}, id, payload);
            return {
              sprites,
              spriteList: Object.keys(sprites),
              lastSpriteId: id,
              currentSprite: id,
            };
          }),
        },
      },
    },
    init: {
      on: {
        CREATE_SPRITE: {
          actions: assign((context, { payload }) => {
            const id = createId();
            const sprites = addSprite(context.sprites, id, payload);
            return {
              sprites,
              spriteList: Object.keys(sprites),
              lastSpriteId: id,
            };
          }),
        },
      },
    },
  },
});

const createSpritesActions = (service: SpritesInterpreter) => ({
  createSprite(sprite: NewSprite): string {
    const { context } = service.send({
      type: 'CREATE_SPRITE',
      payload: sprite,
    });

    return context.lastSpriteId;
  },
});

export { spritesMachine, createSpritesActions };
