import React from 'react';
import { reducer, createActions } from './reducer';
import { Key, ModifiersState } from './types';

const defaultValueState = {};

const ModifiersContext = React.createContext<ModifiersState>(defaultValueState);

const useModifiers = () => React.useContext(ModifiersContext);
const useModifier = (key: Key) => useModifiers()[key];

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, defaultValueState);
  const { children } = props;
  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);

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

export * from './types';
export { Provider, useModifiers, useModifier };
