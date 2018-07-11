import * as React from 'react';
import Module from '../Module';
import Context from '../../universe/Context';
import TransformVariables from '../TransformVariables';
import {toSVG} from 'transformation-matrix';
import {splitMatrixAndProps} from '../MatrixUtils';

export default {
  acceptsChildren: true,
  variables: TransformVariables.concat([
    {name: 'opacity', default: '1'},
  ]),

  render(context: Context) {
    const nodes = context.renderChildren();
    const {props, matrix} = splitMatrixAndProps(context.evaluateNodeConfig());
    const {opacity} = props;
    return [<g transform={toSVG(matrix)} opacity={opacity}>{nodes}</g>];
  },
} as Module;
