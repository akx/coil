import * as React from 'react';
import Module from '../Module';
import Context from "../../Context";
import NodeConfig from "../../NodeConfig";
import {renderNodesInto} from "../../render";
import TransformVariables from '../TransformVariables';
import {toSVG} from "transformation-matrix";
import makeMatrix from "../makeMatrix";

export default {
  acceptsChildren: true,
  variables: TransformVariables.concat([
    {name: 'opacity', default: '1'},
  ]),

  render(context: Context, node: NodeConfig) {
    const nodes: Array<Element> = [];
    renderNodesInto(nodes, node.children, context);
    const {x, y, r, sx, sy, opacity} = context.evaluateNodeConfig(node);
    const matrix = makeMatrix({x, y, r, sx, sy});
    return [<g transform={toSVG(matrix)} opacity={opacity}>{nodes}</g>];
  },
} as Module;
