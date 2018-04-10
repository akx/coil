import * as React from 'react';
import Module from '../Module';
import Context from "../../Context";
import {NodeConfig} from "../../NodeConfig";
import {renderNodesInto} from "../../render";

export default {
  acceptsChildren: true,
  variables: [
    {name: 'keep', default: '=rand() < .5'},
    {name: 'indexVariable', default: 'i'},
    {name: 'seed', default: ''},
  ],

  render(context: Context, node: NodeConfig) {
    const indexVariable = context.evaluate(node, 'indexVariable', node.config.indexVariable!);
    const seed = context.evaluate(node, 'seed', node.config.seed!);
    const nodes = [];
    renderNodesInto(nodes, node.children, context);
    const filterContext = context.subcontext({}, '', seed);
    return nodes.filter((child, index) => filterContext.evaluate(
      node, `keep ${index}`,
      node.config.keep!,
      {[indexVariable]: index},
    ));
  },
} as Module;
