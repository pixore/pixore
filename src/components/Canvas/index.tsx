/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import { useSprite } from '../../contexts/Sprite';
import { useArtboard, useArtboardActions } from '../../contexts/Artboard';
import useCanvas from '../../hooks/useCanvas';
import usePaintCanvas from '../../hooks/usePaintCanvas';
import CanvasLayer from '../CanvasLayer';
import Preview from './Preview';
import Main from './Main';

const maskStyles = css`
  pointer-events: none;
`;

const Canvas: React.FC = () => {
  const sprite = useSprite();
  const [stats, setStats] = React.useState<ClientRect>();
  const artboard = useArtboard();
  const { center, changePosition } = useArtboardActions();
  const elementRef = React.useRef<HTMLDivElement>();
  const { background, mask } = useCanvas();
  const { current: element } = elementRef;
  const { innerWidth: width, innerHeight: height } = window;

  usePaintCanvas({
    background,
    mask,
    sprite,
    artboard,
  });

  React.useEffect(() => {
    if (element) {
      const { current: element } = elementRef;
      const stats = element.parentElement.getBoundingClientRect();

      center(stats, sprite);
      setStats(stats);
    }
    // NOTE: this effect should be execute only once,
    // when the component is mounted an the element is available
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);

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
    const scale = artboard.scale - deltaY / 120;

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

  // TODO Move brackground and mask layers to its own components
  return (
    <div ref={elementRef} style={style} onWheel={onWheel}>
      <CanvasLayer
        width={width}
        height={height}
        ref={background.onRef}
        style={style}
      />
      <Main width={width} height={height} style={style} />
      <Preview width={width} height={height} style={style} />
      <CanvasLayer
        width={width}
        height={height}
        ref={mask.onRef}
        style={style}
        css={maskStyles}
      />
    </div>
  );
};

export default Canvas;
