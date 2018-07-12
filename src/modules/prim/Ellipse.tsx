import * as React from 'react';
import Module from '../Module';
import Context from '../../universe/Context';
import {toSVG} from 'transformation-matrix';
import TransformVariables from '../TransformVariables';
import {splitMatrixAndProps} from '../MatrixUtils';
import PresentationVariables from '../PresentationVariables';
import {cleanPresentationProps} from '../SVGUtils';

export default {
  variables: TransformVariables.concat(PresentationVariables).concat([
    {name: 'radiusX', default: '20'},
    {name: 'radiusY', default: '20'},
  ]),

  render(context: Context) {
    const {props, matrix} = splitMatrixAndProps(context.evaluateNodeConfig());
    const {radiusX} = props;
    const radiusY = (props.radiusY !== '' ? props.radiusY : radiusX);
    delete props.radiusX;
    delete props.radiusY;
    cleanPresentationProps(props);
    return [
      <ellipse
        cx={0}
        cy={0}
        rx={radiusX}
        ry={radiusY}
        transform={toSVG(matrix)}
        key={context.getId()}
        {...props}
      />,
    ];
  },
} as Module;
