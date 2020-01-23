import React from 'react';
import { TinyEmitter } from 'tiny-emitter';
import * as Sprites from '../contexts/Sprites';
import * as Sprite from '../contexts/Sprite';
import * as Artboards from '../contexts/Artboards';
import * as Artboard from '../contexts/Artboard';
import * as Modifiers from '../contexts/Modifiers';
import * as Windows from '../contexts/Windows';
import * as Palettes from '../contexts/Palettes';
import * as Palette from '../contexts/Palette';

interface EditorProps {
  children: React.ReactNode;
}

const emitter = new TinyEmitter();

const Context = React.createContext({
  emitter,
});

const useEmitter = () => React.useContext(Context).emitter;

const Editor: React.FC<EditorProps> = (props) => {
  const { children } = props;

  return (
    <Modifiers.Provider>
      <Palettes.Provider>
        <Palette.Provider>
          <Sprites.Provider>
            <Sprite.Provider>
              <Artboards.Provider>
                <Artboard.Provider>
                  <Windows.Provider>{children}</Windows.Provider>
                </Artboard.Provider>
              </Artboards.Provider>
            </Sprite.Provider>
          </Sprites.Provider>
        </Palette.Provider>
      </Palettes.Provider>
    </Modifiers.Provider>
  );
};

export { useEmitter };
export default Editor;
