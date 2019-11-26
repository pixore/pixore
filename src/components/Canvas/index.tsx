import React from 'react';
import styled from '@emotion/styled';
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

const Canvas: React.FC = () => {
  const sprite = useSprite();
  const [stats, setStats] = React.useState<ClientRect>();
  const { onRef: setMainRef, context: mainContext } = useCanvas2DContext();
  const {
    onRef: setPreviewRef,
    context: previewContext,
  } = useCanvas2DContext();
  const artboard = useArtboard();
  const artboardActions = useArtboardActions();
  const spriteActions = useSpriteActions();
  const canvas = useCanvas();
  const { onWheel } = canvas;
  const [element, setElement] = React.useState<HTMLDivElement>();
  const { innerWidth: width, innerHeight: height } = window;
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
    if (element) {
      const stats = element.parentElement.getBoundingClientRect();

      canvas.center(stats, sprite);
      setStats(stats);
    }
    // NOTE: this effect should be execute only once,
    // when the component is mounted an the element is available
  }, [element]);

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

  const style: React.CSSProperties = {
    width,
    height,
  };

  if (stats) {
    style.marginTop = -stats.top;
    style.marginLeft = -stats.left;
  }
  const indexOfCurrentLayer = layers.indexOf(layer);
  const layersBelow = layers.slice(0, indexOfCurrentLayer);
  const layersAbove = layers.slice(indexOfCurrentLayer + 1, layers.length);

  return (
    <div ref={setElement} style={style} onWheel={onWheel}>
      <Background style={style} width={width} height={height} {...canvas} />
      <FrameLayers
        data-id="layers-below"
        style={style}
        width={width}
        height={height}
        layers={layersBelow}
        {...canvas}
      />
      <FrameLayers
        data-id="current-layer"
        ref={setMainRef}
        style={style}
        width={width}
        height={height}
        layers={[layer]}
        {...canvas}
      />
      <FrameLayers
        data-id="layers-above"
        style={style}
        width={width}
        height={height}
        layers={layersAbove}
        {...canvas}
      />
      <CanvasLayer
        ref={setPreviewRef}
        style={style}
        width={width}
        height={height}
      />
      <Mask style={style} width={width} height={height} {...canvas} />
      <Float>
        <PanelSelect />
      </Float>
    </div>
  );
};

export default Canvas;
