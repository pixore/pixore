import React from 'react';

export interface Canvas2DContext {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  onRef: (ref: HTMLCanvasElement) => void;
}

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

const useCanvas = () => {
  return {
    background: useCanvas2DContext(),
    mask: useCanvas2DContext(),
  };
};

export { useCanvas2DContext };

export default useCanvas;
