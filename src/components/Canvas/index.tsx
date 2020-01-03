import React from 'react';
import styled from '@emotion/styled';
import { useContainer } from '@pixore/subdivide';
import { useSprite, useSpriteActions } from '../../contexts/Sprite';
import { useArtboard, useArtboardActions } from '../../contexts/Artboard';
import useTool from './useTool';
import FrameLayers from '../CanvasLayers/FrameLayers';
import Background from '../CanvasLayers/Background';
import Mask from '../CanvasLayers/Mask';
import { Context as ListenerContext } from '../../tools';
import { useCanvas2DContext, useCanvas } from '../../hooks/useCanvas';
import CanvasLayer from '../CanvasLayer';
import PanelSelect from '../PanelSelect';
import { HeadlessPanel } from '../Panel';
import { usePlayAndPause } from '../../hooks/usePlayAndPause';
import Frames from '../CanvasLayers/Frames';
import Tools from './Tools';
import CenterButton from '../CenterButton';

const Float = styled.div`
  display: inline-block;
  position: absolute;
  top: 4px;
  left: 70px;
  padding: 2px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.5);
`;

const Canvas: React.FC = () => {
  const container = useContainer();
  const sprite = useSprite();
  const { stats } = container;
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
  const { isPlaying, button } = usePlayAndPause(
    false,
    sprite.frames.length === 1,
  );

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

  useTool(listenerContextRef, toolName);

  React.useEffect(() => {
    if (stats && canvas.scale === 0) {
      canvas.center(stats, sprite);
    }
  }, [stats, canvas, sprite]);

  const onCenter = () => {
    canvas.center(stats, sprite);
  };

  const indexOfCurrentLayer = layers.indexOf(layer);
  const layersBelow = layers.slice(0, indexOfCurrentLayer);
  const layersAbove = layers.slice(indexOfCurrentLayer + 1, layers.length);

  // TODO while zooming in/out if the users try to paint
  // an error happen, therefore painting should be blocked while
  // zooming in/out, and zooming in/out should be block white painting
  // TODO when the canvas is in play mode, any interaction should deactivate it
  return (
    <HeadlessPanel onWheel={onWheel}>
      <Background {...stats} {...canvas} />
      {isPlaying ? (
        <Frames isPlaying={isPlaying} {...canvas} />
      ) : (
        <>
          <FrameLayers
            data-id="layers-below"
            layers={layersBelow}
            {...canvas}
          />
          <FrameLayers
            data-id="current-layer"
            ref={setMainRef}
            layers={[layer]}
            {...canvas}
          />
          <FrameLayers
            data-id="layers-above"
            layers={layersAbove}
            {...canvas}
          />
          <CanvasLayer ref={setPreviewRef} {...canvas} />
        </>
      )}
      <Mask {...canvas} />
      <Float>
        <PanelSelect />
        {button}
        <CenterButton onClick={onCenter} />
      </Float>
      <Tools />
    </HeadlessPanel>
  );
};

export default Canvas;
