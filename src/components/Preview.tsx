import React from 'react';
import styled from '@emotion/styled';
import { useContainer } from '@pixore/subdivide';
import PanelSelect from './PanelSelect';
import Frames from './CanvasLayers/Frames';
import { useCanvas } from '../hooks/useCanvas';
import Background from './CanvasLayers/Background';
import { useSprite } from '../contexts/Sprite';
import { HeadlessPanel } from './Panel';
import { usePlayAndPause } from '../hooks/usePlayAndPause';

const Float = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.5);
`;

interface PropTypes {
  width: number;
  height: number;
  isPlaying: boolean;
  scale: number;
  x: number;
  y: number;
}

const Preview: React.FC<PropTypes> = () => {
  const { stats } = useContainer();
  const sprite = useSprite();
  const canvas = useCanvas(stats);
  const { button, isPlaying } = usePlayAndPause(
    true,
    sprite.frames.length === 1,
  );

  const onCenter = () => {
    canvas.center(stats, sprite);
  };

  React.useEffect(() => {
    if (stats && canvas.scale === 0) {
      canvas.center(stats, sprite);
    }
  }, [stats, canvas, sprite]);

  return (
    <HeadlessPanel onWheel={canvas.onWheel}>
      <Background {...canvas} />
      <Frames {...canvas} isPlaying={isPlaying} />
      <Float>
        <PanelSelect />
        {button}
        <button onClick={onCenter}>center</button>
      </Float>
    </HeadlessPanel>
  );
};

export default Preview;
