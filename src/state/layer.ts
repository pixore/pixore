import { Machine, assign, StateMachine, Interpreter, sendParent } from 'xstate';

type LayerEvent =
  | { type: 'CHANGE_NAME'; name: string }
  | { type: 'DELETE' }
  | { type: 'DELETED' };

interface LayerStateSchema {
  states: {
    created: {};
    deleted: {};
  };
}

interface LayerContex {
  id: string;
  name: string;
}

export type LayerInterpreter = Interpreter<
  LayerContex,
  LayerStateSchema,
  LayerEvent
>;
export type LayerMachine = StateMachine<
  LayerContex,
  LayerStateSchema,
  LayerEvent
>;

const layerMachine: LayerMachine = Machine({
  id: 'layer',
  initial: 'created',
  context: {
    id: '',
    name: '',
  },
  states: {
    created: {
      on: {
        CHANGE_NAME: {
          actions: assign((context, { name }) => ({
            ...context,
            name,
          })),
        },
        DELETE: {
          actions: sendParent((context: LayerContex) => ({
            id: context.id,
            type: 'DELETE_LAYER',
          })),
        },
        DELETED: 'deleted',
      },
    },
    deleted: {
      type: 'final',
    },
  },
});

export { layerMachine };
