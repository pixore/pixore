import React from 'react';
import styled from '@emotion/styled';
import { useSprite } from '../../contexts/Sprite';
import { useArtboard, useArtboardActions } from '../../contexts/Artboard';
import Cell from './Cell';
import Panel from '../Panel';
import Layer from './Layer';
import Frame from './Frame';

interface SelectedProps {
  isActive: boolean;
}

const SelectedLayer = styled.tr`
  text-align: center;
  ${({ isActive }: SelectedProps) => isActive && `background: #5e81ac;`}
`;

const SelectedFrame = SelectedLayer.withComponent('col');

const Sequencer = () => {
  const {
    selectFrame,
    selectLayer,
    createAndSelectFrame,
    createAndSelectLayer,
  } = useArtboardActions();
  const sprite = useSprite();
  const artboard = useArtboard();
  const { frameList, layerList, layers } = sprite;

  const onNewFrame = () => {
    createAndSelectFrame();
  };

  const onNewLayer = () => {
    createAndSelectLayer(`Layer ${layerList.length + 1}`);
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
          {frameList.map((frame) => (
            <SelectedFrame isActive={frame === artboard.frameId} key={frame} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <td />
            {frameList.map((frame) => (
              <Frame
                isActive={frame === artboard.frameId}
                key={frame}
                frame={frame}
                onClick={() => selectFrame(frame)}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {layerList.map((layer) => (
            <SelectedLayer isActive={layer === artboard.layerId} key={layer}>
              <Layer
                isActive={layer === artboard.layerId}
                layer={layer}
                name={layers[layer].name}
                onClick={() => selectLayer(layer)}
              />
              {sprite.frameList.map((frame) => (
                <Cell
                  key={frame}
                  isActive={
                    frame === artboard.frameId && layer === artboard.layerId
                  }
                  frame={frame}
                  layer={layer}
                />
              ))}
            </SelectedLayer>
          ))}
        </tbody>
      </table>
    </Panel>
  );
};

export default Sequencer;
