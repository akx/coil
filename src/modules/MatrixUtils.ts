import {Matrix, rotateDEG, scale, translate} from 'transformation-matrix';
import {VariableMap} from '../types';

const multiply = (m1: Matrix, m2: Matrix): Matrix => {
  return {
    a: m1.a * m2.a + m1.c * m2.b,
    b: m1.b * m2.a + m1.d * m2.b,
    c: m1.a * m2.c + m1.c * m2.d,
    d: m1.b * m2.c + m1.d * m2.d,
    e: m1.a * m2.e + m1.c * m2.f + m1.e,
    f: m1.b * m2.e + m1.d * m2.f + m1.f,
  };
};

interface TransformBag {
  x: number;
  y: number;
  r: number;
  sx: number;
  sy: number;
}

export function makeMatrix({x, y, r, sx, sy}: TransformBag): Matrix {
  let matrix = translate(isFinite(x) ? x : 0, isFinite(y) ? y : 0);
  if (isFinite(r)) {
    matrix = multiply(matrix, rotateDEG(r));
  }
  if (isFinite(sx) && isFinite(sy)) {
    matrix = multiply(matrix, scale(sx, sy));
  }
  return matrix;
}

export function splitMatrixAndProps(props: VariableMap): {
  matrix: Matrix,
  props: VariableMap,
} {
  const matrix = makeMatrix(props as TransformBag);
  const newProps = Object.assign({}, props);
  delete newProps.x;
  delete newProps.y;
  delete newProps.r;
  delete newProps.sx;
  delete newProps.sy;
  return {matrix, props: newProps};
}
