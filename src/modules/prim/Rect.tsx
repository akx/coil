import * as React from 'react';
import Module from '../Module';
import Context from '../../universe/Context';
import {toSVG} from 'transformation-matrix';
import TransformVariables from '../TransformVariables';
import {splitMatrixAndProps} from '../MatrixUtils';
import PresentationVariables from '../PresentationVariables';

export default {
  variables: TransformVariables.concat(PresentationVariables).concat([
    {name: 'width', default: '20'},
    {name: 'height', default: '20'},
  ]),

  render(context: Context) {
    const {node} = context;
    const {props, matrix} = splitMatrixAndProps(context.evaluateNodeConfig(node));
    return [
      <rect
        x={-props.width / 2}
        y={-props.height / 2}
        transform={toSVG(matrix)}
        key={context.getId()}
        {...props}
      />,
    ];
  },
} as Module;
