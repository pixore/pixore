/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import { useSprite, useSpriteActions } from '../../contexts/Sprite';
import { useArtboard, useArtboardActions } from '../../contexts/Artboard';
import FrameLayers from './FrameLayers';
import Background from './Background';
import Mask from './Mask';
import { getTool, Context as ListenerContext } from '../../tools';
import { useCanvas2DContext } from '../../hooks/useCanvas';
import CanvasLayer from '../CanvasLayer';
import { round2 } from '../../utils';

const maskStyles = css`
  pointer-events: none;
`;

const useWheel = () => {
  const artboardActions = useArtboardActions();
  const artboard = useArtboard();
  const sprite = useSprite();
  const { changePosition } = artboardActions;

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const { y, x } = artboard;
    const deltaY = event.deltaY;
    const scale = round2(artboard.scale - deltaY / 120);

    if (scale < 1) {
      return;
    }

    const diffX = sprite.width * scale - artboard.scale * sprite.width;
    const diffY = sprite.height * scale - artboard.scale * sprite.height;

    changePosition({
      scale,
      y: y - Math.round(diffY / 2),
      x: x - Math.round(diffX / 2),
    });
  };
  return { onWheel };
};

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
  const { onWheel } = useWheel();
  const { center } = artboardActions;
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
  });

  listenerContextRef.current = {
    mainContext,
    previewContext,
    sprite,
    artboard,
    artboardActions,
    spriteActions,
  };

  React.useEffect(() => {
    if (element) {
      const stats = element.parentElement.getBoundingClientRect();

      center(stats, sprite);
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
      <Background style={style} width={width} height={height} />
      <FrameLayers
        data-id="layers-below"
        style={style}
        width={width}
        height={height}
        layers={layersBelow}
      />
      <FrameLayers
        data-id="current-layer"
        ref={setMainRef}
        style={style}
        width={width}
        height={height}
        layers={[layer]}
      />
      <FrameLayers
        data-id="layers-above"
        style={style}
        width={width}
        height={height}
        layers={layersAbove}
      />
      <CanvasLayer
        ref={setPreviewRef}
        style={style}
        width={width}
        height={height}
      />
      <Mask css={maskStyles} style={style} width={width} height={height} />
    </div>
  );
};

export default Canvas;
