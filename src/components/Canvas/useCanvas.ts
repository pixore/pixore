import React from 'react';
import { useSprite } from '../../contexts/Sprite';
import { reducer, createActions } from './reducer';

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
