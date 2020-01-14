import React from 'react';
import styled from '@emotion/styled';
import { useSpriteActions, useSprite } from '../contexts/Sprite';
import { useLayers } from '../contexts/Layers';
import { useArtboard, useArtboardActions } from '../contexts/Artboard';
import Panel from './Panel';

interface SelectedProps {
  isActive: boolean;
}

const SelectedLayer = styled.tr`
  text-align: center;
  ${({ isActive }: SelectedProps) => isActive && `background: #5e81ac;`}
`;

const Td = styled.td`
  text-align: center;
  height: 26px;
  padding: 0 8px;
  border-radius: 3px;
  &:hover {
    background: #5e81ac;
  }
`;

const SelectedFrame = SelectedLayer.withComponent('col');

const SelectedCell = styled(Td)`
  width: 26px;
  ${({ isActive }: SelectedProps) =>
    isActive &&
    `background: #81A1C1;
    &:hover {
      background: #81A1C1;
    }`};
`;

const FramesAndLayers = () => {
  const { changeFrame, changeLayer } = useArtboardActions();
  const sprite = useSprite();
  const artboard = useArtboard();
  const layers = useLayers();
  const { addNewFrameToSprite, addNewLayerToSprite } = useSpriteActions();

  const onNewFrame = () => {
    const frame = addNewFrameToSprite();
    changeFrame(frame);
  };

  const onSelectFrameAndLayer = (frame: string, layer: string) => {
    changeFrame(frame);
    changeLayer(layer);
  };

  const onNewLayer = () => {
    const length = Object.keys(layers).length + 1;
    const layer = addNewLayerToSprite({
      name: `Layer ${length}`,
    });

    changeLayer(layer);
  };

  if (!sprite || !artboard) {
    return <span>Loading...</span>;
  }

  return (
    <Panel>
      <button onClick={onNewFrame}>New Frame</button>
      <button onClick={onNewLayer}>New Layer</button>
      <table>
        <colgroup>
          <col />
          {sprite.frames.map((frame) => (
            <SelectedFrame isActive={frame === artboard.frame} key={frame} />
          ))}
        </colgroup>
        <tbody>
          <tr>
            <td />
            {sprite.frames.map((frame, index) => (
              <Td key={frame} onClick={() => changeFrame(frame)}>
                {index + 1}
              </Td>
            ))}
          </tr>
          {sprite.layers.map((layer) => (
            <SelectedLayer isActive={layer === artboard.layer} key={layer}>
              <Td onClick={() => changeLayer(layer)}>{layers[layer].name}</Td>
              {sprite.frames.map((frame) => (
                <SelectedCell
                  isActive={
                    frame === artboard.frame && layer === artboard.layer
                  }
                  key={frame}
                  onClick={() => onSelectFrameAndLayer(frame, layer)}
                />
              ))}
            </SelectedLayer>
          ))}
        </tbody>
      </table>
    </Panel>
  );
};

export default FramesAndLayers;
