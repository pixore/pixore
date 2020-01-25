import { Machine, Interpreter, assign } from 'xstate';

export enum Key {
  Spacebar = ' ',
}

export type Modifiers = { [key in Key]?: boolean };

interface ModifiersState {
  states: {
    init: {};
  };
}

type ModifiersEvent = {
  type: 'CHANGE_MODIFIER_STATE';
  key: Key;
  state: boolean;
};

export type ModifiersInterpreter = Interpreter<
  Modifiers,
  ModifiersState,
  ModifiersEvent
>;

export const defaultContext: Modifiers = {};

const modifiersMachine = Machine<Modifiers, ModifiersState, ModifiersEvent>({
  id: 'modifiers',
  initial: 'init',
  context: defaultContext,
  states: {
    init: {
      on: {
        CHANGE_MODIFIER_STATE: {
          actions: assign((context, { key, state }) => {
            return {
              ...context,
              [key]: state,
            };
          }),
        },
      },
    },
  },
});

const createModifiersActions = (service: ModifiersInterpreter) => ({
  changeModifierState(key: Key, state: boolean) {
    return service.send({
      type: 'CHANGE_MODIFIER_STATE',
      key,
      state,
    });
  },
});

export { modifiersMachine, createModifiersActions };
