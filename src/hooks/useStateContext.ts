import React from 'react';
import { Interpreter, EventObject } from 'xstate';

const useStateContext = <C, S, E extends EventObject>(
  service: Interpreter<C, S, E>,
) => {
  const [state, setState] = React.useState(service.state.context);
  React.useEffect(() => {
    service.onChange(setState);

    setState(service.state.context);
    return () => {
      service.off(setState);
      service.stop();
    };
  }, [service]);

  return state;
};
export { useStateContext };
