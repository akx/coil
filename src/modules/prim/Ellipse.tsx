import * as React from 'react';
import Module from '../Module';
import Context from "../../Context";
import {NodeConfig} from "../../NodeConfig";
import {toSVG} from 'transformation-matrix';
import TransformVariables from '../TransformVariables';
import makeMatrix from "../makeMatrix";

export default {
  variables: TransformVariables.concat([
    {name: 'radiusX', default: '20'},
    {name: 'radiusY', default: '20'},
    {name: 'fill', default: '#333'},
    {name: 'opacity', default: '1'},
  ]),

  render(context: Context, node: NodeConfig) {
    const {radiusX, radiusY, x, y, r, sx, sy, fill, opacity} = context.evaluateNodeConfig(node);
    const matrix = makeMatrix({x, y, r, sx, sy});
    return [
      <ellipse
        cx={0}
        cy={0}
        rx={radiusX}
        ry={radiusY}
        fill={fill}
        opacity={opacity}
        transform={toSVG(matrix)}
        key={context.getId(node.id)}
      />
    ];
  }
} as Module;
