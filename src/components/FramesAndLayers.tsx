/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useSpriteActions, useSprite } from '../contexts/Sprite';
import { useLayers } from '../contexts/Layers';
import { useFrames } from '../contexts/Frames';
import { useArtboard, useArtboardActions } from '../contexts/Artboard';

const baseStyle = css`
  border: 1px solid black;
  border-collapse: collapse;
`;

const FramesAndLayers = () => {
  const { changeFrame, changeLayer } = useArtboardActions();
  const sprite = useSprite();
  const artboard = useArtboard();
  const layers = useLayers();
  const frames = useFrames();
  const { addNewFrameToSprite, addNewLayerToSprite } = useSpriteActions();

  const onNewFrame = () => {
    addNewFrameToSprite();
  };

  const onSelectFrameAndLayer = (frame: string, layer: string) => {
    changeFrame(frame);
    changeLayer(layer);
  };

  const onNewLayer = () => {
    addNewLayerToSprite({
      name: 'New Layer',
    });
  };

  if (!sprite || !artboard) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <button onClick={onNewFrame}>New Frame</button>
      <button onClick={onNewLayer}>New Layer</button>
      <table css={baseStyle}>
        <colgroup>
          <col />
          {sprite.frames.map((frame) => (
            <col
              key={frame}
              style={{
                background:
                  frame === artboard.frame ? 'darkgray' : 'transparent',
              }}
            />
          ))}
        </colgroup>
        {sprite.layers.map((layer) => (
          <tr
            key={layer}
            style={{
              background: layer === artboard.layer ? 'darkgray' : 'transparent',
            }}
          >
            <td css={baseStyle}>{layers[layer].name}</td>
            {sprite.frames.map((frame) => (
              <td
                key={frame}
                css={baseStyle}
                onClick={() => onSelectFrameAndLayer(frame, layer)}
                style={{
                  background:
                    frame === artboard.frame && layer === artboard.layer
                      ? 'gray'
                      : 'transparent',
                }}
              >
                {frames[frame].id}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default FramesAndLayers;
