import React from 'react';
import { interpret } from 'xstate';
import curry from 'lodash.curry';
import { defaultContext } from '../state/sprite';
import { useSpriteService } from './Sprites';
import { appMachine } from '../state/app';
import { AppActions, createAppActions } from '../state/actions';
import { useStateContext } from '../hooks/useStateContext';
import { useActions } from './App';

const createSpriteActions = (actions: AppActions, spriteId: string) => ({
  changeName: curry(actions.renameSprite)(spriteId),
  createLayer: curry(actions.createLayer)(spriteId),
  createFrame: () => actions.createFrame(spriteId),
  deleteLayer: curry(actions.deleteLayer)(spriteId),
  deleteFrame: curry(actions.deleteFrame)(spriteId),
  paintSprite: () => actions.paintSprite(spriteId),
});

export type SpriteActions = ReturnType<typeof createSpriteActions>;

const defaultValueActions = createSpriteActions(
  createAppActions(interpret(appMachine)),
  'no',
);

const SpriteStateContext = React.createContext(defaultContext);
const SpriteActionsContext = React.createContext(defaultValueActions);

const useSpriteActions = () => React.useContext(SpriteActionsContext);
const useSprite = () => React.useContext(SpriteStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { children } = props;
  const appActions = useActions();
  const service = useSpriteService();
  const state = useStateContext(service);
  const { id } = state;

  const actions = React.useMemo(() => createSpriteActions(appActions, id), [
    appActions,
    id,
  ]);

  return (
    <SpriteActionsContext.Provider value={actions}>
      <SpriteStateContext.Provider value={state}>
        {children}
      </SpriteStateContext.Provider>
    </SpriteActionsContext.Provider>
  );
};

export { Provider, useSprite, useSpriteActions };
