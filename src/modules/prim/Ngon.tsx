import * as React from 'react';
import Context from '../../Context';
import TransformVariables from '../TransformVariables';
import {splitMatrixAndProps} from '../MatrixUtils';
import PresentationVariables from '../PresentationVariables';
import Module from '../Module';
import {toSVG} from 'transformation-matrix';
import dumbMemoize from '../../dumbMemoize';

const TWO_PI = Math.PI * 2;

const generatePathString = dumbMemoize(
  (vertices, radius1, radius2, tilt1, tilt2) => {
    const path: string[] = [];
    radius1 = parseFloat(radius1);
    radius2 = parseFloat(radius2);
    tilt1 = parseFloat(tilt1);
    tilt2 = parseFloat(tilt2);
    for (let i = 0; i < vertices; i++) {
      const f = i / vertices;
      const radius = (i % 2 === 0 ? radius1 : radius2);
      const angle = (f + (i % 2 === 0 ? tilt1 : tilt2)) * TWO_PI;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (!(isNaN(x) || isNaN(y))) {
        path.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(3)},${y.toFixed(3)}`);
      }
    }
    if (path.length > 0) {
      path.push('z');
    }
    return path.join(' ');
  },
);

export default {
  variables: TransformVariables.concat(PresentationVariables).concat([
    {name: 'vertices', default: '5'},
    {name: 'radius1', default: '5'},
    {name: 'radius2', default: '5'},
    {name: 'tilt1', default: '0'},
    {name: 'tilt2', default: '0'},
  ]),

  render(context: Context) {
    const {node} = context;
    const {props, matrix} = splitMatrixAndProps(context.evaluateNodeConfig(node));
    const path = generatePathString(props.vertices, props.radius1, props.radius2, props.tilt1, props.tilt2);

    delete props.vertices;
    delete props.radius1;
    delete props.radius2;
    delete props.tilt1;
    delete props.tilt2;
    return [<path
      d={path}
      {...props}
      key={context.getId(node.id)}
      transform={toSVG(matrix)}
    />];
  },
} as Module;
