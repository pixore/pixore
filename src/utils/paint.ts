import { Sprite } from '../contexts/Sprite';
import { Artboard } from '../contexts/Artboard';
import {
  clean,
  getTransparentPattern,
  imageSmoothingDisabled,
  getContext,
} from './';
import { Cord } from './canvas';

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

const paintPreview = function(
  cord: Cord,
  context: CanvasRenderingContext2D,
  artboard: Artboard,
) {
  clean(context.canvas);

  let realCord = {
    x: cord.x * artboard.scale + artboard.x,
    y: cord.y * artboard.scale + artboard.y,
  };
  context.strokeStyle = 'rgba(255, 255, 255, 0.6)'; // border
  context.fillStyle = artboard.primaryColor;
  context.strokeRect(
    realCord.x - 1,
    realCord.y - 1,
    artboard.scale + 2,
    artboard.scale + 2,
  );
  context.fillRect(realCord.x, realCord.y, artboard.scale, artboard.scale);
};

export { paintBackground, paintMain, paintMask, paintPreview };
