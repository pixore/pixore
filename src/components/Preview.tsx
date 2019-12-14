import React from 'react';
import styled from '@emotion/styled';
import { useContainer } from '@pixore/subdivide';
import PanelSelect from './PanelSelect';
import Frames from './CanvasLayers/Frames';
import { useCanvas } from '../hooks/useCanvas';
import { toggleState } from '../utils';
import Background from './CanvasLayers/Background';
import { useSprite } from '../contexts/Sprite';

const Float = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #2e3440;
  border-radius: 10px;
  background: #3b4252;
  overflow: hidden;
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

  const [isPlaying, setIsPlaying] = React.useState(true);

  const onPlay = () => {
    setIsPlaying(toggleState);
  };

  const onCenter = () => {
    canvas.center(stats, sprite);
  };

  React.useEffect(() => {
    if (stats && canvas.scale === 0) {
      canvas.center(stats, sprite);
    }
  }, [stats, canvas, sprite]);

  return (
    <Container onWheel={canvas.onWheel}>
      <Background {...canvas} />
      <Frames {...canvas} isPlaying={isPlaying} />
      <Float>
        <PanelSelect />
        <button onClick={onPlay}>play</button>
        <button onClick={onCenter}>center</button>
      </Float>
    </Container>
  );
};

export default Preview;
