import { Sprite } from '../contexts/Sprite';
import { Artboard } from '../contexts/Artboard';
import {
  clean,
  getTransparentPattern,
  imageSmoothingDisabled,
  getContext,
} from './';

type PaintFunction = (
  mainContext: CanvasRenderingContext2D,
  sprite: Sprite,
  artboard: Artboard,
) => void;

const paintBackground: PaintFunction = (context, sprite, artboard) => {
  const pattern = context.createPattern(getTransparentPattern(), 'repeat');
  clean(context.canvas);
  context.fillStyle = pattern;
  context.fillRect(
    artboard.x,
    artboard.y,
    sprite.width * artboard.scale,
    sprite.height * artboard.scale,
  );
};

const paintMain: PaintFunction = (mainContext, sprite, artboard) => {
  const width = sprite.width * artboard.scale;
  const height = sprite.height * artboard.scale;
  clean(mainContext.canvas);
  imageSmoothingDisabled(mainContext);
  mainContext.drawImage(
    getContext(sprite, artboard).canvas,
    0,
    0,
    sprite.width,
    sprite.height,
    artboard.x,
    artboard.y,
    width,
    height,
  );
};

const paintMask: PaintFunction = (maskContext, sprite, artboard) => {
  let width = sprite.width * artboard.scale;
  let height = sprite.height * artboard.scale;
  maskContext.fillStyle = '#494949';
  maskContext.fillRect(
    0,
    0,
    maskContext.canvas.width,
    maskContext.canvas.width,
  );
  maskContext.clearRect(artboard.x, artboard.y, width, height);
};

export { paintBackground, paintMain, paintMask };
