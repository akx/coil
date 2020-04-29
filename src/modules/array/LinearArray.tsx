import * as React from 'react';
import Module from '../Module';
import Context from '../../universe/Context';
import { renderNodesInto } from '../../universe/render';

export default {
  acceptsChildren: true,
  variables: [
    { name: 'number', default: '5' },
    { name: 'variable', default: 'i' },
  ],

  render(context: Context) {
    // tslint:disable-next-line:variable-name
    const { number, variable } = context.evaluateNodeConfig();
    const nodes = [];
    const nNumber = Math.round(parseFloat(number));
    const node = context.node;
    for (let i = 0; i < nNumber; i++) {
      const subcontext = context.subcontext(
        node,
        {
          [variable]: i,
          [`${variable}F`]: i / (nNumber - 1),
        },
        `${i}`,
      );
      renderNodesInto(nodes, node.children, subcontext);
    }
    return nodes;
  },
} as Module;
