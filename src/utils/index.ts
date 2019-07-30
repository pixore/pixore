import { Sprite } from '../contexts/Sprite';

let transparentPattern: HTMLCanvasElement;

declare global {
  interface CanvasRenderingContext2D {
    msImageSmoothingEnabled: boolean;
    mozImageSmoothingEnabled: boolean;
  }
}

const imageSmoothing = (context: CanvasRenderingContext2D, value: boolean) => {
  context.imageSmoothingEnabled = value;
  context.mozImageSmoothingEnabled = value;
  context.msImageSmoothingEnabled = value;
};

const imageSmoothingDisabled = (context: CanvasRenderingContext2D) => {
  imageSmoothing(context, false);
};

const getTransparentPattern = () => {
  if (transparentPattern) {
    return transparentPattern;
  }

  const context = document.createElement('canvas').getContext('2d');

  context.canvas.height = context.canvas.width = 64;

  context.fillStyle = '#989898';
  context.fillRect(0, 0, 32, 32);
  context.fillRect(32, 32, 32, 32);

  context.fillStyle = '#CCCCCC';
  context.fillRect(0, 32, 32, 32);
  context.fillRect(32, 0, 32, 32);

  transparentPattern = context.canvas;

  return transparentPattern;
};

const clean = (canvas: HTMLCanvasElement) => {
  canvas.width = canvas.width;
  return canvas;
};

let counter = 0;
const mapReferences = new WeakMap<object, string>();
const getIdByReference = (obj: object): string => {
  if (mapReferences.has(obj)) {
    return mapReferences.get(obj);
  }
  const id = counter.toString();
  mapReferences.set(obj, id);
  counter++;
  return id;
};

const getNewId = (): string => {
  const id = counter.toString();
  counter++;
  return id;
};

interface Contexts {
  [key: string]: {
    [key: string]: CanvasRenderingContext2D;
  };
}

const contexts: Contexts = {};

const getContext = (
  frame: string,
  layer: string,
  sprite: Sprite,
): CanvasRenderingContext2D => {
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

const preventDefault = (event: React.MouseEvent) => event.preventDefault();

export {
  preventDefault,
  getTransparentPattern,
  clean,
  imageSmoothing,
  imageSmoothingDisabled,
  getContext,
  getIdByReference,
  getNewId,
};
