import React from 'react';

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

const useCanvas = () => {
  return {
    background: useCanvas2DContext(),
    main: useCanvas2DContext(),
    preview: useCanvas2DContext(),
    mask: useCanvas2DContext(),
  };
};

export default useCanvas;
