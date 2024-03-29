import { Sprite } from '../state/sprite';

type Context = CanvasRenderingContext2D;

interface Contexts {
  [spriteId: string]: {
    [frameId: string]: {
      [layerId: string]: Context;
    };
  };
}

const contexts: Contexts = {};

const removeContextsByLayer = (spriteId: string, layerId: string) => {
  const contextsBySprite = contexts[spriteId];
  if (!contextsBySprite) {
    return;
  }

  Object.keys(contextsBySprite).forEach((frameId) => {
    Reflect.deleteProperty(contextsBySprite[frameId], layerId);
  });
};

const removeContextsByFrame = (spriteId: string, frameId: string) => {
  const contextsBySprite = contexts[spriteId];
  if (!contextsBySprite) {
    return;
  }

  Reflect.deleteProperty(contextsBySprite, frameId);
};

const getContext = (
  sprite: Sprite,
  frameId: string,
  layerId: string,
): Context => {
  const { width, height, spriteId } = sprite;
  if (!contexts[spriteId]) {
    contexts[spriteId] = {};
  }

  if (!contexts[spriteId][frameId]) {
    contexts[spriteId][frameId] = {};
  }

  let context = contexts[spriteId][frameId][layerId];

  if (context) {
    return context;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  context = canvas.getContext('2d');

  contexts[spriteId][frameId][layerId] = context;

  return context;
};

function mirrorContext(originContext: Context, destinationContext: Context) {
  const { canvas: originCanvas } = originContext;
  const { canvas: destinationCanvas } = destinationContext;
  const { width, height } = originCanvas;
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

export {
  getContext,
  mirrorContext,
  removeContextsByFrame,
  removeContextsByLayer,
};
