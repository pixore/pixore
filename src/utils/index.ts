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

interface Contexts {
  [key: string]: CanvasRenderingContext2D;
}

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

const contexts: Contexts = {};

const getContext = (id: string) => contexts[id];
const addContext = (context: CanvasRenderingContext2D): string => {
  const id = getIdByReference(context);
  if (contexts[id]) {
    throw new Error('`' + id + '` context already exists');
  }
  if (context.canvas.width === 0) {
    throw new Error('Width cannot be 0 of a canvas');
  }
  if (context.canvas.height === 0) {
    throw new Error('Height cannot be 0 of a canvas');
  }
  contexts[id] = context;

  return id;
};

type NewContext = {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
};

const getNewContext = ({ context, width, height }: NewContext) => {
  var newContext = context || document.createElement('canvas').getContext('2d');
  if (!context) {
    newContext.canvas.width = width;
    newContext.canvas.height = height;
  }
  return newContext;
};

export {
  getTransparentPattern,
  clean,
  imageSmoothing,
  imageSmoothingDisabled,
  getContext,
  addContext,
  getNewContext,
  getIdByReference,
};
