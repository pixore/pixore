import React from 'react';
import invariant from 'invariant';
import { useArtboardService } from './Artboards';
import { useStateContext } from '../hooks/useStateContext';
import {
  createArtboardActions,
  ArtboardContext,
  defaultContext,
  ArtboardActions,
} from '../state/artboard';
import { useCurrentSprite } from './Sprites';

const defaultValueActions = {
  changeArtboard(_artboard) {
    invariant(false, 'Context not implemented');
  },
  changeLayer(_layer) {
    invariant(false, 'Context not implemented');
  },
  changeFrame(_frame) {
    invariant(false, 'Context not implemented');
  },
  changePrimaryColor(_color) {
    invariant(false, 'Context not implemented');
  },
  changeSecondaryColor(_color) {
    invariant(false, 'Context not implemented');
  },
  changeTool(_tool) {
    invariant(false, 'Context not implemented');
  },
};

const ArtboardStateContext = React.createContext<ArtboardContext>(
  defaultContext,
);
const ArtboardActionsContext = React.createContext<ArtboardActions>(
  defaultValueActions,
);

const useArtboardActions = () => React.useContext(ArtboardActionsContext);
const useArtboard = () => React.useContext(ArtboardStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const service = useArtboardService();
  const { layerList, frameList } = useCurrentSprite();
  const state = useStateContext(service);
  const actions = React.useMemo(() => createArtboardActions(service), [
    service,
  ]);

  const { layer, frame } = state;

  React.useEffect(() => {
    if (!layerList.includes(layer)) {
      actions.changeLayer(layerList[0]);
    }
  }, [actions, layerList, layer]);
  React.useEffect(() => {
    if (!frameList.includes(frame)) {
      actions.changeFrame(frameList[0]);
    }
  }, [actions, frameList, frame]);

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
