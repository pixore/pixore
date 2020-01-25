import React from 'react';
import { interpret } from 'xstate';
import { useStateContext } from '../hooks/useStateContext';
import {
  palettesMachine,
  createPalettesActions,
  defaultContext,
} from '../state/palettes';
import { createPaletteActions } from '../state/palette';
import { useAppState } from './App';

const defaultActions = createPalettesActions(interpret(palettesMachine));
const PalettesContext = React.createContext(defaultContext);
const PalettesActionsContext = React.createContext(defaultActions);

const usePalettesActions = () => React.useContext(PalettesActionsContext);
const usePalettes = () => React.useContext(PalettesContext);
const usePaletteService = (id: string) => {
  const { palettes } = usePalettes();
  const paletteRef = palettes[id];
  if (paletteRef) {
    return paletteRef.ref;
  }
};
const usePalette = (id: string) => {
  const service = usePaletteService(id);
  if (service) {
    return service.state.context;
  }
};
const usePaletteActions = (id: string) => {
  const service = usePaletteService(id);
  if (service) {
    // yes, this creates the actions every time
    // TODO: check if it's needed memoize createPaletteActions
    return createPaletteActions(service);
  }
};

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { palettes: service } = useAppState();
  const { children } = props;
  const actions = React.useMemo(() => createPalettesActions(service), [
    service,
  ]);
  const state = useStateContext(service);

  return (
    <PalettesActionsContext.Provider value={actions}>
      <PalettesContext.Provider value={state}>
        {children}
      </PalettesContext.Provider>
    </PalettesActionsContext.Provider>
  );
};

export {
  Provider,
  usePalettes,
  usePalettesActions,
  usePalette,
  usePaletteService,
  usePaletteActions,
};
