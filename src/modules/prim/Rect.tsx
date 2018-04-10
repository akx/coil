import * as React from 'react';
import Module from '../Module';
import Context from "../../Context";
import {NodeConfig} from "../../NodeConfig";
import {toSVG} from 'transformation-matrix';
import TransformVariables from '../TransformVariables';
import makeMatrix from "../makeMatrix";
import PresentationVariables from "../PresentationVariables";

export default {
  variables: TransformVariables.concat(PresentationVariables).concat([
    {name: 'width', default: '20'},
    {name: 'height', default: '20'},
  ]),

  render(context: Context, node: NodeConfig) {
    const {width, height, x, y, r, sx, sy, fill, opacity} = context.evaluateNodeConfig(node);
    const matrix = makeMatrix({x, y, r, sx, sy});
    return [
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        fill={fill}
        opacity={opacity}
        transform={toSVG(matrix)}
        key={context.getId('rect')}
      />
    ];
  }
} as Module;
