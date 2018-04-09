import * as React from 'react';
import Module from '../Module';
import Context from "../../Context";
import NodeConfig from "../../NodeConfig";
import {rotateDEG, scale, toSVG, transform, translate} from 'transformation-matrix';
import TransformVariables from '../TransformVariables';

export default {
  variables: TransformVariables.concat([
    {name: 'width', default: '20'},
    {name: 'height', default: '20'},
    {name: 'fill', default: '#333'},
    {name: 'opacity', default: '1'},
  ]),

  render(context: Context, node: NodeConfig) {
    const {width, height, x, y, r, sx, sy, fill, opacity} = context.evaluateAll(node.config);
    const matrix = transform(translate(x, y), rotateDEG(r), scale(sx, sy));
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