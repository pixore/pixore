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

export type ModifiersPayload = {
  key: Key;
  state: boolean;
};

type ModifiersEvent = {
  type: 'CHANGE_MODIFIER_STATE';
  payload: ModifiersPayload;
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
          actions: assign((context, { payload: { key, state } }) => {
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
      payload: {
        key,
        state,
      },
    });
  },
});

export { modifiersMachine, createModifiersActions };
