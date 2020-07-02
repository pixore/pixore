import React from 'react';
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
import { FloatBox } from './elements';

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
  const { layerId, tool: toolName } = artboard;
  const { layerList } = sprite;
  const { isPlaying, button } = usePlayAndPause(
    false,
    sprite.frameList.length === 1,
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

  listenerContextRef.current.mainContext = mainContext;
  listenerContextRef.current.previewContext = previewContext;
  listenerContextRef.current.sprite = sprite;
  listenerContextRef.current.artboard = artboard;
  listenerContextRef.current.artboardActions = artboardActions;
  listenerContextRef.current.spriteActions = spriteActions;
  listenerContextRef.current.canvas = canvas;

  useTool(listenerContextRef, toolName);

  React.useEffect(() => {
    if (stats && canvas.scale === 0) {
      canvas.center(stats, sprite);
    }
  }, [stats, canvas, sprite]);

  const onCenter = () => {
    canvas.center(stats, sprite);
  };

  const indexOfCurrentLayer = layerList.indexOf(layerId);
  const layersBelow = layerList.slice(0, indexOfCurrentLayer);
  const layersAbove = layerList.slice(
    indexOfCurrentLayer + 1,
    layerList.length,
  );

  // TODO while zooming in/out if the user try to paint
  // an error happens, therefore painting should be blocked while
  // zooming in/out, and zooming in/out should be block while painting
  // TODO when the canvas is in play mode, any interaction should be deactivated
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
            layers={[layerId]}
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
      <FloatBox top={4} left={70}>
        <PanelSelect />
        {button}
        <CenterButton onClick={onCenter} />
      </FloatBox>
      <Tools />
    </HeadlessPanel>
  );
};

export default Canvas;
