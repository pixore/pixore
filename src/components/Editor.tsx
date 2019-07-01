import React from 'react';

import {
  useEditorContext,
  defaultState as editorDefaultState,
  Provider as EditorContextProvider,
} from '../contexts/EditorContext';
import {
  useSpritesContext,
  defaultState as spritesDefaultState,
  Provider as SpritesContextProvider,
} from '../contexts/SpritesContext';
import { reducer as editorReducer } from '../reducers/editorContext';
import { reducer as spritesReducer } from '../reducers/spritesContext';

export const useSprite = (id: string) => {
  const { sprite } = useEditorContext();
  const { sprites } = useSpritesContext();

  if (id) {
    return sprites[id];
  }

  return sprites[sprite];
};

interface EditorProps {
  children: React.ReactNode;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { children } = props;
  const [editorState] = React.useReducer(editorReducer, editorDefaultState);
  const [spritesState] = React.useReducer(spritesReducer, spritesDefaultState);

  return (
    <SpritesContextProvider value={spritesState}>
      <EditorContextProvider value={editorState}>
        {children}
      </EditorContextProvider>
    </SpritesContextProvider>
  );
};

export default Editor;
