import React from 'react';
import { TinyEmitter } from 'tiny-emitter';
import * as Sprites from '../contexts/Sprites';
import * as Sprite from '../contexts/Sprite';
import * as Artboards from '../contexts/Artboards';
import * as Artboard from '../contexts/Artboard';
import * as Modifiers from '../contexts/Modifiers';
import * as Windows from '../contexts/Windows';
import * as Palettes from '../contexts/Palettes';
import * as App from '../contexts/App';

interface EditorProps {
  children: React.ReactNode;
}

const emitter = new TinyEmitter();

const Context = React.createContext({
  emitter,
});

const useEmitter = (): TinyEmitter => React.useContext(Context).emitter;

const Editor: React.FC<EditorProps> = (props) => {
  const { children } = props;

  return (
    <App.Provider>
      <Modifiers.Provider>
        <Palettes.Provider>
          <Sprites.Provider>
            <Artboards.Provider>
              <Artboard.Provider>
                <Sprite.Provider>
                  <Windows.Provider>{children}</Windows.Provider>
                </Sprite.Provider>
              </Artboard.Provider>
            </Artboards.Provider>
          </Sprites.Provider>
        </Palettes.Provider>
      </Modifiers.Provider>
    </App.Provider>
  );
};

export { useEmitter };
export default Editor;
