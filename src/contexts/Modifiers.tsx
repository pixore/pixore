import React from 'react';
import { interpret } from 'xstate';
import {
  modifiersMachine,
  createModifiersActions,
  defaultContext,
  Key,
} from '../state/modifiers';
import { useStateContext } from '../hooks/useStateContext';

const ModifiersContext = React.createContext(defaultContext);

const useModifiers = () => React.useContext(ModifiersContext);
const useModifier = (key: Key) => useModifiers()[key];

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { children } = props;
  const [service] = React.useState(() => interpret(modifiersMachine).start());
  const actions = React.useMemo(() => createModifiersActions(service), [
    service,
  ]);

  const state = useStateContext(service);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      actions.changeModifierState(event.key as Key, true);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      actions.changeModifierState(event.key as Key, false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [actions]);

  return (
    <ModifiersContext.Provider value={state}>
      {children}
    </ModifiersContext.Provider>
  );
};

export { Provider, useModifiers, useModifier };
