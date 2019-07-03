import React from 'react';
import invariant from 'invariant';
import { reducer, createActions } from './reducer';
import { SpritesState, SpritesActions } from './types';

const defaultState = {};
const defaultActions = {
  addSprite(sprite) {
    invariant(false, 'Context not implemented');
  },
};

const SpritesContext = React.createContext<SpritesState>(defaultState);
const SpritesActionsContext = React.createContext<SpritesActions>(
  defaultActions,
);

const useSpritesActions = () => React.useContext(SpritesActionsContext);
const useSprites = () => React.useContext(SpritesContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const [sprites, dispatch] = React.useReducer(reducer, defaultState);
  const { children } = props;
  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);

  return (
    <SpritesActionsContext.Provider value={actions}>
      <SpritesContext.Provider value={sprites}>
        {children}
      </SpritesContext.Provider>
    </SpritesActionsContext.Provider>
  );
};

export { Provider, useSpritesActions, useSprites };
