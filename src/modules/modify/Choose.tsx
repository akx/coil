import * as React from 'react';
import Module from '../Module';
import Context from '../../Context';
import { renderNodesInto } from '../../render';

export default {
  acceptsChildren: true,
  variables: [
    { name: 'childIndex', default: '0' },
    { name: 'indexVariable', default: 'u' },
  ],

  render(context: Context) {
    const { node } = context;
    let { childIndex, indexVariable } = context.evaluateNodeConfig(node);
    const index = parseInt(childIndex);
    const child = node.children[index % node.children.length];
    const nodes = [];
    if(child) {
      const subcontext = context.subcontext(
        node,
        {
          [indexVariable]: childIndex
        },
        `child${childIndex}`
      );
      renderNodesInto(nodes, [child], subcontext);
    }
    return nodes;
  }
} as Module;
