const { abs } = Math;

interface Vector {
  x: number;
  y: number;
}

const getDelta = (vec1: Vector, vec2: Vector): Vector => ({
  x: vec1.x - vec2.x,
  y: vec1.y - vec2.y,
});

const getAbsolute = (vector: Vector): Vector => ({
  x: abs(vector.x),
  y: abs(vector.y),
});

const getAbsoluteDelta = (vector1: Vector, vector2: Vector): Vector =>
  getAbsolute(getDelta(vector1, vector2));

const clone = (vector: Vector) => ({
  x: vector.x,
  y: vector.y,
});

type LineBetweenCallback = (vector: Vector) => void;

const lineBetween = (
  originVector1: Vector,
  originVector2: Vector,
  callback: LineBetweenCallback,
) => {
  const vector1 = clone(originVector1);
  const vector2 = clone(originVector2);
  const delta = getAbsoluteDelta(vector2, vector1);

  // I don't have idea what sx, sy, err and e2 are
  // but it works ¯\_(ツ)_/¯
  let sx = vector1.x < vector2.x ? 1 : -1;
  let sy = vector1.y < vector2.y ? 1 : -1;
  let err = delta.x - delta.y;
  let e2;
  while (vector1.x !== vector2.x || vector1.y !== vector2.y) {
    callback(vector1);
    e2 = 2 * err;

    if (e2 > -delta.y) {
      err -= delta.y;
      vector1.x += sx;
    }
    if (e2 < delta.x) {
      err += delta.x;
      vector1.y += sy;
    }
  }
  callback(vector1);
};

const Vector = {
  getDelta,
  clone,
  lineBetween,
  getAbsoluteDelta,
};

export default Vector;
