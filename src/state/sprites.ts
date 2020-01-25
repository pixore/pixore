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
type NewSpriteEvent = { type: 'CREATE_SPRITE' } & NewSprite;
type SpritesEvent = NewSpriteEvent;

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
          actions: assign((context, data) => {
            const id = createId();
            const sprites = addSprite({}, id, data);
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
          actions: assign((context, data) => {
            const id = createId();
            const sprites = addSprite(context.sprites, id, data);
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
      ...sprite,
    });

    return context.lastSpriteId;
  },
});

export { spritesMachine, createSpritesActions };
