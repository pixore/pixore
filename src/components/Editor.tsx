import React from 'react';

import * as Sprites from '../contexts/Sprites';
import * as Sprite from '../contexts/Sprite';
import * as Artboards from '../contexts/Artboards';
import * as Artboard from '../contexts/Artboard';
import * as Layers from '../contexts/Layers';
import * as Frames from '../contexts/Frames';
import * as Modifiers from '../contexts/Modifiers';
import * as Windows from '../contexts/Windows';

interface EditorProps {
  children: React.ReactNode;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { children } = props;

  return (
    <Modifiers.Provider>
      <Frames.Provider>
        <Layers.Provider>
          <Sprites.Provider>
            <Sprite.Provider>
              <Artboards.Provider>
                <Artboard.Provider>
                  <Windows.Provider>{children}</Windows.Provider>
                </Artboard.Provider>
              </Artboards.Provider>
            </Sprite.Provider>
          </Sprites.Provider>
        </Layers.Provider>
      </Frames.Provider>
    </Modifiers.Provider>
  );
};

export default Editor;
