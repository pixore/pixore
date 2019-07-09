import React from 'react';

import * as Sprites from '../contexts/Sprites';
import * as Sprite from '../contexts/Sprite';
import * as Artboards from '../contexts/Artboards';
import * as Artboard from '../contexts/Artboard';
import * as Layers from '../contexts/Layers';
import * as Frames from '../contexts/Frames';

interface EditorProps {
  children: React.ReactNode;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { children } = props;

  return (
    <Frames.Provider>
      <Layers.Provider>
        <Sprites.Provider>
          <Sprite.Provider>
            <Artboards.Provider>
              <Artboard.Provider>{children}</Artboard.Provider>
            </Artboards.Provider>
          </Sprite.Provider>
        </Sprites.Provider>
      </Layers.Provider>
    </Frames.Provider>
  );
};

export default Editor;
