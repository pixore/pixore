import React from 'react';

import * as Artboards from '../contexts/Artboards';
import {
  defaultState as editorDefaultState,
  Provider as EditorContextProvider,
} from '../contexts/EditorContext';
import {
  defaultState as spritesDefaultState,
  Provider as SpritesContextProvider,
} from '../contexts/SpritesContext';
import { reducer as editorReducer } from '../reducers/editorReducer';
import { reducer as spritesReducer } from '../reducers/spritesReducer';

interface EditorProps {
  children: React.ReactNode;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { children } = props;
  const [spritesState] = React.useReducer(spritesReducer, spritesDefaultState);
  const [editorState] = React.useReducer(editorReducer, editorDefaultState);

  return (
    <Artboards.Provider>
      <SpritesContextProvider value={spritesState}>
        <EditorContextProvider value={editorState}>
          {children}
        </EditorContextProvider>
      </SpritesContextProvider>
    </Artboards.Provider>
  );
};

export default Editor;
