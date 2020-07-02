import React from 'react';
import { useContainer } from '@pixore/subdivide';
import Palette from './Palette/Palette';
import { components } from '../panels';
import { Panels } from '../types';

interface ContextValue {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  panelName: string;
  id: number;
}

const Context = React.createContext<ContextValue>({
  onChange: () => undefined,
  panelName: Panels.Palette,
  id: -1,
});

const Main: React.FC = () => {
  const { state, setState, id } = useContainer();

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
    id,
    panelName: state as string,
  };

  if (!state) {
    return <div>waiting...</div>;
  }

  const Component = components[state as string] || Palette;

  return (
    <Context.Provider value={context}>
      <Component />
    </Context.Provider>
  );
};

const usePane = (): ContextValue => React.useContext(Context);

export { usePane };

export default Main;
