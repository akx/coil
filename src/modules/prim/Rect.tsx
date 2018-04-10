import * as React from 'react';
import Module from '../Module';
import Context from "../../Context";
import {NodeConfig} from "../../NodeConfig";
import {toSVG} from 'transformation-matrix';
import TransformVariables from '../TransformVariables';
import {splitMatrixAndProps} from "../MatrixUtils";
import PresentationVariables from "../PresentationVariables";

export default {
  variables: TransformVariables.concat(PresentationVariables).concat([
    {name: 'width', default: '20'},
    {name: 'height', default: '20'},
  ]),

  render(context: Context, node: NodeConfig) {
    const {props, matrix} = splitMatrixAndProps(context.evaluateNodeConfig(node));
    return [
      <rect
        x={-props.width / 2}
        y={-props.height / 2}
        transform={toSVG(matrix)}
        key={context.getId(node.id)}
        {...props}
      />
    ];
  }
} as Module;
