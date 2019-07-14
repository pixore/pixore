import { Artboard } from '../contexts/Artboard';
import { Sprite } from '../contexts/Sprite';

const { floor } = Math;

interface Cord {
  x: number;
  y: number;
}

const calculatePosition = (artboard: Artboard, x: number, y: number): Cord => {
  x = floor((x - artboard.x) / artboard.scale);
  y = floor((y - artboard.y) / artboard.scale);
  return { x, y };
};

const validCord = (sprite: Sprite, cord: Cord) => {
  return (
    cord.x >= 0 &&
    cord.x < sprite.width &&
    cord.y >= 0 &&
    cord.y < sprite.height
  );
};

export { calculatePosition, validCord, Cord };
