interface Vector {
  x: number;
  y: number;
}

const getDiff = (vec1: Vector, vec2: Vector): Vector => ({
  x: vec1.x - vec2.x,
  y: vec1.y - vec2.y,
});

const Vector = {
  getDiff,
};

export default Vector;
