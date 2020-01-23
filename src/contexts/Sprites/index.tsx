import React from 'react';
import { interpret } from 'xstate';
import invariant from 'invariant';
import {
  spritesMachine,
  createSpritesActions,
  SpritesActions,
  SpritesContext as SpritesContextMachine,
} from '../../state/sprites';

const defaultState = {
  sprites: {},
  spriteList: [],
  currentSprite: '1',
};

const defaultActions = {
  createSprite(_sprite) {
    invariant(false, 'Context not implemented');
  },
};

const SpritesContext = React.createContext<SpritesContextMachine>(defaultState);
const SpritesActionsContext = React.createContext<SpritesActions>(
  defaultActions,
);

const useSpritesActions = () => React.useContext(SpritesActionsContext);
const useSprites = () => React.useContext(SpritesContext);
const useCurrentSprite = () => {
  const { sprites, currentSprite } = useSprites();
  return sprites[currentSprite].ref;
};

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const [service] = React.useState(() => interpret(spritesMachine).start());
  const [state, setState] = React.useState(service.state.context);
  React.useEffect(() => {
    service.onChange(setState);

    return () => service.off(setState);
  }, [service]);

  const { children } = props;
  const actions = React.useMemo(() => createSpritesActions(service), [service]);

  return (
    <SpritesActionsContext.Provider value={actions}>
      <SpritesContext.Provider value={state}>
        {children}
      </SpritesContext.Provider>
    </SpritesActionsContext.Provider>
  );
};

export { Provider, useSpritesActions, useSprites, useCurrentSprite };
