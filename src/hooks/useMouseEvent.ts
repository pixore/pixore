import React from 'react';

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

    const mouseMoveHandler = (event: MouseEvent) => {
      if (onMouseMove) {
        onMouseMove(event);
      }
    };

    const mouseUpHandler = (event: MouseEvent) => {
      if (onMouseUp) {
        onMouseUp(event);
      }

      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
  };

  return {
    onMouseDown: mouseDownHandler,
  };
};

export { useMouseEvent };
