import { Machine, StateMachine, Interpreter, sendParent } from 'xstate';

interface FrameContext {
  id: string;
}

type FrameEvent = { type: 'DELETE' } | { type: 'DELETED' };

interface FrameStateSchema {
  states: {
    created: {};
    deleted: {};
  };
}

export type FrameInterpreter = Interpreter<
  FrameContext,
  FrameStateSchema,
  FrameEvent
>;
export type FrameMachine = StateMachine<
  FrameContext,
  FrameStateSchema,
  FrameEvent
>;

const frameMachine: FrameMachine = Machine({
  id: 'frame',
  initial: 'created',
  context: {
    id: '',
  },
  states: {
    created: {
      on: {
        DELETE: {
          actions: sendParent((context: FrameContext) => ({
            type: 'DELETE_FRAME',
            id: context.id,
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

export { frameMachine };
