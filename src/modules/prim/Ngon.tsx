import * as React from 'react';
import Context from "../../Context";
import {NodeConfig} from "../../NodeConfig";
import TransformVariables from '../TransformVariables';
import {splitMatrixAndProps} from "../MatrixUtils";
import PresentationVariables from "../PresentationVariables";
import Module from "../Module";
import {toSVG} from "transformation-matrix";

const TWO_PI = Math.PI * 2;

export default {
  variables: TransformVariables.concat(PresentationVariables).concat([
    {name: 'vertices', default: '5'},
    {name: 'radius1', default: '5'},
    {name: 'radius2', default: '5'},
  ]),

  render(context: Context, node: NodeConfig) {
    const {props, matrix} = splitMatrixAndProps(context.evaluateNodeConfig(node));
    const path: string[] = [];
    for (var i = 0; i < props.vertices; i++) {
      const f = i / props.vertices;
      const radius = (i % 2 === 0 ? props.radius1 : props.radius2);
      const x = Math.cos(f * TWO_PI) * radius;
      const y = Math.sin(f * TWO_PI) * radius;
      path.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(3)},${y.toFixed(3)}`);
    }
    if(path.length > 0) {
      path.push('z');
    }

    delete props.vertices;
    delete props.radius1;
    delete props.radius2;
    return [<path
      d={path.join(' ')}
      {...props}
      key={context.getId(node.id)}
      transform={toSVG(matrix)}
    />];
  }
} as Module;
