import * as React from 'react';
import Module from '../Module';
import Context from "../../Context";
import NodeConfig from "../../NodeConfig";
import {renderChildrenInto} from "../../render";

export default {
  acceptsChildren: true,
  variables: [
    {name: 'keep', default: '=Math.random() < .5'},
    {name: 'indexVariable', default: 'i'},
  ],

  render(context: Context, node: NodeConfig) {
    const indexVariable = context.evaluate(node.config.indexVariable);
    const nodes: Array<Element> = [];
    renderChildrenInto(nodes, node, context);
    return nodes.filter((child, index) => {
      return context.subcontext({[indexVariable]: index}).evaluate(node.config.keep);
    });
  },
} as Module;
