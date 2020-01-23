import React from 'react';
import {
  defaultContext,
  createSpriteActions,
  spriteMachine,
} from '../state/sprite';
import { useSpriteService } from './Sprites';
import { useStateContext } from '../hooks/useStateContext';
import { interpret } from 'xstate';

const defaultValueActions = createSpriteActions(interpret(spriteMachine));

const SpriteStateContext = React.createContext(defaultContext);
const SpriteActionsContext = React.createContext(defaultValueActions);

const useSpriteActions = () => React.useContext(SpriteActionsContext);
const useSprite = () => React.useContext(SpriteStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { children } = props;
  const service = useSpriteService();
  const state = useStateContext(service);

  const actions = React.useMemo(() => createSpriteActions(service), [service]);

  return (
    <SpriteActionsContext.Provider value={actions}>
      <SpriteStateContext.Provider value={state}>
        {children}
      </SpriteStateContext.Provider>
    </SpriteActionsContext.Provider>
  );
};

export { Provider, useSprite, useSpriteActions };
