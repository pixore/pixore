import React from 'react';
import { interpret } from 'xstate';
import { useStateContext } from '../hooks/useStateContext';
import { defaultContext } from '../state/palettes';
import { useAppState, useAppActions } from './App';
import { AppActions, createAppActions } from '../state/actions';
import { appMachine } from '../state/app';
import curry from 'lodash.curry';

const createPalettesActions = ({ createPalette }: AppActions) => ({
  createPalette,
});

const createPaletteActions = (actions: AppActions, paletteId: string) => ({
  addColor: curry(actions.addColor)(paletteId),
  removeColor: curry(actions.removeColor)(paletteId),
  changeColor: curry(actions.changeColor)(paletteId),
});

const defaultActions = createPalettesActions(
  createAppActions(interpret(appMachine)),
);

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
  const appActions = useAppActions();
  return React.useMemo(() => createPaletteActions(appActions, id), [
    appActions,
    id,
  ]);
};

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { palettes: service } = useAppState();
  const { children } = props;
  const appActions = useAppActions();
  const actions = React.useMemo(() => createPalettesActions(appActions), [
    appActions,
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
