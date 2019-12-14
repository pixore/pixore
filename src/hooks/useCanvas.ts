import React from 'react';
import { useSprite } from '../contexts/Sprite';
import { reducer, createActions } from '../reducers/canvasReducer';

export interface Canvas2DContext {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  onRef: (ref: HTMLCanvasElement) => void;
}

const defaultValueState = {
  scale: 0,
  x: 0,
  y: 0,
};

const useCanvas = (stats: DOMRect) => {
  const [state, dispatch] = React.useReducer(reducer, defaultValueState);
  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);
  const sprite = useSprite();
  const { width, height, left, top } = stats || {};

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const { deltaY } = event;
    const remainder = deltaY % 2;
    const delta = remainder === 0 ? deltaY : deltaY + remainder;

    const currentWidth = state.scale * sprite.width;
    const newScale = (currentWidth - delta) / sprite.width;

    if (newScale < 1) {
      return;
    }

    const x = state.x + delta / 2;
    const y = state.y + delta / 2;

    actions.update({
      scale: newScale,
      x,
      y,
    });
  };

  return { onWheel, ...actions, ...state, width, height, left, top };
};

export default useCanvas;

const useCanvas2DContext = (): Canvas2DContext => {
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
  const [context, setContext] = React.useState<CanvasRenderingContext2D>();

  const onRef = React.useCallback((ref) => {
    if (ref) {
      setCanvas(ref);

      const context = ref.getContext('2d');
      setContext(context);
    }
  }, []);

  return { context, onRef, canvas };
};

export { useCanvas2DContext, useCanvas };
