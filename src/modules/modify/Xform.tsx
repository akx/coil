import * as React from 'react';
import Module from '../Module';
import Context from "../../Context";
import {NodeConfig} from "../../NodeConfig";
import {renderNodesInto} from "../../render";
import TransformVariables from '../TransformVariables';
import {toSVG} from "transformation-matrix";
import {splitMatrixAndProps} from "../MatrixUtils";

export default {
  acceptsChildren: true,
  variables: TransformVariables.concat([
    {name: 'opacity', default: '1'},
  ]),

  render(context: Context, node: NodeConfig) {
    const nodes: Array<Element> = [];
    renderNodesInto(nodes, node.children, context);
    const {props, matrix} = splitMatrixAndProps(context.evaluateNodeConfig(node));
    const {opacity} = props;
    return [<g transform={toSVG(matrix)} opacity={opacity}>{nodes}</g>];
  },
} as Module;
