import React from 'react';
import { interpret } from 'xstate';
import { useArtboardService } from './Artboards';
import { useStateContext } from '../hooks/useStateContext';
import {
  createArtboardActions,
  defaultContext,
  artboardMachine,
} from '../state/artboard';
import { useCurrentSprite } from './Sprites';
import { usePalettes } from './Palettes';

const defaultValueActions = createArtboardActions(interpret(artboardMachine));

const ArtboardStateContext = React.createContext(defaultContext);
const ArtboardActionsContext = React.createContext(defaultValueActions);

const useArtboardActions = () => React.useContext(ArtboardActionsContext);
const useArtboard = () => React.useContext(ArtboardStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const service = useArtboardService();
  const { layerList, frameList } = useCurrentSprite();
  const { paletteList } = usePalettes();
  const state = useStateContext(service);
  const actions = React.useMemo(() => createArtboardActions(service), [
    service,
  ]);

  const { layerId, frameId, paletteId } = state;

  React.useEffect(() => {
    if (!paletteList.includes(paletteId)) {
      actions.changePalette(paletteList[0]);
    }
  }, [actions, paletteList, paletteId]);

  React.useEffect(() => {
    if (!layerList.includes(layerId)) {
      actions.changeLayer(layerList[0]);
    }
  }, [actions, layerList, layerId]);
  React.useEffect(() => {
    if (!frameList.includes(frameId)) {
      actions.changeFrame(frameList[0]);
    }
  }, [actions, frameList, frameId]);

  if (layerId === 'no' || frameId === 'no' || paletteId === 'no') {
    return null;
  }

  const { children } = props;
  return (
    <ArtboardActionsContext.Provider value={actions}>
      <ArtboardStateContext.Provider value={state}>
        {children}
      </ArtboardStateContext.Provider>
    </ArtboardActionsContext.Provider>
  );
};

export { Provider, useArtboard, useArtboardActions };
