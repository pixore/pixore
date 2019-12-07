import React from 'react';
import { getTool, Context as ListenerContext, Tool } from '../../tools';

type Context2D = CanvasRenderingContext2D;

const isReady = (
  previewContext: Context2D,
  mainContext: Context2D,
  tool: Tool,
): boolean => {
  return Boolean(
    previewContext &&
      previewContext.canvas &&
      mainContext &&
      mainContext.canvas &&
      tool,
  );
};

const useTool = (
  listenerContextRef: React.RefObject<ListenerContext>,
  toolName: string,
) => {
  const { previewContext, mainContext } = listenerContextRef.current;
  React.useEffect(() => {
    const addEventListener = getTool(toolName);
    if (!isReady(previewContext, mainContext, addEventListener)) {
      return;
    }

    if (addEventListener) {
      return addEventListener(listenerContextRef);
    }
  }, [previewContext, mainContext, toolName, listenerContextRef]);
};

export default useTool;
