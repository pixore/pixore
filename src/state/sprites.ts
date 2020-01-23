import { Machine, Interpreter, assign, spawn } from 'xstate';
import {
  SpriteInterpreter,
  spriteMachine,
  defaultContext as spriteDefaultContext,
  SpriteContext,
} from './sprite';
import { Ref } from '../utils/state';
import { ItemMap, addItem } from '../utils/object';
import { createId } from '../utils';

type SpriteRef = Ref<SpriteInterpreter>;
type SpriteMap = ItemMap<SpriteRef>;

export interface SpritesContext {
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
        id,
        ...data,
      }),
    ) as SpriteInterpreter,
  });
};

export type NewSprite = Partial<Omit<SpriteContext, 'id'>>;
type NewSpriteEvent = { type: 'CREATE_SPRITE' } & NewSprite;
type SpritesEvent = NewSpriteEvent;

export type SpritesInterpreter = Interpreter<
  SpritesContext,
  SpritesState,
  SpritesEvent
>;

export const defaultContext: SpritesContext = {
  sprites: {},
  spriteList: [],
  currentSprite: '',
};

const spritesMachine = Machine<SpritesContext, SpritesState, SpritesEvent>({
  id: 'sprites',
  initial: 'setup',
  context: defaultContext,
  states: {
    setup: {
      on: {
        '': {
          target: 'init',
          actions: assign(() => {
            const id = createId();
            const sprites = addSprite({}, id, {});
            return {
              sprites,
              spriteList: Object.keys(sprites),
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
