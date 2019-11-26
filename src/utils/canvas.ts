import { Canvas, Sprite } from '../types';

const { floor } = Math;

export interface Cord {
  x: number;
  y: number;
}

const calculatePosition = (canvas: Canvas, x: number, y: number): Cord => {
  x = floor((x - canvas.x) / canvas.scale);
  y = floor((y - canvas.y) / canvas.scale);
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

export { calculatePosition, validCord };
