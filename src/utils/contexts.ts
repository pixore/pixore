import { Sprite } from '../contexts/Sprite';

type Context = CanvasRenderingContext2D;

interface Contexts {
  [key: string]:
    | {
        [key: string]: Context;
      }
    | Context;
}

const contexts: Contexts = {};

const getContext = (frame: string, layer: string, sprite: Sprite): Context => {
  if (!contexts[frame]) {
    contexts[frame] = {};
  }

  let context = contexts[frame][layer];

  if (context) {
    return context;
  }

  const { width, height } = sprite;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  context = canvas.getContext('2d');

  contexts[frame][layer] = context;

  return context;
};

const getContextById = (id: string): Context => {
  const context = contexts[id];
  if (context instanceof CanvasRenderingContext2D) {
    return context;
  }
};

const saveContext = (id: string, context: Context) => {
  contexts[id] = context;
};

const MAIN_CONTEXT_ID = 'MAIN_CONTEXT_ID';

const saveMainContext = (context: Context) =>
  saveContext(MAIN_CONTEXT_ID, context);

const getMainContext = () => getContextById(MAIN_CONTEXT_ID);

function mirrorContext(originContext: Context, destinationContext: Context) {
  const { canvas: originCanvas } = originContext;
  const { canvas: destinationCanvas } = destinationContext;
  let { width, height } = originCanvas;
  destinationCanvas.width = width;
  destinationCanvas.height = height;

  destinationContext.drawImage(
    originCanvas,
    0,
    0,
    width,
    height,
    0,
    0,
    width,
    height,
  );
}

export { getContext, getMainContext, saveMainContext, mirrorContext };
