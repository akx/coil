import * as React from 'react';
import Module from '../Module';
import Context from "../../Context";
import NodeConfig from "../../NodeConfig";
import {renderChildrenInto} from "../../render";

export default {
  acceptsChildren: true,
  variables: [
    {name: 'number', default: '5'},
    {name: 'variable', default: 'i'},
  ],

  render(context: Context, node: NodeConfig) {
    const {number, variable} = context.evaluateAll(node.config);
    const nodes: Array<Element> = [];

    const nNumber = Math.round(parseFloat(number));
    for (var i = 0; i < nNumber; i++) {
      const subcontext = context.subcontext({
        [variable]: i,
        [`${variable}F`]: i / (nNumber - 1),
      });
      renderChildrenInto(nodes, node, subcontext);
    }
    return nodes;
  },
} as Module;
