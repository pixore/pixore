import React from 'react';
import invariant from 'invariant';
import { Palette, PaletteActions } from './types';
import { reducer, createActions } from './reducer';
import { usePalettes, usePalettesActions } from '../Palettes';

const defaultValueState = undefined;

const defaultValueActions = {
  changePalette(_payload) {
    invariant(false, 'Context not implemented');
  },
  addColor(_payload) {
    invariant(false, 'Context not implemented');
  },
  removeColor(_payload) {
    invariant(false, 'Context not implemented');
  },
  updateColor(_payload) {
    invariant(false, 'Context not implemented');
  },
};

const PaletteStateContext = React.createContext<Palette>(defaultValueState);
const PaletteActionsContext = React.createContext<PaletteActions>(
  defaultValueActions,
);

const usePaletteActions = () => React.useContext(PaletteActionsContext);
const usePalette = () => React.useContext(PaletteStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const palettes = usePalettes();
  const palettesActions = usePalettesActions();
  const [state, dispatch] = React.useReducer(reducer, defaultValueState);
  const actions = React.useMemo(
    () => createActions(dispatch, palettesActions),
    [dispatch, palettesActions],
  );
  const { changePalette } = actions;

  const paletteIds = React.useMemo(() => Object.keys(palettes), [palettes]);
  if (!state && paletteIds.length !== 0) {
    const artboard = palettes[paletteIds[0]];
    changePalette(artboard);
  }

  const { children } = props;
  return (
    <PaletteActionsContext.Provider value={actions}>
      <PaletteStateContext.Provider value={state}>
        {children}
      </PaletteStateContext.Provider>
    </PaletteActionsContext.Provider>
  );
};

export * from './types';
export { Provider, usePaletteActions, usePalette };
