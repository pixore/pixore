import React from 'react';
import { useContainer } from '@pixore/subdivide';
import Canvas from './Canvas';
import FramesAndLayers from './FramesAndLayers';
import Palette from './Palette';
import Preview from './Preview';
import { Panels } from '../types';

interface ContextValue {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  panelName: string;
}

const Context = React.createContext<ContextValue>({
  onChange: () => undefined,
  panelName: Panels.Palette,
});

const components = {
  [Panels.Canvas]: Canvas,
  [Panels.Sequencer]: FramesAndLayers,
  [Panels.Palette]: Palette,
  [Panels.Preview]: Preview,
};

const Main = () => {
  const { state, setState } = useContainer();

  React.useEffect(() => {
    if (!state) {
      setState(Panels.Palette);
    }
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };

  const context = {
    onChange,
    panelName: state as string,
  };

  if (!state) {
    return <div>waiting...</div>;
  }

  const Component = components[state as string];

  return (
    <Context.Provider value={context}>
      <Component />
    </Context.Provider>
  );
};

const usePane = () => React.useContext(Context);

export { usePane };

export default Main;
