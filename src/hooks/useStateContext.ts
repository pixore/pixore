import React from 'react';
import { Interpreter, EventObject } from 'xstate';

const useStateContext = <C, S, E extends EventObject>(
  service: Interpreter<C, S, E>,
) => {
  const [state, setState] = React.useState(service.state.context);
  React.useEffect(() => {
    service.onChange(setState);

    return () => service.off(setState);
  }, [service]);

  return state;
};
export { useStateContext };
