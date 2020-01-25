import React from 'react';
import styled from '@emotion/styled';
import { useSpriteActions, useSprite } from '../../contexts/Sprite';
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
  const { changeFrame, changeLayer } = useArtboardActions();
  const sprite = useSprite();
  const artboard = useArtboard();
  const { frameList, layerList, layers } = sprite;
  const { createFrame, createLayer } = useSpriteActions();

  const onNewFrame = () => {
    const frame = createFrame();
    changeFrame(frame);
  };

  const onNewLayer = () => {
    const length = layerList.length + 1;
    const layer = createLayer(`Layer ${length}`);

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
          {frameList.map((frame) => (
            <SelectedFrame isActive={frame === artboard.frameId} key={frame} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <td />
            {frameList.map((frame, index, arr) => (
              <Frame
                key={frame}
                frame={frame}
                index={index}
                next={index === arr.length - 1 ? arr[0] : arr[index + 1]}
                onClick={() => changeFrame(frame)}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {layerList.map((layer, index, arr) => (
            <SelectedLayer isActive={layer === artboard.layerId} key={layer}>
              <Layer
                index={index}
                layer={layer}
                name={layers[layer].name}
                next={index === arr.length - 1 ? arr[0] : arr[index + 1]}
                onClick={() => changeLayer(layer)}
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
