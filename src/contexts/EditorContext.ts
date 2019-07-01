import React from 'react';

export interface EditorContext {
  sprite?: string;
}

export const defaultState = {
  sprite: '1',
};

const EditorContext = React.createContext<EditorContext>(defaultState);

export const { Provider } = EditorContext;

export const useEditorContext = () => React.useContext(EditorContext);
