/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import { getTransparentPattern, clean, getNewId } from '../utils';
import { Sprite, useSprite } from '../contexts/Sprite';
import { useSpritesActions, useSprites } from '../contexts/Sprites';
import { useSpriteActions } from '../contexts/Sprite';
import { useLayersActions } from '../contexts/Layers';
import { useArtboards, useArtboardsActions } from '../contexts/Artboards';
import {
  useArtboard,
  useArtboardActions,
  Artboard,
} from '../contexts/Artboard';

const base = css`
  cursor: crosshair;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: -o-crisp-edges;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
  position: absolute;
  top: 0;
  left: 0;
`;

const mask = css`
  ${base}
  pointer-events: none;
`;

const useCanvas2DContext = () => {
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
  const [context, setContext] = React.useState<CanvasRenderingContext2D>();

  const onRef = React.useCallback((ref) => {
    setCanvas(ref);

    const context = ref.getContext('2d');
    setContext(context);
  }, []);

  return { context, onRef, canvas };
};

export const paintBackground = (
  context: CanvasRenderingContext2D,
  artboard: Artboard,
  sprite: Sprite,
) => {
  const pattern = context.createPattern(getTransparentPattern(), 'repeat');
  clean(context.canvas);
  context.fillStyle = pattern;
  context.fillRect(
    artboard.x,
    artboard.y,
    sprite.width * artboard.scale,
    sprite.height * artboard.scale,
  );
};

const Canvas: React.FC = () => {
  const sprite = useSprite();
  const [stats, setStats] = React.useState<ClientRect>();
  const artboard = useArtboard();
  const { center, changePosition } = useArtboardActions();
  const elementRef = React.useRef<HTMLDivElement>();
  const { onRef: backgroundRef, context: background } = useCanvas2DContext();
  const { onRef: mainRef } = useCanvas2DContext();
  const { onRef: previewRef } = useCanvas2DContext();
  const { onRef: maskRef } = useCanvas2DContext();
  const { current: element } = elementRef;
  const { innerWidth: width, innerHeight: height } = window;

  React.useEffect(() => {
    if (background) {
      paintBackground(background, artboard, sprite);
    }
  }, [background, sprite, artboard]);

  React.useEffect(() => {
    if (element) {
      const { current: element } = elementRef;
      const stats = element.parentElement.getBoundingClientRect();

      center(stats, sprite);
      setStats(stats);
    }
  }, [element, sprite, center]);

  const style: React.CSSProperties = {
    width,
    height,
  };

  if (stats) {
    style.marginTop = -stats.top;
    style.marginLeft = -stats.left;
  }

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const { y, x } = artboard;
    const deltaY = event.deltaY;
    const scale = artboard.scale * (deltaY / 120);

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

  return (
    <div ref={elementRef} style={style} onWheel={onWheel}>
      <canvas
        width={width}
        height={height}
        ref={backgroundRef}
        style={style}
        css={base}
      />
      <canvas
        width={width}
        height={height}
        ref={mainRef}
        style={style}
        css={base}
      />
      <canvas
        width={width}
        height={height}
        ref={previewRef}
        style={style}
        css={base}
      />
      <canvas
        width={width}
        height={height}
        ref={maskRef}
        style={style}
        css={mask}
      />
    </div>
  );
};

const CanvasLoader = () => {
  const { addLayerInSprite } = useSpriteActions();
  const { addLayer } = useLayersActions();
  const { addSprite } = useSpritesActions();
  const { addArtboard } = useArtboardsActions();

  const sprite = useSprite();
  const sprites = useSprites();
  const artboards = useArtboards();
  const artboard = useArtboard();

  if (!sprite) {
    const spriteIds = Object.keys(sprites);
    if (spriteIds.length === 0) {
      addSprite({
        id: '1',
        name: 'New Sprite',
        width: 50,
        height: 50,
        layers: [],
        frames: [],
      });
    }

    return 'Loading...';
  }

  if (sprite.layers.length === 0) {
    const id = getNewId();
    addLayer({
      id,
      name: 'First Layer',
    });

    addLayerInSprite(id);

    return 'Loading...';
  }

  if (!artboard) {
    const { id } = sprite;
    const artboardIds = Object.keys(artboards);
    if (artboardIds.length === 0) {
      addArtboard({
        id,
        scale: 1,
        y: 0,
        x: 0,
      });
    }

    return 'Loading...';
  }

  return <Canvas />;
};

export default CanvasLoader;
