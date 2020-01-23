import React from 'react';
import invariant from 'invariant';
import {
  SpriteContext,
  defaultContext,
  SpriteActions,
  createSpriteActions,
} from '../../state/sprite';
import { useCurrentSprite } from '../Sprites';

const defaultValueActions = {
  changeName(_name) {
    invariant(false, 'Context not implemented');
  },
  createLayer(_newLayer) {
    invariant(false, 'Context not implemented');
    return '';
  },
  createFrame() {
    invariant(false, 'Context not implemented');
    return '';
  },
  createVersion() {
    invariant(false, 'Context not implemented');
  },
  deleteFrame(frameId) {
    invariant(false, 'Context not implemented');
  },
  deleteLayer(layerId) {
    invariant(false, 'Context not implemented');
  },
};

const SpriteStateContext = React.createContext<SpriteContext>(defaultContext);
const SpriteActionsContext = React.createContext<SpriteActions>(
  defaultValueActions,
);

const useSpriteActions = () => React.useContext(SpriteActionsContext);
const useSprite = () => React.useContext(SpriteStateContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { children } = props;
  const service = useCurrentSprite();
  const [state, setState] = React.useState(service.state.context);
  React.useEffect(() => {
    service.onChange(setState);

    return () => service.off(setState);
  }, [service]);

  const actions = React.useMemo(() => createSpriteActions(service), [service]);

  return (
    <SpriteActionsContext.Provider value={actions}>
      <SpriteStateContext.Provider value={state}>
        {children}
      </SpriteStateContext.Provider>
    </SpriteActionsContext.Provider>
  );
};

export { Provider, useSprite, useSpriteActions };
