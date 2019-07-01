import React from 'react';
import invariant from 'invariant';
import { ArtboardsState, ArtboardsActions } from './types';
import { reducer, createActions } from './reducer';

const defaultValueState = {};

const defaultValueActions = {
  center(payload) {
    invariant(false, 'Context not implemented');
  },
  changeScale(id: string, scale: number) {
    invariant(false, 'Context not implemented');
  },
};

const ArtboardsStateContext = React.createContext<ArtboardsState>(
  defaultValueState,
);
const ArtboardsActionsContext = React.createContext<ArtboardsActions>(
  defaultValueActions,
);

const useArtboardsContext = () => React.useContext(ArtboardsStateContext);
const useArtboardsActions = () => React.useContext(ArtboardsActionsContext);
const useArtboard = (id: string) => {
  const artboards = useArtboardsContext();
  return artboards[id];
};

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

const Provider: React.FC<ProviderProps> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, defaultValueState);
  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);
  const { children } = props;
  return (
    <ArtboardsActionsContext.Provider value={actions}>
      <ArtboardsStateContext.Provider value={state}>
        {children}
      </ArtboardsStateContext.Provider>
    </ArtboardsActionsContext.Provider>
  );
};

export * from './types';
export { Provider, useArtboard, useArtboardsContext, useArtboardsActions };
