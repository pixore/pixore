import { EventObject, Interpreter } from 'xstate';

export interface Ref<T> {
  id: string;
  ref: T;
}

const ctx = <C, S, E extends EventObject>(service: Interpreter<C, S, E>) => {
  return service.state.context;
};

export { ctx };
