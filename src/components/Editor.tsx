import React, { Fragment } from 'react';

interface Frame {
  id: string;
}

interface Palette {
  id: string;
  name: string;
}

interface Layer {
  id: string;
  name: string;
}

interface Sprite {
  id: string;
  name: string;
  layers: Layer[];
  frames: Frame;
  palette: Palette;
  color: string;
}

interface Sprites {
  [key: string]: Sprite;
}

interface EditorContext {
  sprites: Sprites;
  sprite?: string;
}

const Context = React.createContext<EditorContext>(undefined);
const { Provider } = Context;

const defaultState = {
  sprites: {},
};

interface Action {
  type: string;
  payload: object;
}

export const useSprite = (id: string) => {
  const { sprites, sprite } = React.useContext(Context);
  if (id) {
    return sprites[id];
  }

  return sprites[sprite];
};

const reducer = (state: EditorContext, action: Action) => {
  return state;
};

interface EditorProps {
  children: React.ReactNode;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  return (
    <Fragment>
      <Provider value={state}>{children}</Provider>
    </Fragment>
  );
};

export default Editor;
