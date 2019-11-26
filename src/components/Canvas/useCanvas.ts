import React from 'react';
import { round2 } from '../../utils';
import { useSprite } from '../../contexts/Sprite';
import { reducer, createActions } from './reducer';

const defaultValueState = {
  scale: 0,
  x: 0,
  y: 0,
};

const useCanvas = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultValueState);
  const actions = React.useMemo(() => createActions(dispatch), [dispatch]);
  const sprite = useSprite();

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const deltaY = event.deltaY;
    const newScale = round2(state.scale - deltaY / 120);

    if (newScale < 1) {
      return;
    }

    const diffX = sprite.width * newScale - state.scale * sprite.width;
    const diffY = sprite.height * newScale - state.scale * sprite.height;

    actions.update({
      scale: newScale,
      x: state.x - Math.round(diffX / 2),
      y: state.y - Math.round(diffY / 2),
    });
  };

  return { onWheel, ...actions, ...state };
};

export default useCanvas;
