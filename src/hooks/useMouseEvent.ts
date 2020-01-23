import React from 'react';
import throttle from 'lodash.throttle';

interface UseMouseEventOptions {
  onMouseDown?: React.MouseEventHandler;
  onMouseMove?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
}

const useMouseEvent = (options: UseMouseEventOptions) => {
  const { onMouseMove, onMouseUp, onMouseDown } = options;

  const mouseDownHandler = (event: React.MouseEvent) => {
    if (onMouseDown) {
      onMouseDown(event);
    }

    const mouseMoveHandler = throttle((event: MouseEvent) => {
      if (onMouseMove) {
        onMouseMove(event);
      }
    }, 100);

    const mouseUpHandler = throttle((event: MouseEvent) => {
      if (onMouseUp) {
        onMouseUp(event);
      }

      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    }, 10);

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
  };

  return {
    onMouseDown: mouseDownHandler,
  };
};

export { useMouseEvent };
