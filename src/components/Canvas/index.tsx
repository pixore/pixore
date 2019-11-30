import React from 'react';
import styled from '@emotion/styled';
import { useContainer } from '@pixore/subdivide';
import { useSprite, useSpriteActions } from '../../contexts/Sprite';
import { useArtboard, useArtboardActions } from '../../contexts/Artboard';
import FrameLayers from './FrameLayers';
import Background from './Background';
import Mask from './Mask';
import { getTool, Context as ListenerContext } from '../../tools';
import { useCanvas2DContext } from '../../hooks/useCanvas';
import CanvasLayer from '../CanvasLayer';
import useCanvas from './useCanvas';
import PanelSelect from '../PanelSelect';

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

const Canvas: React.FC = () => {
  const sprite = useSprite();
  const { stats } = useContainer();
  const { onRef: setMainRef, context: mainContext } = useCanvas2DContext();
  const {
    onRef: setPreviewRef,
    context: previewContext,
  } = useCanvas2DContext();
  const artboard = useArtboard();
  const artboardActions = useArtboardActions();
  const spriteActions = useSpriteActions();
  const canvas = useCanvas(stats);
  const { onWheel } = canvas;
  const { layer, tool: toolName } = artboard;
  const { layers } = sprite;

  const listenerContextRef = React.useRef<ListenerContext>({
    mainContext,
    previewContext,
    sprite,
    artboard,
    artboardActions,
    spriteActions,
    canvas,
  });

  listenerContextRef.current = {
    mainContext,
    previewContext,
    sprite,
    artboard,
    artboardActions,
    spriteActions,
    canvas,
  };

  React.useEffect(() => {
    if (stats && canvas.scale === 0) {
      canvas.center(stats, sprite);
    }
  }, [stats, canvas, sprite]);

  React.useEffect(() => {
    if (!(previewContext && previewContext.canvas)) {
      return;
    }
    if (!(mainContext && mainContext.canvas)) {
      return;
    }

    const addEventListener = getTool(toolName);

    if (addEventListener) {
      return addEventListener(listenerContextRef);
    }
  }, [previewContext, mainContext, toolName]);

  const indexOfCurrentLayer = layers.indexOf(layer);
  const layersBelow = layers.slice(0, indexOfCurrentLayer);
  const layersAbove = layers.slice(indexOfCurrentLayer + 1, layers.length);

  return (
    <Container onWheel={onWheel}>
      <Background {...stats} {...canvas} />
      <FrameLayers data-id="layers-below" layers={layersBelow} {...canvas} />
      <FrameLayers
        data-id="current-layer"
        ref={setMainRef}
        layers={[layer]}
        {...canvas}
      />
      <FrameLayers data-id="layers-above" layers={layersAbove} {...canvas} />
      <CanvasLayer ref={setPreviewRef} {...canvas} />
      <Mask {...canvas} />
      <Float>
        <PanelSelect />
      </Float>
    </Container>
  );
};

export default Canvas;
