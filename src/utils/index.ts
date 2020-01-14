import { Size, Stats } from '../types';
let transparentPattern: HTMLCanvasElement;
let stringTransparentPatter: string;

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

const getStringTransparentPattern = (): string => {
  if (stringTransparentPatter) {
    return stringTransparentPatter;
  }

  stringTransparentPatter = getTransparentPattern().toDataURL('image/png');

  return stringTransparentPatter;
};

const clean = (context: CanvasRenderingContext2D) => {
  const {
    canvas: { width, height },
  } = context;

  context.clearRect(0, 0, width, height);
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

const isTransparent = (value: string): boolean => {
  return value === 'transparent' || value.trim() == 'rgba(0, 0, 0, 0)';
};

const preventDefault = (event: React.MouseEvent) => event.preventDefault();

const round1 = (num: number) => {
  return Number(num.toFixed(1));
};

const defaultMargin = 50;

const getScaleAndPosition = (stats: Stats, size: Size) => {
  const scale =
    stats.height > stats.width
      ? (stats.width - defaultMargin) / size.width
      : (stats.height - defaultMargin) / size.height;

  const width = size.width * scale;
  const height = size.height * scale;

  const marginTop = (stats.height - height) / 2;
  const marginLeft = (stats.width - width) / 2;

  return {
    scale,
    x: marginLeft,
    y: marginTop,
  };
};

const toggleState = (state: boolean) => !state;

export {
  round1,
  getScaleAndPosition,
  preventDefault,
  getTransparentPattern,
  getStringTransparentPattern,
  clean,
  imageSmoothing,
  imageSmoothingDisabled,
  getIdByReference,
  getNewId,
  isTransparent,
  toggleState,
};
