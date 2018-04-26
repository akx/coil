import * as React from 'react';
import Module from '../Module';
import Context from '../../Context';
import {toSVG} from 'transformation-matrix';
import TransformVariables from '../TransformVariables';
import {splitMatrixAndProps} from '../MatrixUtils';

export default {
  variables: TransformVariables.concat([
    {name: 'radiusX', default: '20'},
    {name: 'radiusY', default: '20'},
    {name: 'fill', default: '#333'},
    {name: 'opacity', default: '1'},
  ]),

  render(context: Context) {
    const {props, matrix} = splitMatrixAndProps(context.evaluateNodeConfig());
    const {radiusX, radiusY, fill, opacity} = props;
    return [
      <ellipse
        cx={0}
        cy={0}
        rx={radiusX}
        ry={radiusY}
        fill={fill}
        opacity={opacity}
        transform={toSVG(matrix)}
        key={context.getId()}
      />,
    ];
  },
} as Module;
