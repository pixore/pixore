import { CanvasStats, Sprite } from '../types';
import { SpriteContext } from '../state/sprite';

const { floor } = Math;

export interface Cord {
  x: number;
  y: number;
}

const calculatePosition = (
  canvas: CanvasStats,
  clientX: number,
  clientY: number,
): Cord => {
  const x = floor((clientX - (canvas.x + canvas.left)) / canvas.scale);
  const y = floor((clientY - (canvas.y + canvas.top)) / canvas.scale);

  return { x, y };
};

const validCord = (sprite: Sprite | SpriteContext, cord: Cord) => {
  return (
    cord.x >= 0 &&
    cord.x < sprite.width &&
    cord.y >= 0 &&
    cord.y < sprite.height
  );
};

export { calculatePosition, validCord };
