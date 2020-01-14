import React from 'react';
import invariant from 'invariant';
import { reducer, createActions } from './reducer';
import { PalettesActions, PalettesState } from './types';

const defaultState = {};
const defaultActions = {
  addPalette(_payload) {
    invariant(false, 'Context not implemented');
  },
  removePalette(_payload) {
    invariant(false, 'Context not implemented');
  },
  updatePalette(_payload) {
    invariant(false, 'Context not implemented');
  },
};
const PalettesContext = React.createContext<PalettesState>(defaultState);
const PalettesActionsContext = React.createContext<PalettesActions>(
  defaultActions,
);

const usePalettesActions = () => React.useContext(PalettesActionsContext);
const usePalettes = () => React.useContext(PalettesContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const [palettes, dispatch] = React.useReducer(reducer, defaultState);
  const { children } = props;
  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);

  return (
    <PalettesActionsContext.Provider value={actions}>
      <PalettesContext.Provider value={palettes}>
        {children}
      </PalettesContext.Provider>
    </PalettesActionsContext.Provider>
  );
};

export { Provider, usePalettes, usePalettesActions };
