import * as React from 'react';
import Module from '../Module';
import Context from "../../Context";
import NodeConfig from "../../NodeConfig";
import {renderNodesInto} from "../../render";

export default {
  acceptsChildren: true,
  variables: [
    {name: 'number', default: '5'},
    {name: 'variable', default: 'i'},
  ],

  render(context: Context, node: NodeConfig) {
    const {number, variable} = context.evaluateAll(node.config);
    const nodes = [];

    const nNumber = Math.round(parseFloat(number));
    for (var i = 0; i < nNumber; i++) {
      const subcontext = context.subcontext({
        [variable]: i,
        [`${variable}F`]: i / (nNumber - 1),
      }, `${node.id}.${i}`);
      renderNodesInto(nodes, node.children, subcontext);
    }
    return nodes;
  },
} as Module;
